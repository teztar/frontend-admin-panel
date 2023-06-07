import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "src/store";
import { getBanner } from "@services/index";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { BannerEditForm } from "@components/dashboard/banner/banner-edit-form";
import { gtm } from "@lib/gtm";

const BannerEdit = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { banner } = useSelector((state) => state.banners);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(
    () => {
      dispatch(getBanner({ id: query?.bannerId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!banner) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Banner Edit</title>
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
            <NextLink href="/dashboard/banners" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Banner</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <BannerEditForm banner={banner} mode="edit" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

BannerEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default BannerEdit;
