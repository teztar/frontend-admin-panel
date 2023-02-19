import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { orderStatuses } from "@constants/index";
import { useDispatch } from "src/store";
import { updateOrder } from "@services/index";
import { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: "50vw",
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

  const { open, handleClose, order } = props;

  const [status, setStatus] = useState(order.status);

  const updateOrderStatus = () => {
    dispatch(updateOrder({ id: order.id, status: status }));
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{
        minWidth: "50vw",
      }}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Update order status
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <TextField
          label="Status"
          name="status"
          onChange={(e) => setStatus(e.target.value)}
          select
          SelectProps={{ native: true }}
          sx={{ m: 1.5 }}
          value={status}
        >
          {orderStatuses.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={updateOrderStatus}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
