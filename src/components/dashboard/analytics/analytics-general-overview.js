import {
  Box,
  Card,
  CardActions,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Chart } from "../../chart";
import { useSelector } from "src/store";

const LineChart = () => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#2F3EB1"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      show: false,
    },
    stroke: {
      width: 3,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const chartSeries = [{ data: [0, 60, 30, 60, 0, 30, 10, 30, 0] }];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      width={120}
    />
  );
};

const BarChart = () => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#2F3EB1"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      show: false,
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const chartSeries = [{ data: [10, 20, 30, 40, 50, 60, 5] }];

  return (
    <Chart options={chartOptions} series={chartSeries} type="bar" width={120} />
  );
};

export const AnalyticsGeneralOverview = () => {
  const { stats } = useSelector((state) => state.stats);
  const { clients, orders, partners } = stats;

  console.log({ stats });
  return (
    <Grid container spacing={4}>
      <Grid item md={4} sm={6} xs={12}>
        <Card>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              px: 3,
              py: 2,
            }}
          >
            <div>
              <Typography color="textSecondary" variant="h6">
                Clients
              </Typography>
              <Typography sx={{ mt: 1 }} variant="h5">
                {clients?.count?.toLocaleString("ru-RU")}
              </Typography>
            </div>
            <LineChart />
          </Box>
          <Divider />
          <CardActions
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography color="textSecondary" sx={{ ml: 1 }} variant="caption">
              Per day:{" "}
              {clients?.countPerDay &&
                Object.values(clients?.countPerDay)[0]?.toLocaleString("ru-RU")}
            </Typography>
          </CardActions>
        </Card>
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Card>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              px: 3,
              py: 2,
            }}
          >
            <div>
              <Typography color="textSecondary" variant="h6">
                Orders
              </Typography>
              <Typography sx={{ mt: 1 }} variant="h5">
                {orders?.count?.toLocaleString("ru-RU")}
              </Typography>
            </div>
            <LineChart />
          </Box>
          <Divider />
          <CardActions
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography color="textSecondary" sx={{ ml: 1 }} variant="caption">
              Per day:{" "}
              {orders?.countPerDay &&
                Object.values(orders?.countPerDay)[0]?.toLocaleString("ru-RU")}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                ml: 1,
              }}
            />

            <Typography color="textSecondary" sx={{ ml: 1 }} variant="caption">
              Amount: {orders?.amount?.toLocaleString("ru-RU")}с.
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                ml: 1,
              }}
            />
            <Typography color="textSecondary" sx={{ ml: 1 }} variant="caption">
              Processed: {orders?.countOfProcessed?.toLocaleString("ru-RU")}
            </Typography>
          </CardActions>
        </Card>
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Card>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              px: 3,
              py: 2,
            }}
          >
            <div>
              <Typography color="textSecondary" variant="h6">
                Partners
              </Typography>
              <Typography sx={{ mt: 1 }} variant="h5">
                {partners?.count?.toLocaleString("ru-RU")}
              </Typography>
            </div>
            <LineChart />
          </Box>
          <Divider />
          <CardActions
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography color="textSecondary" sx={{ ml: 1 }} variant="caption">
              Per day:{" "}
              {partners?.countPerDay &&
                Object.values(partners?.countPerDay)[0]?.toLocaleString(
                  "ru-RU"
                )}
            </Typography>
          </CardActions>
        </Card>
      </Grid>
      {/* <Grid item md={4} sm={6} xs={12}>
        <Card>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              px: 3,
              py: 2,
            }}
          >
            <div>
              <Typography color="textSecondary" variant="h6">
                Conversions
              </Typography>
              <Typography sx={{ mt: 1 }} variant="h5">
                131,3K
              </Typography>
            </div>
            <BarChart />
          </Box>
          <Divider />
          <CardActions
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Avatar
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.success.main, 0.08),
                color: "success.main",
                height: 36,
                width: 36,
              }}
            >
              <ChevronUpIcon fontSize="small" />
            </Avatar>
            <Typography color="textSecondary" sx={{ ml: 1 }} variant="caption">
              12% more then last month
            </Typography>
          </CardActions>
        </Card>
      </Grid> */}
    </Grid>
  );
};
