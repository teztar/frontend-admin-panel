import { useEffect } from "react";
import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { CourierEditForm } from "@components/dashboard/courier/courier-edit-form";
import { gtm } from "../../../lib/gtm";

const CourierCreate = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: Courier Create</title>
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
            <Typography variant="h4">Create a new Courier</Typography>
          </Box>
          <CourierEditForm mode="create" />
        </Container>
      </Box>
    </>
  );
};

CourierCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CourierCreate;
