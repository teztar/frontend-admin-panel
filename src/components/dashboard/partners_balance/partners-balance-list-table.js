import { useState } from "react";
import { format } from "date-fns";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import TablePaginationActions from "@utils/tablePaginationActions";
import { SeverityPill } from "@components/severity-pill";
import { PartnersBalanceModal } from "./partners-balance-modal";
import { Scrollbar } from "../../scrollbar";

export const PartnersBalanceListTable = (props) => {
  const {
    partnersBalance,
    partnersBalanceCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  const [open, setOpen] = useState(false);

  const toogleModal = () => {
    setOpen((prevValue) => !prevValue);
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Partner Name</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Count Of Points</TableCell>
              <TableCell>Current Balance</TableCell>
              <TableCell>Turnover</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partnersBalance?.map((partnersBalance) => (
              <TableRow hover key={partnersBalance.id}>
                <TableCell>{partnersBalance.partnerName}</TableCell>
                <TableCell>
                  {format(
                    new Date(partnersBalance.registrationDate),
                    "dd-MM-yyyy"
                  )}
                </TableCell>
                <TableCell>{partnersBalance.region}</TableCell>
                <TableCell>{partnersBalance.countOfPoints}</TableCell>
                <TableCell>{partnersBalance.currentBalance}</TableCell>
                <TableCell>{partnersBalance.turnover}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      partnersBalance.status === "PAID" ? "success" : "error"
                    }
                  >
                    {partnersBalance.status}
                  </SeverityPill>
                </TableCell>

                <TableCell align="right">
                  {/* <NextLink
                    href={`/dashboard/partnersBalance/${partnersBalance.id}/edit`}
                    passHref
                  > */}
                  <Tooltip title="Update status">
                    <IconButton component="a" onClick={toogleModal}>
                      <PencilAltIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {/* </NextLink> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      {open && <PartnersBalanceModal open={open} handleClose={toogleModal} />}
      <TablePagination
        component="div"
        count={partnersBalanceCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        ActionsComponent={TablePaginationActions}
      />
    </div>
  );
};
