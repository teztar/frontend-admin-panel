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
  const [selectedCooperations, setSelectedCooperations] = useState([]);

  // Reset selected cooperations when cooperations change
  useEffect(
    () => {
      if (selectedCooperations.length) {
        setSelectedCooperations([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cooperations]
  );

  const handleSelectAllCooperations = (event) => {
    setSelectedCooperations(
      event.target.checked
        ? cooperations.map((cooperation) => cooperation.id)
        : []
    );
  };

  const handleSelectOneCooperation = (event, cooperationId) => {
    if (!selectedCooperations.includes(cooperationId)) {
      setSelectedCooperations((prevSelected) => [
        ...prevSelected,
        cooperationId,
      ]);
    } else {
      setSelectedCooperations((prevSelected) =>
        prevSelected.filter((id) => id !== cooperationId)
      );
    }
  };

  const enableBulkActions = selectedCooperations.length > 0;
  const selectedSomeCooperations =
    selectedCooperations.length > 0 &&
    selectedCooperations.length < cooperations.length;
  const selectedAllCooperations =
    selectedCooperations.length === cooperations.length;

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
          checked={selectedAllCooperations}
          indeterminate={selectedSomeCooperations}
          onChange={handleSelectAllCooperations}
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
                  checked={selectedAllCooperations}
                  indeterminate={selectedSomeCooperations}
                  onChange={handleSelectAllCooperations}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cooperations.map((cooperation) => {
              const isCooperationSelected = selectedCooperations.includes(
                cooperation.id
              );

              return (
                <TableRow
                  hover
                  key={cooperation.id}
                  selected={isCooperationSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isCooperationSelected}
                      onChange={(event) =>
                        handleSelectOneCooperation(event, cooperation.id)
                      }
                      value={isCooperationSelected}
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
                        src={cooperation.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(cooperation.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/cooperations/${cooperation.id}/edit`}
                          passHref
                        >
                          <Link color="inherit" variant="subtitle2">
                            {cooperation.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>{cooperation.role?.name}</TableCell>
                  <TableCell>{cooperation.email}</TableCell>

                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/cooperations/${cooperation.id}/edit`}
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
        count={cooperationsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
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
