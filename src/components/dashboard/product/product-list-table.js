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
import { Scrollbar } from "@components/scrollbar";
import { useRouter } from "next/router";
import TablePaginationActions from "@utils/tablePaginationActions";
import useImageLoader from "@hooks/use-image-loader";

export const ProductListTable = (props) => {
  const { query } = useRouter();

  const {
    products,
    productsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  const newProducts = useImageLoader("products", products, "image");

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
            {newProducts.map((product) => (
              <TableRow hover key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {product.categories.map((category, index) => (
                    <span key={index}>
                      {category.category.name}
                      {index < product.categories.length - 1 && "/"}
                    </span>
                  ))}
                </TableCell>
                <TableCell>{product.ingredients}</TableCell>
                <TableCell>
                  {product.volumes.map((volume, index) => (
                    <span>
                      {volume.price.toLocaleString("ru")}
                      {index < product.volumes.length - 1 && "/"}
                    </span>
                  ))}
                </TableCell>
                <TableCell>
                  {product.volumes.map((volume, index) => (
                    <span>
                      {volume.measuring}
                      {index < product.volumes.length - 1 && "/"}
                    </span>
                  ))}
                </TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <img
                    src={product.imageUrl}
                    alt="image"
                    id="image"
                    style={{
                      width: 40,
                    }}
                  />
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
            ))}
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
        rowsPerPageOptions={[10, 25, 50, 100]}
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
