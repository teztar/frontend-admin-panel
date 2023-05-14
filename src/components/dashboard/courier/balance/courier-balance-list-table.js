import { useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { getInitials } from "@utils/get-initials";
import { format } from "date-fns";
import { Scrollbar } from "@components/scrollbar";

export const CourierBalanceListTable = (props) => {
  const { courierBalances, ...other } = props;

  const [open, setOpen] = useState(false);

  const [currentCourier, setCurrentCourier] = useState();

  const toggleModal = (courier) => {
    console.log({ courier });
    setOpen((prevValue) => !prevValue);
    setCurrentCourier(courier);
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>FIO</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Birthdate</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Passport</TableCell>
              <TableCell>Start Work Time</TableCell>
              <TableCell>End Work Time</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courierBalances.map((courier) => (
              <TableRow hover key={courier.id}>
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
                          {courier.surname} {courier.name} {courier.patronymic}
                        </Link>
                      </NextLink>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{courier.status}</TableCell>
                <TableCell>
                  {format(new Date(courier.dateOfBirth), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>{courier.phoneNumber}</TableCell>
                <TableCell>{courier.passportSeries}</TableCell>
                <TableCell>{courier.startWorkTime}</TableCell>
                <TableCell>{courier.endWorkTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </div>
  );
};

CourierBalanceListTable.propTypes = {
  courierBalances: PropTypes.array.isRequired,
};
