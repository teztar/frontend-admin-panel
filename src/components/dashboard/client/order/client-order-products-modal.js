import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "../../../scrollbar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: "70vw",
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

export const ClientOrderedProductsModal = (props) => {
  const { open, handleClose, orderedProducts } = props;

  return (
    <BootstrapDialog onClose={handleClose} open={open}>
      <BootstrapDialogTitle onClose={handleClose}>
        Client ordered products
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Count</TableCell>
                <TableCell>Product price</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Product category</TableCell>
                <TableCell>Product ingredients</TableCell>
                <TableCell>Product measuring</TableCell>
                <TableCell align="right">Product name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderedProducts.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.count?.toLocaleString("ru")}</TableCell>
                  <TableCell>
                    {order.productByVolume.price?.toLocaleString("ru")}
                  </TableCell>
                  <TableCell>{order.amount?.toLocaleString("ru")}</TableCell>
                  <TableCell>
                    {order.productByVolume.product.category}
                  </TableCell>
                  <TableCell>
                    {order.productByVolume.product.ingredients}
                  </TableCell>
                  <TableCell>{order.productByVolume.measuring}</TableCell>
                  <TableCell align="right">
                    {order.productByVolume.product?.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
