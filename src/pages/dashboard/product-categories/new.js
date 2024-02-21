import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { ProductCategoryEditForm } from "@components/dashboard/product-category/product-category-edit-form";

const ProductCategoriesCreate = () => {
  return (
    <>
      <Head>
        <title>Dashboard: Product Categories Create</title>
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
            <Typography variant="h4">Create a new product category</Typography>
          </Box>
          <ProductCategoryEditForm mode="create" />
        </Container>
      </Box>
    </>
  );
};

ProductCategoriesCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ProductCategoriesCreate;
