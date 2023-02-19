import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "src/store";
import { getPushNotification } from "@services/pushNotifications.service";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { PushNotificationEditForm } from "@components/dashboard/push-notifications/push-notifications-edit-form";
import { gtm } from "@lib/gtm";

const PushNotificationEdit = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { pushNotification } = useSelector((state) => state.pushNotifications);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(
    () => {
      dispatch(getPushNotification({ id: query?.pushNotificationId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!pushNotification) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Push Notification Edit</title>
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
            <NextLink href="/dashboard/push-notifications" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Push Notifications</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <PushNotificationEditForm
              pushNotification={pushNotification}
              mode="edit"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

PushNotificationEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default PushNotificationEdit;
