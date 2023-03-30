import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { PointListTable } from "@components/dashboard/partners_balance/point/point-list-table";
import { Search as SearchIcon } from "@icons/search";
import { useDispatch, useSelector } from "src/store";
import {
  getPartnerPointsBalanceStatuses,
  getPartnersBalancePoints,
} from "@services/index";
import { AuthGuard } from "@components/authentication/auth-guard";
import { gtm } from "src/lib/gtm";

const PointList = () => {
  const dispatch = useDispatch();

  const { partnerPointsBalanceStatuses } = useSelector(
    (state) => state.handbooks
  );

  const { partnersBalancePoints, count } = useSelector(
    (state) => state.partnersBalance
  );

  const router = useRouter();

  const queryRef = useRef(null);

  const partnerId = router.query?.partnerId;

  const queryParams = {
    page: router.query?.page ?? 0,
    perPage: router.query?.perPage ?? 10,
    search: router.query?.search ?? "",
    status: router.query?.status ?? "",
  };
  const [search, setSearch] = useState(queryParams?.search);
  const [page, setPage] = useState(+queryParams.page);
  const [rowsPerPage, setRowsPerPage] = useState(+queryParams?.perPage);
  const [status, setStatus] = useState(queryParams?.status);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setSearch(queryRef.current?.value);
  };

  const handleSortChange = (event) => {
    setPage(0);
    setStatus(event.target.value);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    dispatch(getPartnerPointsBalanceStatuses());
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/dashboard/partners-balance/${partnerId}/points?search=${search}&page=${page}&perPage=${rowsPerPage}&status=${status}`
      );
      dispatch(
        getPartnersBalancePoints({
          partnerId: partnerId,
          page: Number(page + 1),
          perPage: Number(rowsPerPage),
          search: search,
          status: status,
        })
      );
    }, 700);

    return () => clearTimeout(timer);
  }, [page, rowsPerPage, search, status]);

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
                <Typography variant="h4">Partners Balance Points</Typography>
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
              <TextField
                label="Status"
                name="status"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={status}
              >
                <option></option>
                {partnerPointsBalanceStatuses.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </TextField>
            </Box>
            <PointListTable
              points={partnersBalancePoints}
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
