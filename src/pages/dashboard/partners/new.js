import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { PartnerEditForm } from "@components/dashboard/partner/partner-edit-form";

const PartnerCreate = () => {
  return (
    <>
      <Head>
        <title>Dashboard: Partner Create</title>
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
            <Typography variant="h4">Create a new partner</Typography>
          </Box>
          <PartnerEditForm mode="create" />
        </Container>
      </Box>
    </>
  );
};

PartnerCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default PartnerCreate;
