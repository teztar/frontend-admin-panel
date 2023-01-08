import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { PartnerEditForm } from "../../../../components/dashboard/partner/partner-edit-form";
import { gtm } from "../../../../lib/gtm";
import { useDispatch, useSelector } from "src/store";
import { getPartner } from "@services/partners/partners.service";
import { useRouter } from "next/router";

const PartnerEdit = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { partner } = useSelector((state) => state.partners);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(
    () => {
      dispatch(getPartner({ id: query?.partnerId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!partner) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Partner Edit</title>
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
            <NextLink href="/dashboard/partners" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Partners</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <PartnerEditForm partner={partner} mode="edit" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

PartnerEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default PartnerEdit;
