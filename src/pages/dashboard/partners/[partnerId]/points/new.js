import { useEffect } from "react";
import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { PointEditForm } from "@components/dashboard/partner/point/point-edit-form";
import { gtm } from "src/lib/gtm";

const PointCreate = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: Point Create</title>
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
            <Typography variant="h4">Create a new point</Typography>
          </Box>
          <PointEditForm mode="create" />
        </Container>
      </Box>
    </>
  );
};

PointCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default PointCreate;
