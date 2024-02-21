import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { OrderEditForm } from "@components/dashboard/order/order-edit-form";

const OrderCreate = () => {
  return (
    <>
      <Head>
        <title>Dashboard: Order Create</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">Create a new Order</Typography>
          </Box>
          <OrderEditForm mode="create" />
        </Container>
      </Box>
    </>
  );
};

OrderCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default OrderCreate;
