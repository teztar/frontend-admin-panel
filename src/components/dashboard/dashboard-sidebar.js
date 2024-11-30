import { useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AssistWalkerIcon from "@mui/icons-material/AssistWalker";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import DiningIcon from "@mui/icons-material/Dining";
import QueueIcon from "@mui/icons-material/Queue";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import { Home as HomeIcon } from "../../icons/home";
import { ShoppingBag as ShoppingBagIcon } from "../../icons/shopping-bag";
import { LockClosed as LockClosedIcon } from "../../icons/lock-closed";
import { Selector as SelectorIcon } from "../../icons/selector";
import { ShoppingCart as ShoppingCartIcon } from "../../icons/shopping-cart";
import { Users as UsersIcon } from "../../icons/users";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MoneyIcon from "@mui/icons-material/Money";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { Logo } from "../logo";
import { Scrollbar } from "../scrollbar";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import { OrganizationPopover } from "./organization-popover";

const getSections = (t) => [
  {
    title: t("General"),
    items: [
      {
        title: t("Overview"),
        path: "/dashboard",
        icon: <HomeIcon fontSize="small" />,
      },
      {
        title: t("Analytics"),
        path: "/dashboard/analytics",
        icon: <ChartBarIcon fontSize="small" />,
      },
      // {
      //   title: t("Finance"),
      //   path: "/dashboard/finance",
      //   icon: <ChartPieIcon fontSize="small" />,
      // },
      // {
      //   title: t("Logistics"),
      //   path: "/dashboard/logistics",
      //   icon: <TruckIcon fontSize="small" />,
      //   chip: (
      //     <Chip
      //       color="secondary"
      //       label={
      //         <Typography
      //           sx={{
      //             fontSize: "10px",
      //             fontWeight: "600",
      //           }}
      //         >
      //           NEW
      //         </Typography>
      //       }
      //       size="small"
      //     />
      //   ),
      // },
      // {
      //   title: t("Account"),
      //   path: "/dashboard/account",
      //   icon: <UserCircleIcon fontSize="small" />,
      // },
    ],
  },
  {
    title: t("Управление"),
    items: [
      {
        title: t("Транзакции"),
        path: "/dashboard/transactions",
        icon: <ReceiptIcon fontSize="small" />,
      },
      {
        title: t("Сотрудничество"),
        path: "/dashboard/cooperation",
        icon: <CorporateFareIcon fontSize="small" />,
      },
      {
        title: t("Баннеры"),
        path: "/dashboard/banners",
        icon: <ViewCarouselIcon fontSize="small" />,
      },
      {
        title: t("Партнёры"),
        path: "/dashboard/partners",
        icon: <HandshakeIcon fontSize="small" />,
      },
      {
        title: t("Баланс партнёров"),
        path: "/dashboard/partners-balance",
        icon: <MoneyIcon fontSize="small" />,
      },
      {
        title: t("Заказы"),
        icon: <ShoppingCartIcon fontSize="small" />,
        path: "/dashboard/orders",
      },
      {
        title: t("Бонусы"),
        path: "/dashboard/bonuses",
        icon: <CardGiftcardIcon fontSize="small" />,
      },
      {
        title: t("Push-уведомления"),
        path: "/dashboard/push-notifications",
        icon: <NotificationsActiveIcon fontSize="small" />,
      },
      {
        title: t("Категории продуктов"),
        path: "/dashboard/product-categories",
        icon: <ShoppingBagIcon fontSize="small" />,
      },
      {
        title: t("Очередь категорий"),
        path: "/dashboard/categories-queue",
        icon: <QueueIcon fontSize="small" />,
      },
      {
        title: t("Тип кухни"),
        path: "/dashboard/kitchen-types",
        icon: <DiningIcon fontSize="small" />,
      },
      {
        title: t("Клиенты"),
        path: "/dashboard/clients",
        icon: <SupervisedUserCircleIcon fontSize="small" />,
      },
      {
        title: t("Курьеры"),
        path: "/dashboard/couriers",
        icon: <AssistWalkerIcon fontSize="small" />,
      },
      {
        title: t("Пользователи"),
        path: "/dashboard/users",
        icon: <UsersIcon fontSize="small" />,
      },
      {
        title: t("Роли"),
        path: "/dashboard/roles",
        icon: <LockClosedIcon fontSize="small" />,
      },
    ],
  },
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] =
    useState(false);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const handleOpenOrganizationsPopover = () => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink href="/" passHref>
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                  />
                </a>
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                onClick={handleOpenOrganizationsPopover}
                ref={organizationsRef}
                sx={{
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  px: 3,
                  py: "11px",
                  borderRadius: 1,
                }}
              >
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    Acme Inc
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    {t("Your tier")} : Premium
                  </Typography>
                </div>
                <SelectorIcon
                  sx={{
                    color: "neutral.500",
                    width: 14,
                    height: 14,
                  }}
                />
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: "#2D3748",
              my: 3,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  "& + &": {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
          {/* <Divider
            sx={{
              borderColor: "#2D3748", // dark divider
            }}
          />
          <Box sx={{ p: 2 }}>
            <Typography color="neutral.100" variant="subtitle2">
              {t("Need Help?")}
            </Typography>
            <Typography color="neutral.500" variant="body2">
              {t("Check our docs")}
            </Typography>
            <NextLink href="/docs/welcome" passHref>
              <Button
                color="secondary"
                component="a"
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                {t("Documentation")}
              </Button>
            </NextLink>
          </Box> */}
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
