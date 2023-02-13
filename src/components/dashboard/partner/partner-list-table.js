import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
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
import { Scrollbar } from "../../scrollbar";

export const PartnerListTable = (props) => {
  const {
    partners,
    partnersCount,
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
              <TableCell>Brand</TableCell>
              <TableCell>Company tin</TableCell>
              <TableCell>Director name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phones</TableCell>
              <TableCell>Region</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partners && partners.length > 0 ? (
              partners.map((partner) => (
                <TableRow hover key={partner.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar
                        src={partner.avatar}
                        sx={{
                          height: 42,
                          width: 42,
                        }}
                      >
                        {getInitials(partner.brand)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={`/dashboard/partners/${partner.id}`}
                          passHref
                        >
                          <Link color="inherit" variant="subtitle2">
                            {partner.name}
                          </Link>
                        </NextLink>
                        <Typography color="textSecondary" variant="body2">
                          {partner.brand}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{partner.companyTin}</TableCell>
                  <TableCell>{partner.directorName}</TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>
                    {partner.phoneNumbers?.map((item) => (
                      <Typography key={item}>{item}</Typography>
                    ))}
                  </TableCell>
                  <TableCell>{partner.region}</TableCell>
                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/partners/${partner.id}/edit`}
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/partners/${partner.id}/points`}
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
                  <Typography>No Partners</Typography>
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
        count={partnersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

PartnerListTable.propTypes = {
  partners: PropTypes.array.isRequired,
  partnersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
