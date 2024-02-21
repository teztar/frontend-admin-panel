import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "src/store";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { ProductCategoryEditForm } from "@components/dashboard/product-category/product-category-edit-form";
import { getProductCategory } from "@services/productCategories.service";

const ProductCategoriesEdit = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { productCategory } = useSelector((state) => state.productCategories);

  console.log({ productCategory });

  useEffect(
    () => {
      dispatch(getProductCategory({ id: query?.productCategoryId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!productCategory) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Product Categories Edit</title>
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
            <NextLink href="/dashboard/product-categories" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Product Categories</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <ProductCategoryEditForm
              productCategory={productCategory}
              mode="edit"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ProductCategoriesEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ProductCategoriesEdit;
