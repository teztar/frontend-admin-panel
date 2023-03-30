import { useEffect, useRef, useState } from "react";
import Head from "next/head";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { PartnersBalanceListTable } from "@components/dashboard/partners_balance/partners-balance-list-table";
import { Search as SearchIcon } from "@icons/search";
import { Download } from "@icons/download";
import { gtm } from "@lib/gtm";
import { useDispatch, useSelector } from "src/store";
import {
  downloadPartnersBalance,
  getPartnerPointsBalanceStatuses,
  getPartnersBalance,
} from "@services/index";
import { format } from "date-fns";

const PartnersBalanceList = () => {
  const dispatch = useDispatch();

  const { partnersBalance, count } = useSelector(
    (state) => state.partnersBalance
  );

  const { partnerPointsBalanceStatuses } = useSelector(
    (state) => state.handbooks
  );

  const router = useRouter();

  const queryRef = useRef(null);

  const { query } = router;

  const queryParams = {
    page: query?.page ?? 0,
    perPage: query?.perPage ?? 10,
    search: query?.search ?? "",
    status: query?.status ?? "",
    dateTo: query?.dateTo ?? "2099-10-10",
    dateFrom: query?.dateFrom ?? "2000-10-10",
  };

  const [search, setSearch] = useState(queryParams?.search);
  const [dateTo, setDateTo] = useState(queryParams?.dateTo);
  const [dateFrom, setDateFrom] = useState(queryParams?.dateFrom);
  const [page, setPage] = useState(+queryParams.page);
  const [rowsPerPage, setRowsPerPage] = useState(+queryParams?.perPage);
  const [status, setStatus] = useState(queryParams?.status);

  const formattedDateTo = format(new Date(dateTo), "yyyy-MM-dd");
  const formattedDateFrom = format(new Date(dateFrom), "yyyy-MM-dd");

  const handleQueryChange = (event) => {
    event.preventDefault();
    setSearch(queryRef.current?.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const downloadPartnersBalanceFile = () =>
    dispatch(
      downloadPartnersBalance({
        status: status,
        dateTo: formattedDateTo,
        dateFrom: formattedDateFrom,
      })
    );

  useEffect(() => {
    dispatch(getPartnerPointsBalanceStatuses());
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/dashboard/partners-balance?search=${search}&page=${page}&perPage=${rowsPerPage}&status=${status}&dateFrom=${formattedDateFrom}&dateTo=${formattedDateTo}`
      );
      dispatch(
        getPartnersBalance({
          page: Number(page + 1),
          perPage: Number(rowsPerPage),
          search: search,
          status: status,
          dateTo: formattedDateTo,
          dateFrom: formattedDateFrom,
        })
      );
    }, 700);

    return () => clearTimeout(timer);
  }, [page, rowsPerPage, search, status, dateTo, dateFrom]);

  return (
    <>
      <Head>
        <title>Dashboard: PartnersBalance List</title>
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
                <Typography variant="h4">Partners Balance</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  onClick={downloadPartnersBalanceFile}
                >
                  Download Partners Balances
                </Button>
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
                  onChange={handleQueryChange}
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
                  placeholder="Search partners balance"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <TextField
                  label="Sort By"
                  name="status"
                  onChange={handleStatusChange}
                  select
                  fullWidth
                  SelectProps={{ native: true }}
                  sx={{ m: 1.5 }}
                  value={status}
                >
                  <option>Choose</option>
                  {partnerPointsBalanceStatuses?.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.value}
                    </option>
                  ))}
                </TextField>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  label="Date from"
                  onChange={(date) => {
                    setDateFrom(date);
                  }}
                  renderInput={(inputProps) => (
                    <TextField fullWidth {...inputProps} sx={{ m: 1.5 }} />
                  )}
                  value={dateFrom || null}
                />
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  label="Date to"
                  onChange={(date) => {
                    setDateTo(date);
                  }}
                  renderInput={(inputProps) => (
                    <TextField fullWidth {...inputProps} sx={{ m: 1.5 }} />
                  )}
                  value={dateTo || null}
                />
              </Box>
            </Box>
            <PartnersBalanceListTable
              partnersBalance={partnersBalance}
              partnersBalanceCount={count}
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

PartnersBalanceList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default PartnersBalanceList;
