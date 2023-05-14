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
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { TransactionListTable } from "@components/dashboard/transaction/transaction-list-table";
import { Search as SearchIcon } from "@icons/search";
import { gtm } from "@lib/gtm";
import { useDispatch, useSelector } from "src/store";
import {
  downloadTransactionsFile,
  getApplicationTypes,
  getOrderPaymentOptions,
  getOrderStatuses,
  getTransactions,
} from "@services/index";
import { Download } from "@icons/download";

const TransactionList = () => {
  const dispatch = useDispatch();

  const { transactions, count } = useSelector((state) => state.transactions);
  const { orderStatuses, orderPaymentOptions, applicationTypes } = useSelector(
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
    addedFrom: query?.addedFrom ?? "",
    paymentOption: query?.paymentOption ?? "",
  };

  const [search, setSearch] = useState(queryParams?.search);
  const [transactionStatus, setTransactionStatus] = useState(
    queryParams?.status
  );
  const [paymentOption, setPaymentOption] = useState(
    queryParams?.paymentOption
  );
  const [addedFrom, setAddedFrom] = useState(queryParams?.addedFrom);
  const [page, setPage] = useState(+queryParams.page);
  const [rowsPerPage, setRowsPerPage] = useState(+queryParams?.perPage);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setSearch(queryRef.current?.value);
  };

  const handlePaymentOptionChange = (event) => {
    setPage(0);
    setPaymentOption(event.target.value);
  };
  const handleAddedFromChange = (event) => {
    setPage(0);
    setAddedFrom(event.target.value);
  };

  const handleStatusChange = (event) => {
    setPage(0);
    setTransactionStatus(event.target.value);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const downloadTransactions = () => {
    dispatch(
      downloadTransactionsFile({
        addedFrom: addedFrom,
        status: transactionStatus,
        paymentOption: paymentOption,
      })
    );
  };

  useEffect(() => {
    dispatch(getOrderStatuses());
    dispatch(getOrderPaymentOptions());
    dispatch(getApplicationTypes());
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/dashboard/transactions?search=${search}&page=${page}&perPage=${rowsPerPage}&status=${transactionStatus}&addedFrom=${addedFrom}&paymentOption=${paymentOption}`
      );
      dispatch(
        getTransactions({
          page: Number(page + 1),
          perPage: Number(rowsPerPage),
          search: search,
          addedFrom: addedFrom,
          status: transactionStatus,
          paymentOption: paymentOption,
        })
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [page, rowsPerPage, search, transactionStatus, paymentOption, addedFrom]);

  return (
    <>
      <Head>
        <title>Dashboard: Transaction List</title>
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
                <Typography variant="h4">Transactions</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  onClick={downloadTransactions}
                >
                  Download Transactions
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
                  placeholder="Search transactions"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                }}
              >
                <TextField
                  label="Status"
                  name="transactionStatus"
                  onChange={handleStatusChange}
                  select
                  fullWidth
                  SelectProps={{ native: true }}
                  sx={{ m: 1.5 }}
                  value={transactionStatus}
                >
                  <option></option>
                  {orderStatuses?.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.value}
                    </option>
                  ))}
                </TextField>
                <TextField
                  label="Payment option"
                  name="paymentOption"
                  onChange={handlePaymentOptionChange}
                  select
                  fullWidth
                  SelectProps={{ native: true }}
                  sx={{ m: 1.5 }}
                  value={paymentOption}
                >
                  <option></option>
                  {orderPaymentOptions?.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.value}
                    </option>
                  ))}
                </TextField>
                <TextField
                  label="Added From"
                  name="addedFrom"
                  onChange={handleAddedFromChange}
                  select
                  fullWidth
                  SelectProps={{ native: true }}
                  sx={{ m: 1.5 }}
                  value={addedFrom}
                >
                  <option></option>
                  {applicationTypes?.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.value}
                    </option>
                  ))}
                </TextField>
              </Box>
            </Box>
            <TransactionListTable
              transactions={transactions}
              transactionsCount={count}
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

TransactionList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default TransactionList;
