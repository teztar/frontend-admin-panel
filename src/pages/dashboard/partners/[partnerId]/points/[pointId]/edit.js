import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { PointEditForm } from "@components/dashboard/partner/point/point-edit-form";
import { useDispatch, useSelector } from "src/store";
import { getPoint } from "@services/index";
import { useRouter } from "next/router";
import { gtm } from "src/lib/gtm";

const PointEdit = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { point } = useSelector((state) => state.points);

  const pointId = query?.pointId;
  const partnerId = query?.partnerId;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(
    () => {
      dispatch(getPoint({ partnerId, pointId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!point) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Point Edit</title>
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
            <NextLink href={`/dashboard/partners/${partnerId}/points`} passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Points</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <PointEditForm point={point} mode="edit" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

PointEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default PointEdit;
