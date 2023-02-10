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
  const [selectedClients, setSelectedClients] = useState([]);

  // Reset selected clients when clients change
  useEffect(
    () => {
      if (selectedClients.length) {
        setSelectedClients([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clients]
  );

  const handleSelectAllClients = (event) => {
    setSelectedClients(
      event.target.checked ? clients.map((client) => client.id) : []
    );
  };

  const handleSelectOneClient = (event, clientId) => {
    if (!selectedClients.includes(clientId)) {
      setSelectedClients((prevSelected) => [...prevSelected, clientId]);
    } else {
      setSelectedClients((prevSelected) =>
        prevSelected.filter((id) => id !== clientId)
      );
    }
  };

  const enableBulkActions = selectedClients.length > 0;
  const selectedSomeClients =
    selectedClients.length > 0 && selectedClients.length < clients.length;
  const selectedAllClients = selectedClients.length === clients.length;

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
          checked={selectedAllClients}
          indeterminate={selectedSomeClients}
          onChange={handleSelectAllClients}
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
                  checked={selectedAllClients}
                  indeterminate={selectedSomeClients}
                  onChange={handleSelectAllClients}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => {
              const isClientSelected = selectedClients.includes(client.id);

              return (
                <TableRow hover key={client.id} selected={isClientSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isClientSelected}
                      onChange={(event) =>
                        handleSelectOneClient(event, client.id)
                      }
                      value={isClientSelected}
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
                          href={`/dashboard/clients/${client.id}/edit`}
                          passHref
                        >
                          <Link color="inherit" variant="subtitle2">
                            {client.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    {format(new Date(client.birthday), "dd.MM.yyyy")}
                  </TableCell>
                  <TableCell>{client.phone}</TableCell>

                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/clients/${client.id}/edit`}
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
        count={clientsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
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
