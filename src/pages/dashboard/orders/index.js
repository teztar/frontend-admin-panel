import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Card, Container, InputAdornment, TextField } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { OrderListTable } from "@components/dashboard/order/order-list-table";
import { Search as SearchIcon } from "@icons/search";
import { gtm } from "@lib/gtm";
import { useDispatch, useSelector } from "src/store";
import { getOrders } from "@services/index";

const sortOptions = [
  {
    label: "Last update (newest)",
    value: "updatedAt|desc",
  },
  {
    label: "Last update (oldest)",
    value: "updatedAt|asc",
  },
  {
    label: "Total orders (highest)",
    value: "totalOrders|desc",
  },
  {
    label: "Total orders (lowest)",
    value: "totalOrders|asc",
  },
];

const OrderList = () => {
  const dispatch = useDispatch();

  const { orders, count } = useSelector((state) => state.orders);

  const router = useRouter();

  const queryRef = useRef(null);

  const queryParams = {
    page: router.query?.page ?? 0,
    perPage: router.query?.perPage ?? 10,
    search: router.query?.search ?? "",
  };

  const [search, setSearch] = useState(queryParams?.search);
  const [page, setPage] = useState(+queryParams.page);
  const [rowsPerPage, setRowsPerPage] = useState(+queryParams?.perPage);
  const [sort, setSort] = useState(sortOptions[0].value);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setSearch(queryRef.current?.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/dashboard/orders?search=${search}&page=${page}&perPage=${rowsPerPage}`
      );
      dispatch(
        getOrders({
          page: Number(page + 1),
          perPage: Number(rowsPerPage),
          search: search,
        })
      );
    }, 700);

    return () => clearTimeout(timer);
  }, [page, rowsPerPage, search]);

  return (
    <>
      <Head>
        <title>Dashboard: Order List</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
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
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                  m: 1.5,
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search orders"
                />
              </Box>
              <TextField
                label="Sort By"
                name="sort"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={sort}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Box>

            {orders?.length > 0 ? (
              <OrderListTable
                orders={orders}
                ordersCount={count}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={rowsPerPage}
                page={page}
              />
            ) : (
              <Box ml={3} mb={3}>
                No orders
              </Box>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

OrderList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default OrderList;
