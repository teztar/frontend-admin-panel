import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { Plus as PlusIcon } from "@icons/plus";
import { gtm } from "@lib/gtm";
import { useDispatch, useSelector } from "src/store";
import { getCourierBalances } from "@services/index";
import { CourierBalanceListTable } from "@components/dashboard/courier/balance/courier-balance-list-table";

const CourierBalanceList = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const courierId = router.query.courierId;

  console.log(courierId);

  const { courierBalances } = useSelector((state) => state.couriers);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        getCourierBalances({
          id: courierId,
        })
      );
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: Courier Balances List</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Courier Balances</Typography>
              </Grid>
              <Grid item>
                <NextLink href="/dashboard/couriers/new" passHref>
                  <Button
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Add
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
          <Card>
            {courierBalances?.length > 0 ? (
              <CourierBalanceListTable courierBalances={courierBalances} />
            ) : (
              <Box m={3}>No courier balances found</Box>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

CourierBalanceList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CourierBalanceList;
