import { useEffect, useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import { Scrollbar } from "../../scrollbar";
import TablePaginationActions from "@utils/tablePaginationActions";
import { format } from "date-fns";

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
  const [selectedPartnersBalances, setSelectedPartnersBalances] = useState([]);

  // Reset selected partnersBalance when partnersBalance change
  useEffect(
    () => {
      if (selectedPartnersBalances.length) {
        setSelectedPartnersBalances([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [partnersBalance]
  );

  const handleSelectAllPartnersBalances = (event) => {
    setSelectedPartnersBalances(
      event.target.checked
        ? partnersBalance.map((partnersBalance) => partnersBalance.id)
        : []
    );
  };

  const handleSelectOnePartnersBalance = (event, partnersBalanceId) => {
    if (!selectedPartnersBalances.includes(partnersBalanceId)) {
      setSelectedPartnersBalances((prevSelected) => [
        ...prevSelected,
        partnersBalanceId,
      ]);
    } else {
      setSelectedPartnersBalances((prevSelected) =>
        prevSelected.filter((id) => id !== partnersBalanceId)
      );
    }
  };

  const enableBulkActions = selectedPartnersBalances.length > 0;
  const selectedSomePartnersBalances =
    selectedPartnersBalances.length > 0 &&
    selectedPartnersBalances.length < partnersBalance.length;
  const selectedAllPartnersBalances =
    selectedPartnersBalances.length === partnersBalance.length;

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
            {partnersBalance.map((partnersBalance) => (
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
                <TableCell>{partnersBalance.status}</TableCell>

                <TableCell align="right">
                  <NextLink
                    href={`/dashboard/partnersBalance/${partnersBalance.id}/edit`}
                    passHref
                  >
                    <IconButton component="a">
                      <PencilAltIcon fontSize="small" />
                    </IconButton>
                  </NextLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
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

PartnersBalanceListTable.propTypes = {
  partnersBalance: PropTypes.array.isRequired,
  partnersBalanceCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
