import PropTypes from "prop-types";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  Tooltip,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Scrollbar } from "../../../scrollbar";
import TablePaginationActions from "@utils/tablePaginationActions";
import { SeverityPill } from "@components/severity-pill";
import { showInMap } from "@utils/showInMap";
import { ClientOrderedProductsModal } from "./client-order-products-modal";
import { useState } from "react";

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

  const [open, setOpen] = useState(false);

  const [currentOrderedProducts, setCurrentOrderedProducts] = useState();

  const toggleModal = (point) => {
    setOpen((prevValue) => !prevValue);
    setCurrentOrderedProducts(point);
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Added From</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Delivery Amount</TableCell>
              <TableCell>Payment Option</TableCell>
              <TableCell>Partner region</TableCell>
              <TableCell>Partner Brand</TableCell>
              <TableCell>In map</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow hover key={order.id}>
                <TableCell>{order.addedFrom}</TableCell>
                <TableCell>{order.amount?.toLocaleString("ru")}</TableCell>
                <TableCell>
                  {order.deliveryAmount?.toLocaleString("ru")}
                </TableCell>
                <TableCell>{order.paymentOption}</TableCell>
                <TableCell>{order.partner?.brand}</TableCell>
                <TableCell>{order.partner?.brand}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      showInMap(
                        order.geolocationLatitude,
                        order.geolocationLongitude
                      )
                    }
                  >
                    Show in map
                  </Button>
                </TableCell>
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
                  <Tooltip title="Ordered Products">
                    <IconButton
                      component="a"
                      onClick={() => toggleModal(order.orderProducts)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      {open && (
        <ClientOrderedProductsModal
          open={open}
          handleClose={toggleModal}
          orderedProducts={currentOrderedProducts}
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

ClientOrderListTable.propTypes = {
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
