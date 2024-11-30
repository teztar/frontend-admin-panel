import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "src/store";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { getProductCategory } from "@services/productCategories.service";
import { CategoryQueueEditForm } from "@components/dashboard/category-queue/category-queue-edit-form";

const CategoriesQueueEdit = () => {
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
        <title>Dashboard: Product Categories Queue Edit</title>
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
            <NextLink href="/dashboard/categories-queue" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">
                  Product Categories Queue
                </Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <CategoryQueueEditForm
              productCategory={productCategory}
              mode="edit"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

CategoriesQueueEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CategoriesQueueEdit;
