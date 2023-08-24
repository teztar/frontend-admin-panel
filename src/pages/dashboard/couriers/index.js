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
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { CourierListTable } from "@components/dashboard/courier/courier-list-table";
import { Plus as PlusIcon } from "@icons/plus";
import { Search as SearchIcon } from "@icons/search";
import { gtm } from "@lib/gtm";
import { useDispatch, useSelector } from "src/store";
import { getCourierStatuses, getCouriers } from "@services/index";

const CourierList = () => {
  const dispatch = useDispatch();

  const { couriers, count } = useSelector((state) => state.couriers);
  const { courierStatuses } = useSelector((state) => state.handbooks);

  const router = useRouter();

  const queryRef = useRef(null);

  const queryParams = {
    page: router.query?.page ?? 0,
    perPage: router.query?.perPage ?? 10,
    search: router.query?.search ?? "",
    status: router.query?.status ?? "",
  };

  const [search, setSearch] = useState(queryParams?.search);
  const [page, setPage] = useState(+queryParams.page);
  const [rowsPerPage, setRowsPerPage] = useState(+queryParams?.perPage);
  const [status, setStatus] = useState(queryParams.status);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setSearch(queryRef.current?.value);
  };

  const handleSortChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  useEffect(() => {
    dispatch(getCourierStatuses());
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/dashboard/couriers?search=${search}&status=${status}&page=${page}&perPage=${rowsPerPage}`
      );
      dispatch(
        getCouriers({
          page: Number(page + 1),
          perPage: Number(rowsPerPage),
          search: search,
          status: status,
        })
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [page, rowsPerPage, search, status]);

  return (
    <>
      <Head>
        <title>Dashboard: Courier List</title>
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
                <Typography variant="h4">Курьеры</Typography>
              </Grid>
              <Grid item>
                <NextLink href="/dashboard/couriers/new" passHref>
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
                  placeholder="Search couriers"
                />
              </Box>
              <TextField
                label="Sort By"
                name="status"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={status}
              >
                <option></option>
                {courierStatuses.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </TextField>
            </Box>
            {couriers?.length > 0 ? (
              <CourierListTable
                couriers={couriers}
                couriersCount={count}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={rowsPerPage}
                page={page}
              />
            ) : (
              <Box ml={3} mb={3}>
                No couriers found
              </Box>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

CourierList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CourierList;
