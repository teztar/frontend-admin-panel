import { useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "src/store";
import { getOrder } from "@services/index";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "90vw",
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
      <DialogContent dividers>order</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
