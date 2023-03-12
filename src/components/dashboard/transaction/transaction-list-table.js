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
import { Scrollbar } from "../../scrollbar";

export const TransactionListTable = (props) => {
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
              <TableCell>Client Name</TableCell>
              <TableCell>Client Phone</TableCell>
              <TableCell>Partner Name</TableCell>
              <TableCell>Partner Brand</TableCell>
              <TableCell>Partner Amount</TableCell>
              <TableCell>Added From</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Amount From Delivery</TableCell>
              <TableCell>Bonus</TableCell>
              <TableCell>Present bonus</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Courier Amount</TableCell>
              <TableCell>Payment Option</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow hover key={transaction.id}>
                <TableCell>{transaction.clientName}</TableCell>
                <TableCell>{transaction.clientPhone}</TableCell>
                <TableCell>{transaction.partnerName}</TableCell>
                <TableCell>{transaction.partnerBrand}</TableCell>
                <TableCell>
                  {transaction.partnerAmount?.toLocaleString("ru")}
                </TableCell>
                <TableCell>{transaction.addedFrom}</TableCell>
                <TableCell>{transaction.amount.toLocaleString("ru")}</TableCell>
                <TableCell>
                  {transaction.amountFromDelivery?.toLocaleString("ru")}
                </TableCell>
                <TableCell>{transaction.fixBonusFromOurSide}</TableCell>
                <TableCell>{transaction.presentBonusFromOurSide}</TableCell>
                <TableCell>
                  {transaction.commissionAmount?.toLocaleString("ru")}
                </TableCell>
                <TableCell>
                  {transaction.courierAmount?.toLocaleString("ru")}
                </TableCell>
                <TableCell>{transaction.paymentOption}</TableCell>
                <TableCell>{transaction.status}</TableCell>
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
        rowsPerPageOptions={[5, 10, 25]}
        ActionsComponent={TablePaginationActions}
      />
    </div>
  );
};

TransactionListTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  transactionsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
