import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { CourierBalanceEditForm } from "@components/dashboard/courier/balance/courier-balance-edit-form";

const CourierBalanceCreatePayDebtAmount = () => {
  return (
    <>
      <Head>
        <title>Dashboard: Courier Balance Create Pay Debt Amount</title>
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
            <Typography variant="h4">
              Create a new Courier Balance Create Pay Debt Amount
            </Typography>
          </Box>
          <CourierBalanceEditForm mode="create" />
        </Container>
      </Box>
    </>
  );
};

CourierBalanceCreatePayDebtAmount.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CourierBalanceCreatePayDebtAmount;
