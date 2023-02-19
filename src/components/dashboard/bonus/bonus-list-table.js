import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import { Scrollbar } from "../../scrollbar";
import TablePaginationActions from "@utils/tablePaginationActions";
import { format } from "date-fns";
import { SeverityPill } from "@components/severity-pill";

export const BonusListTable = (props) => {
  const {
    bonuses,
    bonusesCount,
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
              <TableCell>Product category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Fix bonus</TableCell>
              <TableCell>Present bonus percent</TableCell>
              <TableCell>Our bonus percent</TableCell>
              <TableCell>Start date</TableCell>
              <TableCell>End date</TableCell>
              <TableCell>Active</TableCell>

              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bonuses.map((bonus) => (
              <TableRow hover key={bonus.id}>
                <TableCell>{bonus.productCategory}</TableCell>
                <TableCell>{bonus.type}</TableCell>
                <TableCell>{bonus.commission}</TableCell>
                <TableCell>{bonus.fixBonus}</TableCell>
                <TableCell>{bonus.presentBonusPercent}</TableCell>
                <TableCell>{bonus.ourBonusPercent}</TableCell>
                <TableCell>
                  {format(new Date(bonus.startDate), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(bonus.endDate), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  <SeverityPill color={bonus.active ? "success" : "error"}>
                    {bonus.active ? "ACTIVE" : "INACTIVE"}
                  </SeverityPill>
                </TableCell>

                <TableCell align="right">
                  <NextLink
                    href={`/dashboard/bonuses/${bonus.id}/edit`}
                    passHref
                  >
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
        count={bonusesCount}
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

BonusListTable.propTypes = {
  bonuses: PropTypes.array.isRequired,
  bonusesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
