import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Scrollbar } from "@components/scrollbar";

const CustomTableCell = styled(TableCell)(() => ({
  textTransform: "uppercase",
  fontWeight: "bold",
}));
export const CourierBalanceListTable = (props) => {
  const { courierBalances, ...other } = props;

  console.log({ courierBalances });

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableBody>
            <TableRow hover>
              <CustomTableCell>сумма долга за этот период</CustomTableCell>
              <CustomTableCell>
                {courierBalances?.thisPeriodDebtAmount}
              </CustomTableCell>
            </TableRow>
            <TableRow>
              <CustomTableCell>
                сумма доставленного заказа за этот период
              </CustomTableCell>
              <CustomTableCell>
                {courierBalances?.thisPeriodDeliveredOrderAmount}
              </CustomTableCell>
            </TableRow>

            <TableRow>
              <CustomTableCell>сумма дохода за этот период</CustomTableCell>
              <CustomTableCell>
                {courierBalances?.thisPeriodIncomeAmount}
              </CustomTableCell>
            </TableRow>

            <TableRow>
              <CustomTableCell>общая сумма долга</CustomTableCell>
              <CustomTableCell>
                {courierBalances?.totalDebtAmount}
              </CustomTableCell>
            </TableRow>

            <TableRow>
              <CustomTableCell>
                общая сумма доставленного заказа
              </CustomTableCell>
              <CustomTableCell>
                {courierBalances?.totalDeliveredOrderAmount}
              </CustomTableCell>
            </TableRow>

            <TableRow>
              <CustomTableCell>общее количество поступлений</CustomTableCell>
              <CustomTableCell>
                {courierBalances?.totalIncomeAmount}
              </CustomTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Scrollbar>
    </div>
  );
};

CourierBalanceListTable.propTypes = {
  courierBalances: PropTypes.object.isRequired,
};
