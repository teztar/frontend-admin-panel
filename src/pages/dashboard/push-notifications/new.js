import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { PushNotificationEditForm } from "@components/dashboard/push-notifications/push-notifications-edit-form";

const PushNotificationCreate = () => {
  return (
    <>
      <Head>
        <title>Dashboard: Push Notification Create</title>
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
            <Typography variant="h4">Create a new push notification</Typography>
          </Box>
          <PushNotificationEditForm mode="create" />
        </Container>
      </Box>
    </>
  );
};

PushNotificationCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default PushNotificationCreate;
