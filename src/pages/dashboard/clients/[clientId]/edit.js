import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "src/store";
import { getClient } from "@services/clients.service";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { ClientEditForm } from "@components/dashboard/client/client-edit-form";

const ClientEdit = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { client } = useSelector((state) => state.clients);

  useEffect(
    () => {
      dispatch(getClient({ id: query?.clientId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!client) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Client Edit</title>
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
            <NextLink href="/dashboard/clients" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Clients</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <ClientEditForm client={client} mode="edit" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ClientEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ClientEdit;
