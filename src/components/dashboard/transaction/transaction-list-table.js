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
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import { getInitials } from "@utils/get-initials";
import { Scrollbar } from "../../scrollbar";

export const TransactionListTable = (props) => {
  const {
    transactions,
    transactionsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  // Reset selected transactions when transactions change
  useEffect(
    () => {
      if (selectedTransactions.length) {
        setSelectedTransactions([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactions]
  );

  const handleSelectAllTransactions = (event) => {
    setSelectedTransactions(
      event.target.checked
        ? transactions.map((transaction) => transaction.id)
        : []
    );
  };

  const handleSelectOneTransaction = (event, transactionId) => {
    if (!selectedTransactions.includes(transactionId)) {
      setSelectedTransactions((prevSelected) => [
        ...prevSelected,
        transactionId,
      ]);
    } else {
      setSelectedTransactions((prevSelected) =>
        prevSelected.filter((id) => id !== transactionId)
      );
    }
  };

  const enableBulkActions = selectedTransactions.length > 0;
  const selectedSomeTransactions =
    selectedTransactions.length > 0 &&
    selectedTransactions.length < transactions.length;
  const selectedAllTransactions =
    selectedTransactions.length === transactions.length;

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
          checked={selectedAllTransactions}
          indeterminate={selectedSomeTransactions}
          onChange={handleSelectAllTransactions}
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
                  checked={selectedAllTransactions}
                  indeterminate={selectedSomeTransactions}
                  onChange={handleSelectAllTransactions}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => {
              const isTransactionSelected = selectedTransactions.includes(
                transaction.id
              );

              return (
                <TableRow
                  hover
                  key={transaction.id}
                  selected={isTransactionSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isTransactionSelected}
                      onChange={(event) =>
                        handleSelectOneTransaction(event, transaction.id)
                      }
                      value={isTransactionSelected}
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
                        src={transaction.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(transaction.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/transactions/${transaction.id}/edit`}
                          passHref
                        >
                          <Link color="inherit" variant="subtitle2">
                            {transaction.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>{transaction.role?.name}</TableCell>
                  <TableCell>{transaction.email}</TableCell>

                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/transactions/${transaction.id}/edit`}
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
        count={transactionsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

TransactionListTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  transactionsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
