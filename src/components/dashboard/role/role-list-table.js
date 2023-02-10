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

export const RoleListTable = (props) => {
  const {
    roles,
    rolesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedRoles, setSelectedRoles] = useState([]);

  // Reset selected roles when roles change
  useEffect(
    () => {
      if (selectedRoles.length) {
        setSelectedRoles([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roles]
  );

  const handleSelectAllRoles = (event) => {
    setSelectedRoles(event.target.checked ? roles.map((role) => role.id) : []);
  };

  const handleSelectOneRole = (event, roleId) => {
    if (!selectedRoles.includes(roleId)) {
      setSelectedRoles((prevSelected) => [...prevSelected, roleId]);
    } else {
      setSelectedRoles((prevSelected) =>
        prevSelected.filter((id) => id !== roleId)
      );
    }
  };

  const enableBulkActions = selectedRoles.length > 0;
  const selectedSomeRoles =
    selectedRoles.length > 0 && selectedRoles.length < roles.length;
  const selectedAllRoles = selectedRoles.length === roles.length;

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
          checked={selectedAllRoles}
          indeterminate={selectedSomeRoles}
          onChange={handleSelectAllRoles}
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
                  checked={selectedAllRoles}
                  indeterminate={selectedSomeRoles}
                  onChange={handleSelectAllRoles}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => {
              const isRoleSelected = selectedRoles.includes(role.id);

              return (
                <TableRow hover key={role.id} selected={isRoleSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isRoleSelected}
                      onChange={(event) => handleSelectOneRole(event, role.id)}
                      value={isRoleSelected}
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
                        src={role.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(role.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/roles/${role.id}/edit`}
                          passHref
                        >
                          <Link color="inherit" variant="subtitle2">
                            {role.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <NextLink
                      href={`/dashboard/roles/${role.id}/edit`}
                      passHref
                    >
                      <Button variant="contained">
                        Посмотреть permissions
                      </Button>
                    </NextLink>
                  </TableCell>

                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/roles/${role.id}/edit`}
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
        count={rolesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

RoleListTable.propTypes = {
  roles: PropTypes.array.isRequired,
  rolesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
