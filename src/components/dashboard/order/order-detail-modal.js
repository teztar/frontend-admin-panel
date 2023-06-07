import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { getOrder } from "@services/index";
import { useDispatch, useSelector } from "src/store";
import { SeverityPill } from "@components/severity-pill";
import { Scrollbar } from "../../scrollbar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: "90vw",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export const OrderDetailModal = (props) => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orders);

  const { open, handleClose, orderId } = props;

  useEffect(() => {
    dispatch(getOrder({ id: orderId }));
  }, []);

  return (
    <BootstrapDialog onClose={handleClose} open={open}>
      <BootstrapDialogTitle onClose={handleClose}>
        Order details
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Added From</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Payment Option</TableCell>
                <TableCell>Partner region | Brand</TableCell>
                <TableCell>Point Name</TableCell>
                <TableCell>Client Name | Phone | Bonus</TableCell>
                <TableCell>delivery amount</TableCell>
                <TableCell>comment</TableCell>
                <TableCell>decline reason</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell>{order.addedFrom}</TableCell>
                <TableCell>{order.amount?.toLocaleString("ru")}</TableCell>
                <TableCell>{order.paymentOption}</TableCell>
                <TableCell>
                  {order.partner?.region} | {order.partner?.brand}
                </TableCell>
                <TableCell>{order.point?.name}</TableCell>
                <TableCell>
                  {order.client?.name} | {order.client?.phone} |{" "}
                  {order.clientTotalBonus?.toLocaleString("ru")}
                </TableCell>

                <TableCell>
                  {order.deliveryAmount?.toLocaleString("ru")}
                </TableCell>
                <TableCell>{order.comment}</TableCell>
                <TableCell>{order.decline_reason}</TableCell>
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
            </TableBody>
          </Table>
        </Scrollbar>
        <Scrollbar>
          <Table sx={{ minWidth: 700, mt: 7 }}>
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>measuring</TableCell>
                <TableCell>price</TableCell>
                <TableCell>volume</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>ingredients</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order?.orderProducts?.map((orderProduct) => (
                <TableRow hover key={orderProduct.id}>
                  <TableCell>
                    {orderProduct?.amount?.toLocaleString("ru")}
                  </TableCell>
                  <TableCell>
                    {orderProduct.count?.toLocaleString("ru")}
                  </TableCell>
                  <TableCell>
                    {orderProduct?.productByVolume?.measuring?.toLocaleString(
                      "ru"
                    )}
                  </TableCell>
                  <TableCell>
                    {orderProduct?.productByVolume?.price?.toLocaleString("ru")}
                  </TableCell>
                  <TableCell>{orderProduct?.productByVolume?.volume}</TableCell>
                  <TableCell>
                    {orderProduct?.productByVolume?.product?.name}
                  </TableCell>
                  <TableCell>
                    {orderProduct?.productByVolume?.product?.ingredients}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
