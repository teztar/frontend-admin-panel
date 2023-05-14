import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { format } from "date-fns";
import {
  Box,
  Card,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { Search as SearchIcon } from "@icons/search";
import { useDispatch, useSelector } from "src/store";
import {
  getPartnerPointsBalanceStatuses,
  getPartnersBalancePointsTransactions,
} from "@services/index";
import { AuthGuard } from "@components/authentication/auth-guard";
import { gtm } from "src/lib/gtm";
import { PartnersBalancePointTransactionListTable } from "@components/dashboard/partners_balance/point/transaction/transaction-list-table";

const PointTransactionsList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { partnersBalancePointsTransactions, count } = useSelector(
    (state) => state.partnersBalance
  );

  const queryRef = useRef(null);

  const partnerId = router.query?.partnerId;
  const pointId = router.query?.pointId;

  const queryParams = {
    page: router.query?.page ?? 0,
    perPage: router.query?.perPage ?? 10,
    search: router.query?.search ?? "",
    dateTo: router.query?.dateTo ?? "2099-10-10",
    dateFrom: router.query?.dateFrom ?? "2000-10-10",
  };
  const [search, setSearch] = useState(queryParams?.search);
  const [dateTo, setDateTo] = useState(queryParams?.dateTo);
  const [dateFrom, setDateFrom] = useState(queryParams?.dateFrom);
  const [page, setPage] = useState(+queryParams.page);
  const [rowsPerPage, setRowsPerPage] = useState(+queryParams?.perPage);

  const formattedDateTo = format(new Date(dateTo), "yyyy-MM-dd");
  const formattedDateFrom = format(new Date(dateFrom), "yyyy-MM-dd");

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
    dispatch(getPartnerPointsBalanceStatuses());
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/dashboard/partners-balance/${partnerId}/points/${pointId}/transactions?search=${search}&page=${page}&perPage=${rowsPerPage}&dateFrom=${formattedDateFrom}&dateTo=${formattedDateTo}`
      );
      dispatch(
        getPartnersBalancePointsTransactions({
          pointId: pointId,
          page: Number(page + 1),
          perPage: Number(rowsPerPage),
          search: search,
          dateTo: formattedDateTo,
          dateFrom: formattedDateFrom,
        })
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [page, rowsPerPage, search, formattedDateFrom, formattedDateTo]);

  return (
    <>
      <Head>
        <title>Dashboard: Partners Balance Points Transactions</title>
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
                  Partners Balance Points Transactions
                </Typography>
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
                  placeholder="Search partners balance points transactions"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
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
            {partnersBalancePointsTransactions.length > 0 ? (
              <PartnersBalancePointTransactionListTable
                transactions={partnersBalancePointsTransactions}
                transactionsCount={count}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={rowsPerPage}
                page={page}
              />
            ) : (
              <Box sx={{ m: 3 }}>
                No partners balance points transactions found
              </Box>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

PointTransactionsList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default PointTransactionsList;
