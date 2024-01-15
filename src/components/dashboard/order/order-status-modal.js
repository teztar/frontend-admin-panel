import { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "src/store";
import { updateOrder } from "@services/index";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "50vw",
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

export const OrderStatusModal = (props) => {
  const dispatch = useDispatch();
  const { orderStatuses } = useSelector((state) => state.handbooks);

  const { open, handleClose, order } = props;

  const [status, setStatus] = useState(order.status);
  const [declineReason, setDeclineReason] = useState(order.declineReason ?? "");

  const updateOrderStatus = () => {
    dispatch(
      updateOrder({
        id: order.id,
        status: status,
        declineReason: declineReason,
      })
    );
    handleClose();
  };

  return (
    <BootstrapDialog onClose={handleClose} open={open}>
      <BootstrapDialogTitle onClose={handleClose}>
        Update order status
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <TextField
          select
          fullWidth
          label="Status"
          name="status"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          SelectProps={{ native: true }}
        >
          {orderStatuses?.map((option) => (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          ))}
        </TextField>

        <TextField
          sx={{ mt: 4 }}
          fullWidth
          name="declineReason"
          label="Decline reason"
          value={declineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
          required={status === "ORDER_CANCELED"}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={updateOrderStatus}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
