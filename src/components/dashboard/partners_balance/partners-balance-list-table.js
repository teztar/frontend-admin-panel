import NextLink from "next/link";
import { format } from "date-fns";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "@icons/arrow-right";
import TablePaginationActions from "@utils/tablePaginationActions";
import { SeverityPill } from "@components/severity-pill";
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
              <TableRow hover key={partnersBalance.partnerId}>
                <TableCell>{partnersBalance.partnerName}</TableCell>
                <TableCell>
                  {format(
                    new Date(partnersBalance.registrationDate),
                    "dd-MM-yyyy"
                  )}
                </TableCell>
                <TableCell>{partnersBalance.region}</TableCell>
                <TableCell>{partnersBalance.countOfPoints}</TableCell>
                <TableCell>
                  {partnersBalance.currentBalance?.toLocaleString("ru")}
                </TableCell>
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
                  <NextLink
                    href={`/dashboard/partners-balance/${partnersBalance.partnerId}/points`}
                    passHref
                  >
                    <IconButton component="a">
                      <ArrowRightIcon fontSize="small" />
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
