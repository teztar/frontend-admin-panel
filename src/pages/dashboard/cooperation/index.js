import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { CooperationListTable } from "@components/dashboard/cooperation/cooperation-list-table";
import { Search as SearchIcon } from "@icons/search";
import { gtm } from "@lib/gtm";
import { useDispatch, useSelector } from "src/store";
import { getCooperations } from "@services/index";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";

const TYPES = ["PARTNER", "COURIER"];

const CooperationList = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { cooperations, count } = useSelector((state) => state.cooperations);

  const queryRef = useRef(null);

  const { query } = router;

  const queryParams = {
    page: query?.page ?? 0,
    perPage: query?.perPage ?? 10,
    search: query?.search ?? "",
    type: query?.type ?? "",
  };

  const [search, setSearch] = useState(queryParams?.search);
  const [page, setPage] = useState(+queryParams.page);
  const [rowsPerPage, setRowsPerPage] = useState(+queryParams?.perPage);
  const [type, setType] = useState(queryParams?.type);

  const handleQueryChange = (event) => {
    event.preventDefault();
    setSearch(queryRef.current?.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
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
        `/dashboard/cooperation?search=${search}&page=${page}&perPage=${rowsPerPage}&type=${type}`
      );
      dispatch(
        getCooperations({
          page: Number(page + 1),
          perPage: Number(rowsPerPage),
          search: search,
          type: type,
        })
      );
    }, 700);

    return () => clearTimeout(timer);
  }, [page, rowsPerPage, search, type]);

  return (
    <>
      <Head>
        <title>Dashboard: Cooperation List</title>
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
                <Typography variant="h4">Cooperations</Typography>
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
                  fullWidth
                  defaultValue=""
                  onChange={handleQueryChange}
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search cooperations"
                />
              </Box>
              <TextField
                label="Type By"
                name="type"
                onChange={handleTypeChange}
                select
                SelectProps={{ native: true }}
                sx={{ m: 1.5 }}
                value={type}
              >
                <option></option>
                {TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </Box>
            <CooperationListTable
              cooperations={cooperations}
              cooperationsCount={count}
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

CooperationList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CooperationList;
