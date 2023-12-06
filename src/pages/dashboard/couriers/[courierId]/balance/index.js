import { useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { gtm } from "@lib/gtm";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { Plus as PlusIcon } from "@icons/plus";
import { useDispatch, useSelector } from "src/store";
import { getCourierBalances, getPeriods } from "@services/index";
import { CourierBalanceListTable } from "@components/dashboard/courier/balance/courier-balance-list-table";

const CourierBalanceList = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const courierId = query.courierId;

  const { periods } = useSelector((state) => state.handbooks);

  const { courierBalances } = useSelector((state) => state.couriers);

  const queryParams = {
    period: query?.period ?? "YEAR",
  };

  const [period, setPeriod] = useState(queryParams.status);

  const handleSortChange = (event) => {
    setPeriod(event.target.value);
  };

  useEffect(() => {
    dispatch(getPeriods());
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        getCourierBalances({
          id: courierId,
          period: period,
        })
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [period]);

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
                <NextLink
                  href={`/dashboard/couriers/${courierId}/balance/new`}
                  passHref
                >
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
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                m: -1.5,
                p: 3,
              }}
            >
              <TextField
                size="small"
                label="Sort By"
                name="period"
                onChange={handleSortChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5, width: 150 }}
                value={period}
              >
                <option></option>
                {periods?.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </TextField>
            </Box>
            {courierBalances ? (
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
