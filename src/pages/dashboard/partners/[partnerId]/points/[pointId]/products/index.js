import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { ProductListTable } from "@components/dashboard/product/product-list-table";
import { Search as SearchIcon } from "@icons/search";
import { Plus as PlusIcon } from "@icons/plus";
import { gtm } from "@lib/gtm";
import { useDispatch, useSelector } from "src/store";
import {
  getPartner,
  getPoint,
  getProductCategoriesByPoint,
  getProducts,
} from "@services/index";

const ProductList = () => {
  const dispatch = useDispatch();

  const { products, productCategories, count } = useSelector(
    (state) => state.products
  );
  const { partner } = useSelector((state) => state.partners);
  const { point } = useSelector((state) => state.points);

  const router = useRouter();

  const queryRef = useRef(null);

  const pointId = router.query?.pointId;
  const partnerId = router.query?.partnerId;

  const queryParams = {
    page: router.query?.page ?? 0,
    perPage: router.query?.perPage ?? 10,
    search: router.query?.search ?? "",
    category: router.query?.category ?? "",
  };
  const [search, setSearch] = useState(queryParams?.search);
  const [category, setCategory] = useState(queryParams?.category);
  const [page, setPage] = useState(+queryParams.page);
  const [rowsPerPage, setRowsPerPage] = useState(+queryParams?.perPage);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setSearch(queryRef.current?.value);
  };

  const handleSortChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    dispatch(
      getPartner({
        id: partnerId,
      })
    );
    dispatch(
      getPoint({
        partnerId,
        pointId,
      })
    );
    dispatch(getProductCategoriesByPoint({ pointId }));
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/dashboard/partners/${partnerId}/points/${pointId}/products?search=${search}&page=${page}&perPage=${rowsPerPage}&category=${category}`
      );
      dispatch(
        getProducts({
          pointId: pointId,
          page: Number(page + 1),
          perPage: Number(rowsPerPage),
          search: search,
          category: category,
        })
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [page, rowsPerPage, search, category]);

  return (
    <>
      <Head>
        <title>Dashboard: Product List</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">
                  {partner?.brand} - {partner?.region} - {point?.assortment}{" "}
                  Products
                </Typography>
              </Grid>
              <Grid item>
                <NextLink
                  href={`/dashboard/partners/${partnerId}/points/${pointId}/products/new`}
                  passHref
                >
                  <Button
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Добавить
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                m: -1.5,
                p: 3,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  m: 1.5,
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  onChange={handleQueryChange}
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search products"
                />
              </Box>
              <TextField
                label="Sort By"
                name="category"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={category}
              >
                <option>Choose</option>
                {productCategories?.categories?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </Box>
            {products?.length > 0 ? (
              <ProductListTable
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                products={products}
                productsCount={count}
                rowsPerPage={rowsPerPage}
              />
            ) : (
              <Box ml={3} mb={3}>
                No Products
              </Box>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

ProductList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ProductList;
