import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import { Scrollbar } from "../../scrollbar";
import TablePaginationActions from "@utils/tablePaginationActions";
import { format } from "date-fns";
import { SeverityPill } from "@components/severity-pill";
import { useState } from "react";
import { BannerDeleteModal } from "./banner-delete-modal";

export const BannerListTable = (props) => {
  const {
    banners,
    bannersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  const [open, setOpen] = useState(false);

  const [currentBanner, setCurrentBanner] = useState();

  const toggleModal = (order) => {
    setOpen((prevValue) => !prevValue);
    setCurrentBanner(order);
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>title</TableCell>
              <TableCell>body</TableCell>
              <TableCell>queue</TableCell>
              <TableCell>link </TableCell>
              <TableCell>Start date</TableCell>
              <TableCell>End date</TableCell>
              <TableCell>Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners.map((banner) => (
              <TableRow hover key={banner.id}>
                <TableCell>{banner.title}</TableCell>
                <TableCell>{banner.body}</TableCell>
                <TableCell>{banner.queue}</TableCell>
                <TableCell>{banner.link}</TableCell>
                <TableCell>
                  {format(new Date(banner.startDate), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(banner.endDate), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  <SeverityPill color={banner.active ? "success" : "error"}>
                    {banner.active ? "ACTIVE" : "INACTIVE"}
                  </SeverityPill>
                </TableCell>

                <TableCell align="right">
                  <Box display="flex">
                    <NextLink
                      href={`/dashboard/banners/${banner.id}/edit`}
                      passHref
                    >
                      <Tooltip title="Edit">
                        <IconButton component="a">
                          <PencilAltIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </NextLink>
                    <Tooltip title="Delete">
                      <IconButton
                        component="a"
                        onClick={() => toggleModal(banner)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      {open && (
        <BannerDeleteModal
          open={open}
          handleClose={toggleModal}
          banner={currentBanner}
        />
      )}
      <TablePagination
        component="div"
        count={bannersCount}
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

BannerListTable.propTypes = {
  banners: PropTypes.array.isRequired,
  bannersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
