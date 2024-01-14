import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "src/store";
import { getUser } from "@services/users.service";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { ProductCategoryEditForm } from "@components/dashboard/product-category/product-category-edit-form";
import { gtm } from "@lib/gtm";

const ProductCategoriesEdit = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(
    () => {
      dispatch(getUser({ id: query?.userId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!user) {
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
            <NextLink href="/dashboard/users" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Users</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <ProductCategoryEditForm user={user} mode="edit" />
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
