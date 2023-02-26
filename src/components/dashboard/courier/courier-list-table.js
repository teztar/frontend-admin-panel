import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
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
import TablePaginationActions from "@utils/tablePaginationActions";
import { SeverityPill } from "@components/severity-pill";

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

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Surname Name Patronymic</TableCell>
              <TableCell>Active</TableCell>
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
            {couriers.map((courier) => {
              return (
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
                            {courier.surname} {courier.name}{" "}
                            {courier.patronymic}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <SeverityPill color={courier.active ? "success" : "error"}>
                      {courier.active ? "ACTIVE" : "INACTIVE"}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>{courier.status}</TableCell>
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
        ActionsComponent={TablePaginationActions}
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
