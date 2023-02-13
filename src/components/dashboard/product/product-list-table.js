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
  Typography,
} from "@mui/material";
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import { Scrollbar } from "@components/scrollbar";
import { useRouter } from "next/router";
import TablePaginationActions from "@utils/tablePaginationActions";

export const ProductListTable = (props) => {
  const {
    products,
    productsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  const { query } = useRouter();

  const partnerId = query?.partnerId;
  const pointId = query?.pointId;

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              {/* {

    "category": "Forward Data Facilitator",
    "name": "Mitchell Haley",
    "ingredients": "Maria Lockman",
    "price": 832,

    "measuring": "District Solutions Consultant",
    "description": "Kay Krajcik Jr.",

    "image": {
        "id": "07fde3ed-ff4f-4c4f-981d-0919a510a718",
        "product_id": "fa441cee-f48d-415a-b0ec-da9958d25aa8",
        "original_name": "1.jpg",
        "name": "06e5de12-b583-4b67-9e76-95fe4c5a0194.jpg",
        "created_at": "2023-02-11T14:36:09Z",
        "updated_at": "2023-02-11T14:36:09Z"
    }
} */}

              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Ingredients</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Measuring</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <TableRow hover key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.ingredients}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.measuring}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/partners/${partnerId}/points/${pointId}/products/${product.id}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <Typography>No Products</Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={productsCount}
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

ProductListTable.propTypes = {
  products: PropTypes.array.isRequired,
  productsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
