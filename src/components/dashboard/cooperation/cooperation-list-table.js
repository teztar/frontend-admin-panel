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
import TablePaginationActions from "@utils/tablePaginationActions";
import { getInitials } from "@utils/get-initials";
import { Scrollbar } from "../../scrollbar";
import { SeverityPill } from "@components/severity-pill";

export const CooperationListTable = (props) => {
  const {
    cooperations,
    cooperationsCount,
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
              <TableCell>Phone</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cooperations.map((cooperation) => (
              <TableRow hover key={cooperation.id}>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      src={cooperation.avatar}
                      sx={{
                        height: 42,
                        width: 42,
                      }}
                    >
                      {getInitials(cooperation.name)}
                    </Avatar>
                    <Box sx={{ ml: 1 }}>
                      <NextLink
                        href={`/dashboard/cooperations/${cooperation.id}/edit`}
                        passHref
                      >
                        <Link color="inherit" variant="subtitle2">
                          {cooperation.name}
                        </Link>
                      </NextLink>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{cooperation.phone}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      cooperation.type === "PARTNER" ? "success" : "warning"
                    }
                  >
                    {cooperation.type}
                  </SeverityPill>
                </TableCell>
                <TableCell align="right">
                  {/* <NextLink
                    href={`/dashboard/cooperations/${cooperation.id}/edit`}
                    passHref
                  > */}
                  <IconButton component="a">
                    <PencilAltIcon fontSize="small" />
                  </IconButton>
                  {/* </NextLink> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={cooperationsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
        page={page}
        rowsPerPage={rowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </div>
  );
};

CooperationListTable.propTypes = {
  cooperations: PropTypes.array.isRequired,
  cooperationsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
