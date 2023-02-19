import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "src/store";
import { getBonus } from "@services/bonuses.service";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { BonusEditForm } from "@components/dashboard/bonus/bonus-edit-form";
import { gtm } from "@lib/gtm";

const BonusEdit = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { bonus } = useSelector((state) => state.bonuses);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(
    () => {
      dispatch(getBonus({ id: query?.bonusId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!bonus) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Bonus Edit</title>
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
            <NextLink href="/dashboard/bonuses" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Bonuss</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <BonusEditForm bonus={bonus} mode="edit" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

BonusEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default BonusEdit;
