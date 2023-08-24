import { useState } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  IconButton,
} from "@mui/material";
import TablePaginationActions from "@utils/tablePaginationActions";
import { getInitials } from "@utils/get-initials";
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import { ArrowRight as ArrowRightIcon } from "@icons/arrow-right";
import { Scrollbar } from "../../scrollbar";
import { SeverityPill } from "@components/severity-pill";
import { showInMap } from "@utils/showInMap";
import { CooperationStatusModal } from "./cooperation-status-modal";

export const CooperationListTable = (props) => {
  const {
    cooperations,
    cooperationsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  const [open, setOpen] = useState(false);
  const [openCooperationDetails, setOpenCooperationDetails] = useState(false);

  const [currentCooperation, setCurrentCooperation] = useState();

  const toggleModal = (cooperation) => {
    setOpen((prevValue) => !prevValue);
    setCurrentCooperation(cooperation);
  };

  const toggleCooperationDetailsModal = (cooperation) => {
    setCurrentCooperation(cooperation);
    setOpenCooperationDetails((prevValue) => !prevValue);
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>FIO</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Birth date</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cooperations.map((cooperation) => (
              <TableRow hover key={cooperation.id}>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      src={cooperation.avatar}
                      sx={{
                        height: 42,
                        width: 42,
                      }}
                    >
                      {getInitials(cooperation.name)}
                    </Avatar>
                    <Box sx={{ ml: 1 }}>
                      {cooperation.surname} {cooperation.name}{" "}
                      {cooperation.patronymic}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      cooperation.type === "PARTNER" ? "success" : "warning"
                    }
                  >
                    {cooperation.type}
                  </SeverityPill>
                </TableCell>
                <TableCell>{cooperation.phone}</TableCell>
                <TableCell>
                  {format(new Date(cooperation.dateOfBirth), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      showInMap(
                        cooperation?.address?.latitude,
                        cooperation?.address?.longitude
                      )
                    }
                  >
                    {cooperation.address.name}
                  </Button>
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      cooperation.status !== "PENDING" ? "success" : "warning"
                    }
                  >
                    {cooperation.status}
                  </SeverityPill>
                </TableCell>
                <TableCell align="right">
                  <Box display="flex">
                    <Tooltip title="Change status">
                      <IconButton
                        component="a"
                        onClick={() => toggleModal(cooperation)}
                      >
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Cooperation details">
                      <IconButton
                        component="a"
                        onClick={() =>
                          toggleCooperationDetailsModal(cooperation)
                        }
                      >
                        <ArrowRightIcon fontSize="small" />
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
        <CooperationStatusModal
          open={open}
          handleClose={toggleModal}
          cooperation={currentCooperation}
        />
      )}
      <TablePagination
        component="div"
        count={cooperationsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[10, 25, 50, 100]}
        page={page}
        rowsPerPage={rowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </div>
  );
};

CooperationListTable.propTypes = {
  cooperations: PropTypes.array.isRequired,
  cooperationsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
