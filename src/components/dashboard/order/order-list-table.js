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
import { Scrollbar } from "../../scrollbar";
import TablePaginationActions from "@utils/tablePaginationActions";
import { OrderStatusModal } from "./order-status-modal";
import { SeverityPill } from "@components/severity-pill";

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

  const toggleModal = (order) => {
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

                <TableCell align="right">
                  {/* <NextLink
                    href={`/dashboard/orders/${order.id}/edit`}
                    passHref
                  > */}
                  <Tooltip title="Change status">
                    <IconButton
                      component="a"
                      onClick={() => toggleModal(order)}
                    >
                      <PencilAltIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
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
          handleClose={toggleModal}
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
