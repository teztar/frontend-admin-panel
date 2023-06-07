import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "src/store";
import { deleteBanner, getBanners } from "@services/index";

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

export const BannerDeleteModal = (props) => {
  const dispatch = useDispatch();

  const { open, handleClose, banner } = props;

  const handleDeleteBanner = () => {
    dispatch(deleteBanner({ id: banner.id }));
    handleClose();
    setTimeout(() => {
      dispatch(getBanners());
    }, 500);
  };

  return (
    <BootstrapDialog onClose={handleClose} open={open}>
      <BootstrapDialogTitle onClose={handleClose}>
        Delete -<strong> {banner.title} </strong> - banner
      </BootstrapDialogTitle>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleDeleteBanner}
          variant="outlined"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};
