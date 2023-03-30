import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Card, Container, InputAdornment, TextField } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { ClientOrderListTable } from "@components/dashboard/client/order/client-order-list-table";
import { Search as SearchIcon } from "@icons/search";
import { useDispatch, useSelector } from "src/store";
import { getClientOrders } from "@services/index";

const ClientOrderList = () => {
  const dispatch = useDispatch();

  const { orders, count } = useSelector((state) => state.orders);

  const router = useRouter();

  const queryRef = useRef(null);

  const { query } = router;

  const clientId = query?.clientId;

  const queryParams = {
    page: query?.page ?? 0,
    perPage: query?.perPage ?? 10,
    search: query?.search ?? "",
  };

  const [search, setSearch] = useState(queryParams?.search);
  const [page, setPage] = useState(+queryParams.page);
  const [rowsPerPage, setRowsPerPage] = useState(+queryParams?.perPage);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setSearch(queryRef.current?.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/dashboard/clients/${clientId}/orders?search=${search}&page=${page}&perPage=${rowsPerPage}`
      );
      dispatch(
        getClientOrders({
          id: clientId,
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
            </Box>

            {orders?.length > 0 ? (
              <ClientOrderListTable
                orders={orders}
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
