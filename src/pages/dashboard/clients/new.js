import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { ClientEditForm } from "@components/dashboard/client/client-edit-form";

const ClientCreate = () => {
  return (
    <>
      <Head>
        <title>Dashboard: Client Create</title>
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
            <Typography variant="h4">Create a new Client</Typography>
          </Box>
          <ClientEditForm mode="create" />
        </Container>
      </Box>
    </>
  );
};

ClientCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ClientCreate;
