import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
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
import TablePaginationActions from "@utils/tablePaginationActions";

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

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow hover key={role.id}>
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
                  <NextLink href={`/dashboard/roles/${role.id}/edit`} passHref>
                    <Button variant="contained">Посмотреть permissions</Button>
                  </NextLink>
                </TableCell>

                <TableCell align="right">
                  <NextLink href={`/dashboard/roles/${role.id}/edit`} passHref>
                    <IconButton component="a">
                      <PencilAltIcon fontSize="small" />
                    </IconButton>
                  </NextLink>
                </TableCell>
              </TableRow>
            ))}
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
        ActionsComponent={TablePaginationActions}
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
