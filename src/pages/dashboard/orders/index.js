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
import { getOrders, getOrderStatuses } from "@services/index";

const OrderList = () => {
  const dispatch = useDispatch();

  const { orders, count } = useSelector((state) => state.orders);

  const { orderStatuses } = useSelector((state) => state.handbooks);

  const router = useRouter();

  const queryRef = useRef(null);

  const { query } = router;

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

  const handleStatusChange = (event) => {
    setPage(0);
    setStatus(event.target.value);
  };

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
    dispatch(getOrderStatuses());
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/dashboard/orders?search=${search}&status=${status}&page=${page}&perPage=${rowsPerPage}`
      );
      dispatch(
        getOrders({
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
