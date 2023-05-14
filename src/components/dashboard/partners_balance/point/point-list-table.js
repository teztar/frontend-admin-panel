import { useRouter } from "next/router";
import NextLink from "next/link";
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
} from "@mui/material";
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import { Scrollbar } from "@components/scrollbar";
import TablePaginationActions from "@utils/tablePaginationActions";
import { format } from "date-fns";
import { SeverityPill } from "@components/severity-pill";
import { ArrowRight as ArrowRightIcon } from "@icons/arrow-right";
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

  const { query } = useRouter();

  const partnerId = query?.partnerId;

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
              <TableCell>point name</TableCell>
              <TableCell>date</TableCell>
              <TableCell>debt amount for this period</TableCell>
              <TableCell>income amount for this period</TableCell>
              <TableCell>total debt amount</TableCell>
              <TableCell>total income amount</TableCell>
              <TableCell>status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {points.map((point) => (
              <TableRow hover key={point.pointId}>
                <TableCell>{point?.pointName}</TableCell>
                <TableCell>
                  {format(new Date(point.registrationDate), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  {point?.debtAmountForThisPeriod?.toLocaleString("ru")}
                </TableCell>
                <TableCell>
                  {point?.incomeAmountForThisPeriod?.toLocaleString("ru")}
                </TableCell>
                <TableCell>
                  {point?.totalDebtAmount?.toLocaleString("ru")}
                </TableCell>
                <TableCell>
                  {point?.totalIncomeAmount?.toLocaleString("ru")}
                </TableCell>
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
                  <NextLink
                    href={`/dashboard/partners-balance/${partnerId}/points/${point.pointId}/transactions`}
                    passHref
                  >
                    <IconButton component="a">
                      <ArrowRightIcon fontSize="small" />
                    </IconButton>
                  </NextLink>
                </TableCell>
              </TableRow>
            ))}
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
        rowsPerPageOptions={[10, 25, 50, 100]}
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
