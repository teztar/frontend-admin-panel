import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "src/store";
import { getOrder } from "@services/orders.service";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { OrderEditForm } from "@components/dashboard/order/order-edit-form";
import { gtm } from "@lib/gtm";

const OrderEdit = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { order } = useSelector((state) => state.orders);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(
    () => {
      dispatch(getOrder({ id: query?.orderId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!order) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Order Edit</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4, cursor: "pointer" }}>
            <NextLink href="/dashboard/orders" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Orders</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <OrderEditForm order={order} mode="edit" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

OrderEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default OrderEdit;
