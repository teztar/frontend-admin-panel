import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { customerApi } from "../../../../__fake-api__/customer-api";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { PartnerEditForm } from "../../../../components/dashboard/partner/partner-edit-form";
import { useMounted } from "../../../../hooks/use-mounted";
import { gtm } from "../../../../lib/gtm";

const CustomerEdit = () => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      const data = await customerApi.getCustomer();

      if (isMounted()) {
        setCustomer(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getCustomer();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!customer) {
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
            <PartnerEditForm customer={customer} mode="edit" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

CustomerEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CustomerEdit;
