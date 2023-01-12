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
  Typography,
} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "@icons/arrow-right";
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import { getInitials } from "@utils/get-initials";
import { Scrollbar } from "@components/scrollbar";
import { useRouter } from "next/router";

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

  const [selectedPoints, setSelectedPoints] = useState([]);

  // Reset selected points when points change
  useEffect(
    () => {
      if (selectedPoints.length) {
        setSelectedPoints([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [points]
  );

  const handleSelectAllPoints = (event) => {
    setSelectedPoints(
      event.target.checked ? points.map((point) => point.id) : []
    );
  };

  const handleSelectOnePoint = (event, pointId) => {
    if (!selectedPoints.includes(pointId)) {
      setSelectedPoints((prevSelected) => [...prevSelected, pointId]);
    } else {
      setSelectedPoints((prevSelected) =>
        prevSelected.filter((id) => id !== pointId)
      );
    }
  };

  const enableBulkActions = selectedPoints.length > 0;
  const selectedSomePoints =
    selectedPoints.length > 0 && selectedPoints.length < points.length;
  const selectedAllPoints = selectedPoints.length === points.length;

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
          checked={selectedAllPoints}
          indeterminate={selectedSomePoints}
          onChange={handleSelectAllPoints}
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
              points.map((point) => {
                const isPointSelected = selectedPoints.includes(point.id);

                return (
                  <TableRow hover key={point.id} selected={isPointSelected}>
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
                      {/* <NextLink
                        href={`/dashboard/partners/${partnerId}`}
                        passHref
                      >
                        <IconButton component="a">
                          <ArrowRightIcon fontSize="small" />
                        </IconButton>
                      </NextLink> */}
                    </TableCell>
                  </TableRow>
                );
              })
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
