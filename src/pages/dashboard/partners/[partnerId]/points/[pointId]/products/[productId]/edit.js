import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { ProductEditForm } from "@components/dashboard/product/product-create-form";
import { useDispatch, useSelector } from "src/store";
import { getProduct } from "@services/index";
import { gtm } from "src/lib/gtm";

const ProductEdit = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { product } = useSelector((state) => state.products);

  const pointId = query?.pointId;
  const productId = query?.productId;
  const partnerId = query?.partnerId;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(
    () => {
      dispatch(getProduct({ pointId, productId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!product) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Product Edit</title>
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
          <Box sx={{ mb: 4, cursor: "producter" }}>
            <NextLink
              href={`/dashboard/partners/${partnerId}/points/${pointId}/products`}
              passHref
            >
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Products</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <ProductEditForm product={product} mode="edit" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ProductEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ProductEdit;
