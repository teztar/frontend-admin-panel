import NextLink from "next/link";
import PropTypes from "prop-types";
import {
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
import { Scrollbar } from "../../scrollbar";
import TablePaginationActions from "@utils/tablePaginationActions";
import { format } from "date-fns";

export const KitchenTypeListTable = (props) => {
  const {
    kitchenTypes,
    kitchenTypesCount,
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
              <TableCell>Name</TableCell>
              <TableCell>create at</TableCell>
              <TableCell>updated at</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kitchenTypes?.map((kitchenType) => (
              <TableRow hover key={kitchenType.id}>
                <TableCell>
                  <NextLink
                    href={`/dashboard/kitchen-types/${kitchenType?.id}/edit`}
                    passHref
                  >
                    <Link color="inherit" variant="subtitle2">
                      {kitchenType?.name}
                    </Link>
                  </NextLink>
                </TableCell>

                <TableCell>
                  {format(
                    new Date(kitchenType?.createdAt ?? null),
                    "dd-MM-yyyy HH:mm"
                  )}
                </TableCell>
                <TableCell>
                  {format(
                    new Date(kitchenType?.updatedAt ?? null),
                    "dd-MM-yyyy HH:mm"
                  )}
                </TableCell>

                <TableCell align="right">
                  <NextLink
                    href={`/dashboard/kitchen-types/${kitchenType?.id}/edit`}
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
        count={kitchenTypesCount}
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

KitchenTypeListTable.propTypes = {
  kitchenTypes: PropTypes.array.isRequired,
  kitchenTypesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
