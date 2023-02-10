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

export const BonusListTable = (props) => {
  const {
    bonuses,
    bonusesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedBonuses, setSelectedBonuses] = useState([]);

  // Reset selected bonuses when bonuses change
  useEffect(
    () => {
      if (selectedBonuses.length) {
        setSelectedBonuses([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bonuses]
  );

  const handleSelectAllBonuses = (event) => {
    setSelectedBonuses(
      event.target.checked ? bonuses.map((bonus) => bonus.id) : []
    );
  };

  const handleSelectOneBonus = (event, bonusId) => {
    if (!selectedBonuses.includes(bonusId)) {
      setSelectedBonuses((prevSelected) => [...prevSelected, bonusId]);
    } else {
      setSelectedBonuses((prevSelected) =>
        prevSelected.filter((id) => id !== bonusId)
      );
    }
  };

  const enableBulkActions = selectedBonuses.length > 0;
  const selectedSomeBonuses =
    selectedBonuses.length > 0 && selectedBonuses.length < bonuses.length;
  const selectedAllBonuses = selectedBonuses.length === bonuses.length;

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
          checked={selectedAllBonuses}
          indeterminate={selectedSomeBonuses}
          onChange={handleSelectAllBonuses}
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
                  checked={selectedAllBonuses}
                  indeterminate={selectedSomeBonuses}
                  onChange={handleSelectAllBonuses}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bonuses.map((bonus) => {
              const isBonusSelected = selectedBonuses.includes(bonus.id);

              return (
                <TableRow hover key={bonus.id} selected={isBonusSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isBonusSelected}
                      onChange={(event) =>
                        handleSelectOneBonus(event, bonus.id)
                      }
                      value={isBonusSelected}
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
                        src={bonus.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(bonus.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/bonuses/${bonus.id}/edit`}
                          passHref
                        >
                          <Link color="inherit" variant="subtitle2">
                            {bonus.name}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>{bonus.email}</TableCell>

                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/bonuses/${bonus.id}/edit`}
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
        count={bonusesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

BonusListTable.propTypes = {
  bonuses: PropTypes.array.isRequired,
  bonusesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
