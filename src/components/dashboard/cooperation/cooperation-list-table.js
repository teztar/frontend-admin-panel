import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import TablePaginationActions from "@utils/tablePaginationActions";
import { getInitials } from "@utils/get-initials";
import { Scrollbar } from "../../scrollbar";
import { SeverityPill } from "@components/severity-pill";
import { format } from "date-fns";
import { showInMap } from "@utils/showInMap";

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
              <TableCell>FIO</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Birth date</TableCell>
              <TableCell>Show in map</TableCell>
              <TableCell>Status</TableCell>
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
                      {cooperation.surname} {cooperation.name}{" "}
                      {cooperation.patronymic}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      cooperation.type === "PARTNER" ? "success" : "warning"
                    }
                  >
                    {cooperation.type}
                  </SeverityPill>
                </TableCell>
                <TableCell>{cooperation.phone}</TableCell>
                <TableCell>
                  {format(new Date(cooperation.dateOfBirth), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      showInMap(
                        cooperation.geolocationLatitude,
                        cooperation.geolocationLongitude
                      )
                    }
                  >
                    Show in map
                  </Button>
                </TableCell>

                <TableCell>
                  <SeverityPill
                    color={
                      cooperation.status !== "PENDING" ? "success" : "warning"
                    }
                  >
                    {cooperation.status}
                  </SeverityPill>
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
