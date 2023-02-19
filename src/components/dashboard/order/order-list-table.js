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
} from "@mui/material";
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import { Scrollbar } from "../../scrollbar";
import TablePaginationActions from "@utils/tablePaginationActions";
import { OrderStatusModal } from "./order-status-modal";

export const OrderListTable = (props) => {
  const {
    orders,
    ordersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  const [open, setOpen] = useState(false);

  const [currentOrder, setCurrentOrder] = useState();

  const toogleModal = (order) => {
    setOpen((prevValue) => !prevValue);
    setCurrentOrder(order);
  };

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
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow hover key={order.id}>
                <TableCell>{order.addedFrom}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.paymentOption}</TableCell>
                <TableCell>{order.partner?.brand}</TableCell>
                <TableCell>{order.partner?.brand}</TableCell>
                <TableCell>{order.client?.name}</TableCell>
                <TableCell>{order.client?.phone}</TableCell>
                <TableCell>{order.status}</TableCell>

                <TableCell align="right">
                  {/* <NextLink
                    href={`/dashboard/orders/${order.id}/edit`}
                    passHref
                  > */}
                  <IconButton component="a" onClick={() => toogleModal(order)}>
                    <PencilAltIcon fontSize="small" />
                  </IconButton>
                  {/* </NextLink> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      {open && (
        <OrderStatusModal
          open={open}
          handleClose={toogleModal}
          order={currentOrder}
        />
      )}
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

OrderListTable.propTypes = {
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
