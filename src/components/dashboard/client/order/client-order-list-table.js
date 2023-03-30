import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "../../../scrollbar";
import TablePaginationActions from "@utils/tablePaginationActions";
import { SeverityPill } from "@components/severity-pill";

export const ClientOrderListTable = (props) => {
  const {
    orders,
    ordersCount,
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
              <TableCell>Added From</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Option</TableCell>
              <TableCell>Partner region</TableCell>
              <TableCell>Partner Brand</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Client Phone</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow hover key={order.id}>
                <TableCell>{order.addedFrom}</TableCell>
                <TableCell>{order.amount?.toLocaleString("ru")}</TableCell>
                <TableCell>{order.paymentOption}</TableCell>
                <TableCell>{order.partner?.brand}</TableCell>
                <TableCell>{order.partner?.brand}</TableCell>
                <TableCell>{order.client?.name}</TableCell>
                <TableCell>{order.client?.phone}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      (order.status === "ORDER_NEW" && "primary") ||
                      (order.status === "ORDER_ACCEPTED" && "success") ||
                      (order.status === "ORDER_CANCELED" && "error") ||
                      "info"
                    }
                  >
                    {order.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>

      <TablePagination
        component="div"
        count={ordersCount}
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

ClientOrderListTable.propTypes = {
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
