import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Card, Container, InputAdornment, TextField } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { ClientOrderListTable } from "@components/dashboard/client/order/client-order-list-table";
import { Search as SearchIcon } from "@icons/search";
import { useDispatch, useSelector } from "src/store";
import { getClientOrders, getOrderStatuses } from "@services/index";

const ClientOrderList = () => {
  const dispatch = useDispatch();

  const { clientOrders, count } = useSelector((state) => state.clients);
  const { orderStatuses } = useSelector((state) => state.handbooks);

  const router = useRouter();

  const queryRef = useRef(null);

  const { query } = router;

  const clientId = query?.clientId;

  const queryParams = {
    page: query?.page ?? 0,
    perPage: query?.perPage ?? 10,
    search: query?.search ?? "",
    status: query?.status ?? "",
  };

  const [search, setSearch] = useState(queryParams?.search);
  const [page, setPage] = useState(+queryParams.page);
  const [rowsPerPage, setRowsPerPage] = useState(+queryParams?.perPage);
  const [status, setStatus] = useState(queryParams?.status);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setSearch(queryRef.current?.value);
  };

  const handleStatusChange = (event) => {
    setPage(0);
    setStatus(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    dispatch(getOrderStatuses());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/dashboard/clients/${clientId}/orders?search=${search}&status=${status}&page=${page}&perPage=${rowsPerPage}`
      );
      dispatch(
        getClientOrders({
          id: clientId,
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
        <title>Dashboard: Client Order List</title>
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
                  placeholder="Search client orders"
                />
              </Box>
              <TextField
                label="Status"
                name="status"
                onChange={handleStatusChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={status}
              >
                <option></option>
                {orderStatuses.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </TextField>
            </Box>

            {clientOrders?.length > 0 ? (
              <ClientOrderListTable
                orders={clientOrders}
                ordersCount={count}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPage={rowsPerPage}
                page={page}
              />
            ) : (
              <Box ml={3} mb={3}>
                No client orders
              </Box>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

ClientOrderList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ClientOrderList;
