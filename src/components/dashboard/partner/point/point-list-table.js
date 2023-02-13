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
import { ArrowRight as ArrowRightIcon } from "@icons/arrow-right";
import { Scrollbar } from "@components/scrollbar";
import { useRouter } from "next/router";
import TablePaginationActions from "@utils/tablePaginationActions";

export const PointListTable = (props) => {
  const {
    points,
    pointsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  const { query } = useRouter();

  const partnerId = query?.partnerId;

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Assortment</TableCell>
              <TableCell>av cooking time</TableCell>
              <TableCell>opening time</TableCell>
              <TableCell>closing time</TableCell>
              <TableCell>phones</TableCell>
              <TableCell>min check amount</TableCell>
              <TableCell>latitude</TableCell>
              <TableCell>longitude</TableCell>
              <TableCell>status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {points && points.length > 0 ? (
              points.map((point) => (
                <TableRow hover key={point.id}>
                  <TableCell>{point.assortment}</TableCell>
                  <TableCell>{point.averageCookingTime}</TableCell>
                  <TableCell>{point.openingTime}</TableCell>
                  <TableCell>{point.closingTime}</TableCell>
                  <TableCell>
                    {point.phoneNumbers?.map((item) => (
                      <Typography key={item}>{item}</Typography>
                    ))}
                  </TableCell>
                  <TableCell>{point.minimumCheckAmount}</TableCell>
                  <TableCell>{point.geolocationLatitude}</TableCell>
                  <TableCell>{point.geolocationLongitude}</TableCell>
                  <TableCell>{point.status}</TableCell>
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/partners/${partnerId}/points/${point.id}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/partners/${partnerId}/points/${point?.id}/products`}
                      passHref
                    >
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <Typography>No Points</Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
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
        count={pointsCount}
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

PointListTable.propTypes = {
  points: PropTypes.array.isRequired,
  pointsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
