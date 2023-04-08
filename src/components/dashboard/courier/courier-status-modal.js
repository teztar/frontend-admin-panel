import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "src/store";
import { getClientStatuses, updateClientStatus } from "@services/index";

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

export const CourierStatusModal = (props) => {
  const dispatch = useDispatch();

  const { courierStatuses } = useSelector((state) => state.handbooks);

  const { open, handleClose, courier } = props;

  const [status, setStatus] = useState(courier?.status);

  const handleUpdateClientStatus = () => {
    dispatch(updateClientStatus({ id: courier.id, status: status }));
  };

  useEffect(() => {
    dispatch(getClientStatuses());
  }, []);

  return (
    <BootstrapDialog onClose={handleClose} open={open}>
      <BootstrapDialogTitle onClose={handleClose}>
        Update courier status
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
          {courierStatuses?.map((option) => (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleUpdateClientStatus}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
