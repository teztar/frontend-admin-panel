import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { RoleEditForm } from "@components/dashboard/role/role-edit-form";

const RoleCreate = () => {
  return (
    <>
      <Head>
        <title>Dashboard: Role Create</title>
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
            <Typography variant="h4">Create a new role</Typography>
          </Box>
          <RoleEditForm mode="create" />
        </Container>
      </Box>
    </>
  );
};

RoleCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default RoleCreate;
