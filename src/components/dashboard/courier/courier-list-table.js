import { useEffect, useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import { getInitials } from "@utils/get-initials";
import { Scrollbar } from "../../scrollbar";
import { format } from "date-fns";

export const CourierListTable = (props) => {
  const {
    couriers,
    couriersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedCouriers, setSelectedCouriers] = useState([]);

  // Reset selected couriers when couriers change
  useEffect(
    () => {
      if (selectedCouriers.length) {
        setSelectedCouriers([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [couriers]
  );

  const handleSelectAllCouriers = (event) => {
    setSelectedCouriers(
      event.target.checked ? couriers.map((courier) => courier.id) : []
    );
  };

  const handleSelectOneCourier = (event, courierId) => {
    if (!selectedCouriers.includes(courierId)) {
      setSelectedCouriers((prevSelected) => [...prevSelected, courierId]);
    } else {
      setSelectedCouriers((prevSelected) =>
        prevSelected.filter((id) => id !== courierId)
      );
    }
  };

  const enableBulkActions = selectedCouriers.length > 0;
  const selectedSomeCouriers =
    selectedCouriers.length > 0 && selectedCouriers.length < couriers.length;
  const selectedAllCouriers = selectedCouriers.length === couriers.length;

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
          display: enableBulkActions ? "block" : "none",
          px: 2,
          py: 0.5,
        }}
      >
        <Checkbox
          checked={selectedAllCouriers}
          indeterminate={selectedSomeCouriers}
          onChange={handleSelectAllCouriers}
        />
        <Button size="small" sx={{ ml: 2 }}>
          Delete
        </Button>
        <Button size="small" sx={{ ml: 2 }}>
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead
            sx={{ visibility: enableBulkActions ? "collapse" : "visible" }}
          >
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllCouriers}
                  indeterminate={selectedSomeCouriers}
                  onChange={handleSelectAllCouriers}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Birthdate</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Passport</TableCell>
              <TableCell>Start Work Time</TableCell>
              <TableCell>End Work Time</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {couriers.map((courier) => {
              const isCourierSelected = selectedCouriers.includes(courier.id);

              return (
                <TableRow hover key={courier.id} selected={isCourierSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isCourierSelected}
                      onChange={(event) =>
                        handleSelectOneCourier(event, courier.id)
                      }
                      value={isCourierSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar
                        src={courier.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(courier.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/couriers/${courier.id}/edit`}
                          passHref
                        >
                          <Link color="inherit" variant="subtitle2">
                            {courier.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    {format(new Date(courier.dateOfBirth), "dd-MM-yyyy")}
                  </TableCell>
                  <TableCell>{courier.phoneNumber}</TableCell>
                  <TableCell>{courier.passportSeries}</TableCell>
                  <TableCell>{courier.startWorkTime}</TableCell>
                  <TableCell>{courier.endWorkTime}</TableCell>

                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/couriers/${courier.id}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={couriersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

CourierListTable.propTypes = {
  couriers: PropTypes.array.isRequired,
  couriersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
