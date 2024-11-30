import NextLink from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { useDispatch } from "src/store";
import { createPayDebtAmount } from "@services/index";

export const CourierBalanceEditForm = (props) => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const { courier, mode = "edit", ...other } = props;

  const courierId = query?.courierId;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        courierId: courierId || "",
        date: courier?.date || null,
        amount: courier?.amount || 0,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        amount: Yup.number().min(0),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const newValues = {
            ...values,
            amount: Number(values.amount),
            date: format(new Date(values.date), "yyyy-MM-dd"),
          };
          if (mode === "create") {
            dispatch(createPayDebtAmount(newValues));
          }
          setStatus({ success: true });
          setSubmitting(false);
        } catch (err) {}
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit} {...other}>
          <Card>
            <CardHeader
              title={`${
                mode === "create" ? "Create" : "Edit"
              } courier balance for ${courier?.name}`}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.amount && errors.amount)}
                    fullWidth
                    helperText={touched.amount && errors.amount}
                    label="Amount"
                    name="amount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.amount}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    label="Date"
                    onChange={(date) => {
                      setFieldValue("date", date);
                    }}
                    renderInput={(inputProps) => (
                      <TextField fullWidth {...inputProps} />
                    )}
                    value={values.date}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions
              sx={{
                flexWrap: "wrap",
                m: -1,
              }}
            >
              <Button
                disabled={isSubmitting}
                type="submit"
                sx={{ m: 1 }}
                variant="contained"
              >
                {mode === "create" ? "Создать" : "Обновить"}
              </Button>
              <NextLink
                href={`/dashboard/couriers/${courierId}/balance`}
                passHref
              >
                <Button
                  component="a"
                  disabled={isSubmitting}
                  sx={{
                    m: 1,
                    mr: "auto",
                  }}
                  variant="outlined"
                >
                  Назад
                </Button>
              </NextLink>
            </CardActions>
          </Card>
        </form>
      )}
    </Formik>
  );
};
