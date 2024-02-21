import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { UserEditForm } from "@components/dashboard/user/user-edit-form";

const UserCreate = () => {
  return (
    <>
      <Head>
        <title>Dashboard: User Create</title>
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
            <Typography variant="h4">Create a new user</Typography>
          </Box>
          <UserEditForm mode="create" />
        </Container>
      </Box>
    </>
  );
};

UserCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default UserCreate;
