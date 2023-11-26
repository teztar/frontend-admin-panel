import { useState } from "react";
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
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import { getInitials } from "@utils/get-initials";
import { Scrollbar } from "../../scrollbar";
import { format } from "date-fns";
import TablePaginationActions from "@utils/tablePaginationActions";
import { SeverityPill } from "@components/severity-pill";
import { ClientStatusModal } from "./client-status-modal";

export const ClientListTable = (props) => {
  const {
    clients,
    clientsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  const [open, setOpen] = useState(false);

  const [currentClient, setCurrentClient] = useState();

  const toggleModal = (point) => {
    setOpen((prevValue) => !prevValue);
    setCurrentClient(point);
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Surname Name Patronymic</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow hover key={client.id}>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      src={client.avatar}
                      sx={{
                        height: 42,
                        width: 42,
                      }}
                    >
                      {getInitials(client.name)}
                    </Avatar>
                    <Box sx={{ ml: 1 }}>
                      <NextLink
                        href={`/dashboard/clients/${client.id}/orders`}
                        passHref
                      >
                        <Link color="inherit" variant="subtitle2">
                          {client.surname} {client.name} {client.patronymic}
                        </Link>
                      </NextLink>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  {format(new Date(client.birthday), "dd.MM.yyyy")}
                </TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.gender}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      client.status === "CLIENT_NEW" ? "primary" : "success"
                    }
                  >
                    {client.status}
                  </SeverityPill>
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="Change status">
                    <IconButton
                      component="a"
                      onClick={() => toggleModal(client)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <NextLink
                    href={`/dashboard/clients/${client.id}/edit`}
                    passHref
                  >
                    <Tooltip title="Edit client">
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </NextLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      {open && (
        <ClientStatusModal
          open={open}
          handleClose={toggleModal}
          client={currentClient}
        />
      )}
      <TablePagination
        component="div"
        count={clientsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
        ActionsComponent={TablePaginationActions}
      />
    </div>
  );
};

ClientListTable.propTypes = {
  clients: PropTypes.array.isRequired,
  clientsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
