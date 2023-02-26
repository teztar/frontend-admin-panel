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
import { useDispatch, useSelector } from "src/store";
import { getProductImage } from "@services/index";

export const ProductListTable = (props) => {
  const dispatch = useDispatch();
  const { query } = useRouter();

  const { productImage } = useSelector((state) => state.products);

  const {
    products,
    productsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  const handleGetProductImage = async (path) =>
    await dispatch(getProductImage({ filePath: path }));

  console.log({ productImage });

  const partnerId = query?.partnerId;
  const pointId = query?.pointId;

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Ingredients</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Measuring</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
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
                  <TableCell>{product.price?.toLocaleString("ru")}</TableCell>
                  <TableCell>{product.measuring}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell
                    onClick={() => handleGetProductImage(product?.image?.name)}
                  >
                    {productImage && <img src={productImage} alt="image" />}
                  </TableCell>
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
