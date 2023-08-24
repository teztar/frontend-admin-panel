import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { PushNotificationListTable } from "@components/dashboard/push-notifications/push-notifications-list-table";
import { Plus as PlusIcon } from "@icons/plus";
import { Search as SearchIcon } from "@icons/search";
import { gtm } from "@lib/gtm";
import { useDispatch, useSelector } from "src/store";
import { useRouter } from "next/router";
import { getPushNotifications } from "@services/pushNotifications.service";

const sortOptions = [
  "AGE",
  "GENDER",
  "AVERAGE_ORDER_CHECK",
  "AVERAGE_ORDER_QUANTITY_PER_MONTH",
];

const formats = ["GENERAL", "SELECTIVE"];

const PushNotificationList = () => {
  const dispatch = useDispatch();

  const { pushNotifications, count } = useSelector(
    (state) => state.pushNotifications
  );

  const router = useRouter();

  const queryRef = useRef(null);

  const queryParams = {
    page: router.query?.page ?? 0,
    perPage: router.query?.perPage ?? 10,
    search: router.query?.search ?? "",
    sort: router.query?.sort ?? "",
    format: router.query?.format ?? "",
  };

  const [search, setSearch] = useState(queryParams.search);
  const [page, setPage] = useState(+queryParams.page);
  const [rowsPerPage, setRowsPerPage] = useState(+queryParams.perPage);
  const [sort, setSort] = useState(queryParams.sort);
  const [format, setFormat] = useState(queryParams.format);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setSearch(queryRef.current?.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        `/dashboard/push-notifications?search=${search}&sort=${sort}&format=${format}&page=${page}&perPage=${rowsPerPage}`
      );
      dispatch(
        getPushNotifications({
          page: Number(page + 1),
          perPage: Number(rowsPerPage),
          search: search,
          sort: sort,
          format: format,
        })
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [page, rowsPerPage, search, sort, format]);

  return (
    <>
      <Head>
        <title>Dashboard: PushNotification List</title>
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
                <Typography variant="h4">Push-уведомления</Typography>
              </Grid>
              <Grid item>
                <NextLink href="/dashboard/push-notifications/new" passHref>
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
                m: -1.5,
                p: 3,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  m: 1.5,
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  onChange={handleQueryChange}
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search push notifications"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                }}
              >
                <TextField
                  label="Sort By"
                  name="sort"
                  onChange={handleSortChange}
                  select
                  fullWidth
                  SelectProps={{ native: true }}
                  sx={{ m: 1.5 }}
                  value={sort}
                >
                  <option></option>
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
                <TextField
                  label="Format"
                  name="format"
                  onChange={handleFormatChange}
                  select
                  fullWidth
                  SelectProps={{ native: true }}
                  sx={{ m: 1.5 }}
                  value={format}
                >
                  <option></option>
                  {formats.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
              </Box>
            </Box>
            <PushNotificationListTable
              pushNotifications={pushNotifications}
              pushNotificationsCount={count}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

PushNotificationList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default PushNotificationList;
