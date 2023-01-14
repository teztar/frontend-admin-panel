import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "src/store";
import { getCourier } from "@services/couriers.service";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { CourierEditForm } from "@components/dashboard/courier/courier-edit-form";
import { gtm } from "../../../../lib/gtm";

const CourierEdit = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { courier } = useSelector((state) => state.couriers);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(
    () => {
      dispatch(getCourier({ id: query?.courierId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!courier) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Courier Edit</title>
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
            <NextLink href="/dashboard/couriers" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Couriers</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <CourierEditForm courier={courier} mode="edit" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

CourierEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CourierEdit;
