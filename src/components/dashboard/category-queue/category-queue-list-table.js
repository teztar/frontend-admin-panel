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

export const CategoryQueueListTable = (props) => {
  const {
    productCategories,
    productCategoriesCount,
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
              <TableCell>Queue</TableCell>
              <TableCell>create at</TableCell>
              <TableCell>updated at</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productCategories &&
              productCategories?.map((productCategory) => (
                <TableRow hover key={productCategory.id}>
                  <TableCell>
                    <NextLink
                      href={`/dashboard/product-categories/${productCategory?.id}/edit`}
                      passHref
                    >
                      <Link color="inherit" variant="subtitle2">
                        {productCategory?.name}
                      </Link>
                    </NextLink>
                  </TableCell>
                  <TableCell>
                    <NextLink
                      href={`/dashboard/product-categories/${productCategory?.id}/edit`}
                      passHref
                    >
                      <Link color="inherit" variant="subtitle2">
                        {productCategory?.queue}
                      </Link>
                    </NextLink>
                  </TableCell>

                  <TableCell>
                    {format(
                      new Date(productCategory?.createdAt ?? null),
                      "dd-MM-yyyy HH:mm"
                    )}
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(productCategory?.updatedAt ?? null),
                      "dd-MM-yyyy HH:mm"
                    )}
                  </TableCell>

                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/product-categories/${productCategory?.id}/edit`}
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
        count={productCategoriesCount}
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

CategoryQueueListTable.propTypes = {
  productCategories: PropTypes.array.isRequired,
  productCategoriesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
