import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import TablePaginationActions from "@utils/tablePaginationActions";
import { SeverityPill } from "@components/severity-pill";
import { Scrollbar } from "@components/scrollbar";
import { format } from "date-fns";

export const PartnersBalancePointTransactionListTable = (props) => {
  const {
    transactions,
    transactionsCount,
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
              <TableCell>Point name</TableCell>
              <TableCell>partner commission</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>debt amount</TableCell>
              <TableCell>date</TableCell>
              <TableCell>operation type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow hover key={transaction.id}>
                <TableCell>{transaction.point?.name}</TableCell>
                <TableCell>
                  {transaction.partnerCommission?.toLocaleString("ru")}
                </TableCell>
                <TableCell>
                  {transaction.amount?.toLocaleString("ru")}
                </TableCell>
                <TableCell>
                  {transaction.debtAmount?.toLocaleString("ru")}
                </TableCell>
                <TableCell>
                  {format(new Date(transaction.date), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      transaction.operationType === "REPLENISHMENT"
                        ? "success"
                        : "error"
                    }
                  >
                    {transaction.operationType}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={transactionsCount}
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

PartnersBalancePointTransactionListTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  transactionsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
