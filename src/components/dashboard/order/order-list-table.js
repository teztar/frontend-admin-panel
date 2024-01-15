import { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
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
import { ArrowRight as ArrowRightIcon } from "@icons/arrow-right";
import { Scrollbar } from "../../scrollbar";
import TablePaginationActions from "@utils/tablePaginationActions";
import { OrderStatusModal } from "./order-status-modal";
import { SeverityPill } from "@components/severity-pill";
import { OrderDetailModal } from "./order-detail-modal";

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
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const [currentOrder, setCurrentOrder] = useState();

  const toggleModal = (order) => {
    setOpen((prevValue) => !prevValue);
    setCurrentOrder(order);
  };

  const toggleOrderDetailsModal = (order) => {
    setCurrentOrder(order);
    setOpenOrderDetails((prevValue) => !prevValue);
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Added Date</TableCell>
              <TableCell>Added From</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Option</TableCell>
              <TableCell>Partner region</TableCell>
              <TableCell>Partner Brand</TableCell>
              <TableCell>Point Name</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Client Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow hover key={order.id}>
                <TableCell>
                  {format(new Date(order?.createdAt), "dd.MM.yyyy HH:mm")}
                </TableCell>
                <TableCell onClick={() => toggleOrderDetailsModal(order)}>
                  {order.addedFrom}
                </TableCell>
                <TableCell>{order.amount?.toLocaleString("ru")}</TableCell>
                <TableCell>{order.paymentOption}</TableCell>
                <TableCell>{order.partner?.brand}</TableCell>
                <TableCell>{order.partner?.brand}</TableCell>
                <TableCell>{order.point?.name}</TableCell>
                <TableCell>{order.client?.name}</TableCell>
                <TableCell>{order.client?.phone}</TableCell>
                <TableCell
                  onClick={() => toggleModal(order)}
                  style={{ cursor: "pointer" }}
                >
                  <SeverityPill
                    color={
                      (order.status === "ORDER_NEW" && "primary") ||
                      (order.status === "ORDER_ACCEPTED" && "success") ||
                      (order.status === "ORDER_CANCELED" && "error") ||
                      "info"
                    }
                  >
                    <div style={{ cursor: "pointer" }}>{order.status}</div>
                  </SeverityPill>
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="Order details">
                    <IconButton
                      component="a"
                      onClick={() => toggleOrderDetailsModal(order)}
                    >
                      <ArrowRightIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      {open && (
        <OrderStatusModal
          open={open}
          handleClose={toggleModal}
          order={currentOrder}
        />
      )}
      {openOrderDetails && (
        <OrderDetailModal
          open={openOrderDetails}
          handleClose={toggleOrderDetailsModal}
          orderId={currentOrder.id}
        />
      )}
      <TablePagination
        component="div"
        count={ordersCount}
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

OrderListTable.propTypes = {
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
