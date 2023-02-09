import { useEffect, useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { PencilAlt as PencilAltIcon } from "../../../icons/pencil-alt";
import { getInitials } from "../../../utils/get-initials";
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
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
          display: enableBulkActions ? "block" : "none",
          px: 2,
          py: 0.5,
        }}
      >
        <Checkbox
          checked={selectedAllPartnersBalances}
          indeterminate={selectedSomePartnersBalances}
          onChange={handleSelectAllPartnersBalances}
        />
        <Button size="small" sx={{ ml: 2 }}>
          Delete
        </Button>
        <Button size="small" sx={{ ml: 2 }}>
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead
            sx={{ visibility: enableBulkActions ? "collapse" : "visible" }}
          >
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllPartnersBalances}
                  indeterminate={selectedSomePartnersBalances}
                  onChange={handleSelectAllPartnersBalances}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partnersBalance.map((partnersBalance) => {
              const isPartnersBalanceSelected =
                selectedPartnersBalances.includes(partnersBalance.id);

              return (
                <TableRow
                  hover
                  key={partnersBalance.id}
                  selected={isPartnersBalanceSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isPartnersBalanceSelected}
                      onChange={(event) =>
                        handleSelectOnePartnersBalance(
                          event,
                          partnersBalance.id
                        )
                      }
                      value={isPartnersBalanceSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar
                        src={partnersBalance.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(partnersBalance.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/partnersBalance/${partnersBalance.id}/edit`}
                          passHref
                        >
                          <Link color="inherit" variant="subtitle2">
                            {partnersBalance.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>{partnersBalance.role?.name}</TableCell>
                  <TableCell>{partnersBalance.email}</TableCell>

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
              );
            })}
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
