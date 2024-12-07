import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
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
import { PartnerListTable } from "@components/dashboard/partner/partner-list-table";
import { Plus as PlusIcon } from "@icons/plus";
import { Search as SearchIcon } from "@icons/search";
import { useDispatch, useSelector } from "src/store";
import { getPartners } from "@services/index";

const PartnerList = () => {
    const dispatch = useDispatch();

    const { partners, count } = useSelector((state) => state.partners);

    const router = useRouter();

    const queryRef = useRef(null);

    const queryParams = {
        page:router.query?.page ?? 0,
        perPage:router.query?.perPage ?? 10,
        search:router.query?.search ?? "",
    };

    const [search, setSearch] = useState(queryParams?.search);
    const [page, setPage] = useState(+queryParams.page);
    const [rowsPerPage, setRowsPerPage] = useState(+queryParams?.perPage);

    const handleQueryChange = (event) => {
        event.preventDefault();
        setPage(0);
        setSearch(queryRef.current?.value);
    };

    const handlePageChange = (_, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push(
                `/dashboard/partners?search=${search}&page=${page}&perPage=${rowsPerPage}`
            );
            dispatch(
                getPartners({
                    page:Number(page + 1),
                    perPage:Number(rowsPerPage),
                    search:search,
                })
            );
        }, 500);

        return () => clearTimeout(timer);
    }, [page, rowsPerPage, search]);

    return (
        <>
            <Head>
                <title>Панель: Список партнёров</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow:1,
                    py:8,
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{ mb:4 }}>
                        <Grid container justifyContent="space-between" spacing={3}>
                            <Grid item>
                                <Typography variant="h4">Партнёры</Typography>
                            </Grid>
                            <Grid item>
                                <NextLink href="/dashboard/partners/new" passHref>
                                    <Button
                                        startIcon={<PlusIcon fontSize="small"/>}
                                        variant="contained"
                                    >
                                        Добавить
                                    </Button>
                                </NextLink>
                            </Grid>
                        </Grid>
                    </Box>
                    <Card>
                        <Box
                            sx={{
                                alignItems:"center",
                                display:"flex",
                                flexWrap:"wrap",
                                m:-1.5,
                                p:3,
                            }}
                        >
                            <Box
                                sx={{
                                    flexGrow:1,
                                    m:1.5,
                                }}
                            >
                                <TextField
                                    defaultValue=""
                                    fullWidth
                                    value={search}
                                    onChange={handleQueryChange}
                                    inputProps={{ ref:queryRef }}
                                    InputProps={{
                                        startAdornment:(
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small"/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder="Поиск партнёров"
                                />
                            </Box>
                        </Box>
                        <PartnerListTable
                            partners={partners}
                            partnersCount={count}
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

PartnerList.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default PartnerList;
