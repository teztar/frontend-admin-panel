import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { CategoryQueueEditForm } from "@components/dashboard/category-queue/category-queue-edit-form";

const CategoriesQueueCreate = () => {
  return (
    <>
      <Head>
        <title>Dashboard: Product Categories Queue</title>
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
              Create a new product category queue
            </Typography>
          </Box>
          <CategoryQueueEditForm mode="create" />
        </Container>
      </Box>
    </>
  );
};

CategoriesQueueCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CategoriesQueueCreate;
