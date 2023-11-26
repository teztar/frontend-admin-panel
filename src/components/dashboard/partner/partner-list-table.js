import NextLink from "next/link";
import { useRouter } from "next/router";
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
  Tooltip,
  Typography,
} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "@icons/arrow-right";
import { PencilAlt as PencilAltIcon } from "@icons/pencil-alt";
import { getInitials } from "@utils/get-initials";
import { Scrollbar } from "../../scrollbar";
import TablePaginationActions from "@utils/tablePaginationActions";
import { styled } from "@mui/system";

const CustomTableCell = styled(TableCell)(() => ({
  cursor: "pointer",
}));

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

  const router = useRouter();

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
                  <CustomTableCell
                    onClick={() =>
                      router.push(`/dashboard/partners/${partner.id}/points`)
                    }
                  >
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
                  </CustomTableCell>
                  <CustomTableCell
                    onClick={() =>
                      router.push(`/dashboard/partners/${partner.id}/points`)
                    }
                  >
                    {partner.companyTin}
                  </CustomTableCell>
                  <CustomTableCell
                    onClick={() =>
                      router.push(`/dashboard/partners/${partner.id}/points`)
                    }
                  >
                    {partner.directorName}
                  </CustomTableCell>
                  <CustomTableCell
                    onClick={() =>
                      router.push(`/dashboard/partners/${partner.id}/points`)
                    }
                  >
                    {partner.email}
                  </CustomTableCell>
                  <CustomTableCell
                    onClick={() =>
                      router.push(`/dashboard/partners/${partner.id}/points`)
                    }
                  >
                    {partner.phoneNumbers?.map((item) => (
                      <Typography key={item}>{item}</Typography>
                    ))}
                  </CustomTableCell>
                  <CustomTableCell
                    onClick={() =>
                      router.push(`/dashboard/partners/${partner.id}/points`)
                    }
                  >
                    {partner.region}
                  </CustomTableCell>

                  <TableCell align="right">
                    <NextLink
                      href={`/dashboard/partners/${partner.id}/edit`}
                      passHref
                    >
                      <Tooltip title="Edit">
                        <IconButton component="a">
                          <PencilAltIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </NextLink>
                    <NextLink
                      href={`/dashboard/partners/${partner.id}/points`}
                      passHref
                    >
                      <Tooltip title={partner.brand + " points"}>
                        <IconButton component="a">
                          <ArrowRightIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
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
        rowsPerPageOptions={[10, 25, 50, 100]}
        ActionsComponent={TablePaginationActions}
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
