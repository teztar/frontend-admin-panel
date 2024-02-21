import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { KitchenTypeEditForm } from "@components/dashboard/kitchen-type/kitchen-type-edit-form";

const KitchenTypesCreate = () => {
  return (
    <>
      <Head>
        <title>Dashboard: Kitchen Types Create</title>
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
            <Typography variant="h4">Create a new kitchen type</Typography>
          </Box>
          <KitchenTypeEditForm mode="create" />
        </Container>
      </Box>
    </>
  );
};

KitchenTypesCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default KitchenTypesCreate;
