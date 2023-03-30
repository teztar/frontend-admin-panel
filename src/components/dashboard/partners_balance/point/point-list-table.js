import { useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import { Scrollbar } from "@components/scrollbar";
import TablePaginationActions from "@utils/tablePaginationActions";
import { format } from "date-fns";
import { SeverityPill } from "@components/severity-pill";
import { PointStatusModal } from "./point-status-modal";

export const PointListTable = (props) => {
  const {
    points,
    pointsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  const [open, setOpen] = useState(false);

  const [currentPoint, setCurrentPoint] = useState();

  const toggleModal = (point) => {
    setOpen((prevValue) => !prevValue);
    setCurrentPoint(point);
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>date</TableCell>
              <TableCell>debt amount</TableCell>
              <TableCell>brand</TableCell>
              <TableCell>turnover commission</TableCell>
              <TableCell>status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {points && points.length > 0 ? (
              points.map((point) => (
                <TableRow hover key={point.id}>
                  <TableCell>
                    {format(new Date(point.date), "dd-MM-yyyy")}
                  </TableCell>
                  <TableCell>{point.debtAmount}</TableCell>
                  <TableCell>{point.partner.brand}</TableCell>
                  <TableCell>{point.turnoverCommission}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={point.status === "PAID" ? "success" : "error"}
                    >
                      {point.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Change status">
                      <IconButton
                        component="a"
                        onClick={() => toggleModal(point)}
                      >
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>
                  <Typography>No Points</Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Scrollbar>
      {open && (
        <PointStatusModal
          open={open}
          handleClose={toggleModal}
          point={currentPoint}
        />
      )}
      <TablePagination
        component="div"
        count={pointsCount}
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

PointListTable.propTypes = {
  points: PropTypes.array.isRequired,
  pointsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
