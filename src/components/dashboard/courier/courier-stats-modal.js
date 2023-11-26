import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "src/store";
import { getCourierStats, getPeriods } from "@services/index";
import { Chart } from "@components/chart";

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

export const CourierStatsModal = (props) => {
  const dispatch = useDispatch();

  const { periods } = useSelector((state) => state.handbooks);
  const { courierStats } = useSelector((state) => state.couriers);

  const { open, handleClose, courier } = props;

  const [period, setPeriod] = useState("YEAR");

  useEffect(() => {
    dispatch(getPeriods());
  }, []);

  useEffect(() => {
    dispatch(getCourierStats({ id: courier.id, period: period }));
  }, [courier?.id, period]);

  return (
    <BootstrapDialog onClose={handleClose} open={open}>
      <BootstrapDialogTitle onClose={handleClose}>
        Courier stats
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <TextField
          select
          fullWidth
          label="Period"
          name="period"
          onChange={(e) => setPeriod(e.target.value)}
          value={period}
          SelectProps={{ native: true }}
          InputLabelProps={{ shrink: true }}
        >
          {periods?.map((option) => (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          ))}
        </TextField>
        {Object.values(courierStats).length > 1 ? (
          <Chart
            options={{
              labels: Object.keys(courierStats)?.map((item) =>
                item
                  .split(/(?=[A-Z])/)
                  .join(" ")
                  .toUpperCase()
              ),
            }}
            series={Object.values(courierStats)}
            type="donut"
          />
        ) : (
          <Box>No data for this period</Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
