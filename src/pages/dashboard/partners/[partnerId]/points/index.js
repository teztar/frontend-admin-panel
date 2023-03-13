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
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { PointListTable } from "@components/dashboard/partner/point/point-list-table";
import { Plus as PlusIcon } from "@icons/plus";
import { Search as SearchIcon } from "@icons/search";
import { useDispatch, useSelector } from "src/store";
import { getPartner, getPoints } from "@services/index";
import { AuthGuard } from "@components/authentication/auth-guard";
import { gtm } from "src/lib/gtm";

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

const PointList = () => {
  const dispatch = useDispatch();

  const { partner } = useSelector((state) => state.partners);
  const { points, count } = useSelector((state) => state.points);

  const router = useRouter();

  const queryRef = useRef(null);

  const partnerId = router.query?.partnerId;

  const queryParams = {
    page: router.query?.page ?? 0,
    perPage: router.query?.perPage ?? 10,
    search: router.query?.search ?? "",
  };
  const [search, setSearch] = useState(queryParams?.search);
  const [page, setPage] = useState(+queryParams.page);
  const [rowsPerPage, setRowsPerPage] = useState(+queryParams?.perPage);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setSearch(queryRef.current?.value);
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
    gtm.push({ event: "page_view" });
    // dispatch(getPoints());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/dashboard/partners/${partnerId}/points?search=${search}&page=${page}&perPage=${rowsPerPage}`
      );
      dispatch(
        getPoints({
          partnerId: partnerId,
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
        <title>Dashboard: Point List</title>
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
                  {partner?.brand} - {partner?.region} - Points
                </Typography>
              </Grid>
              <Grid item>
                <NextLink
                  href={`/dashboard/partners/${partnerId}/points/new`}
                  passHref
                >
                  <Button
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Add
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
                  placeholder="Search points"
                />
              </Box>
            </Box>
            <PointListTable
              points={points}
              pointsCount={count}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

PointList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default PointList;
