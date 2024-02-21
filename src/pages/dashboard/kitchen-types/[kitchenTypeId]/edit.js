import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "src/store";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { KitchenTypeEditForm } from "@components/dashboard/kitchen-type/kitchen-type-edit-form";
import { getKitchenType } from "@services/kitchenTypes.service";

const KitchenTypesEdit = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { kitchenType } = useSelector((state) => state.kitchenTypes);

  useEffect(
    () => {
      dispatch(getKitchenType({ id: query?.kitchenTypeId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!kitchenType) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Kitchen Types Edit</title>
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
            <NextLink href="/dashboard/kitchen-types" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Kitchen Types</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <KitchenTypeEditForm kitchenType={kitchenType} mode="edit" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

KitchenTypesEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default KitchenTypesEdit;
