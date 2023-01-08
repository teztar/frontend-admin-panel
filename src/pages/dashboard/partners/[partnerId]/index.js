import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Head from "next/head";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { PartnerBasicDetails } from "../../../../components/dashboard/partner/partner-basic-details";
import { PartnerDataManagement } from "../../../../components/dashboard/partner/partner-data-management";
import { PartnerEmailsSummary } from "../../../../components/dashboard/partner/partner-emails-summary";
import { PartnerInvoices } from "../../../../components/dashboard/partner/partner-invoices";
import { PartnerPayment } from "../../../../components/dashboard/partner/partner-payment";
import { PartnerLogs } from "../../../../components/dashboard/partner/partner-logs";
import { useMounted } from "../../../../hooks/use-mounted";
import { ChevronDown as ChevronDownIcon } from "../../../../icons/chevron-down";
import { PencilAlt as PencilAltIcon } from "../../../../icons/pencil-alt";
import { gtm } from "../../../../lib/gtm";
import { getInitials } from "../../../../utils/get-initials";
import { useDispatch } from "src/store";
import { getPoints } from "@services/index";

const tabs = [
  { label: "Details", value: "details" },
  { label: "Invoices", value: "invoices" },
  { label: "Logs", value: "logs" },
];

const PartnerDetails = () => {
  const dispatch = useDispatch();

  const { query } = useRouter();
  const isMounted = useMounted();
  const [partner, setPartner] = useState(null);
  const [currentTab, setCurrentTab] = useState("details");

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(
    () => {
      dispatch(getPoints({ partnerId: query?.partnerId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!partner) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Partners Details</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <div>
            <Box sx={{ mb: 4 }}>
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
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid
                item
                sx={{
                  alignItems: "center",
                  display: "flex",
                  overflow: "hidden",
                }}
              >
                <Avatar
                  src={partner.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64,
                  }}
                >
                  {getInitials(partner.name)}
                </Avatar>
                <div>
                  <Typography variant="h4">{partner.email}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">user_id:</Typography>
                    <Chip label={partner.id} size="small" sx={{ ml: 1 }} />
                  </Box>
                </div>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <NextLink href="/dashboard/partners/1/edit" passHref>
                  <Button
                    component="a"
                    endIcon={<PencilAltIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </NextLink>
                <Button
                  endIcon={<ChevronDownIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Actions
                </Button>
              </Grid>
            </Grid>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </div>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === "details" && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <PartnerBasicDetails
                    address1={partner.address1}
                    address2={partner.address2}
                    country={partner.country}
                    email={partner.email}
                    isVerified={!!partner.isVerified}
                    phone={partner.phone}
                    state={partner.state}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PartnerPayment />
                </Grid>
                <Grid item xs={12}>
                  <PartnerEmailsSummary />
                </Grid>
                <Grid item xs={12}>
                  <PartnerDataManagement />
                </Grid>
              </Grid>
            )}
            {currentTab === "invoices" && <PartnerInvoices />}
            {currentTab === "logs" && <PartnerLogs />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

PartnerDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default PartnerDetails;
