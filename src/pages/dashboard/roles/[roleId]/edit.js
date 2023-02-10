import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "src/store";
import { getRole } from "@services/roles.service";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { RoleEditForm } from "@components/dashboard/role/role-edit-form";
import { gtm } from "@lib/gtm";

const RoleEdit = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { role } = useSelector((state) => state.roles);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(
    () => {
      dispatch(getRole({ id: query?.roleId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!role) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Role Edit</title>
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
            <NextLink href="/dashboard/roles" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Roles</Typography>
              </Link>
            </NextLink>
          </Box>

          <Box mt={3}>
            <RoleEditForm role={role} mode="edit" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

RoleEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default RoleEdit;
