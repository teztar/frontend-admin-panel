import NextLink from "next/link";
import toast from "react-hot-toast";
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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { format } from "date-fns";
import { useDispatch } from "src/store";
import { createCourier, updateCourier } from "@services/index";

export const CourierEditForm = (props) => {
  const { courier, mode = "edit", ...other } = props;

  const dispatch = useDispatch();

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: courier?.id || "",
        dateOfBirth: courier?.dateOfBirth || null,
        name: courier?.name || "",
        surname: courier?.surname || "",
        patronymic: courier?.patronymic || "",
        passportSeries: courier?.passportSeries || "",
        phoneNumber: courier?.phoneNumber?.substring(4) || "",
        startWorkTime: new Date("01/01/1970 " + courier?.startWorkTime) || null,
        endWorkTime: new Date("01/01/1970 " + courier?.endWorkTime) || null,
        tin: courier?.tin || "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(4).max(255),
        tin: Yup.string().min(9).max(9),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const newValues = {
            ...values,
            dateOfBirth: format(new Date(values.dateOfBirth), "yyyy-MM-dd"),
            startWorkTime: format(new Date(values.startWorkTime), "HH:mm"),
            endWorkTime: format(new Date(values.endWorkTime), "HH:mm"),
            phoneNumber: "+992" + values?.phoneNumber?.replaceAll(" ", ""),
          };
          if (mode === "create") {
            dispatch(createCourier(newValues));
          } else {
            dispatch(updateCourier(newValues));
          }
          setStatus({ success: true });
          setSubmitting(false);
        } catch (err) {
          console.error(err);
          toast.error("Something went wrong!");
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
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
              title={`${mode === "create" ? "Create" : "Edit"} courier`}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.surname && errors.surname)}
                    fullWidth
                    helperText={touched.surname && errors.surname}
                    label="Surname"
                    name="surname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.surname}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.name}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.patronymic && errors.patronymic)}
                    fullWidth
                    helperText={touched.patronymic && errors.patronymic}
                    label="Patronymic"
                    name="patronymic"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.patronymic}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    fullWidth
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    label="Phone Number"
                    name="phoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.phoneNumber}
                    inputProps={{ maxLength: 9 }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      touched.passportSeries && errors.passportSeries
                    )}
                    fullWidth
                    helperText={touched.passportSeries && errors.passportSeries}
                    label="Passport series"
                    name="passportSeries"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.passportSeries}
                    inputProps={{ maxLength: 8 }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.tin && errors.tin)}
                    fullWidth
                    helperText={touched.tin && errors.tin}
                    label="TIN"
                    name="tin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.tin}
                    inputProps={{ maxLength: 9 }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    label="Birth date"
                    onChange={(date) => {
                      setFieldValue("dateOfBirth", date);
                    }}
                    renderInput={(inputProps) => (
                      <TextField fullWidth {...inputProps} />
                    )}
                    value={values.dateOfBirth}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TimePicker
                    ampm={false}
                    inputFormat="hh:mm"
                    label="Start Work Time"
                    value={values.startWorkTime}
                    onChange={(time) => {
                      setFieldValue("startWorkTime", time);
                    }}
                    renderInput={(inputProps) => (
                      <TextField fullWidth {...inputProps} />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TimePicker
                    ampm={false}
                    inputFormat="hh:mm"
                    label="End Work Time"
                    onChange={(time) => {
                      setFieldValue("endWorkTime", time);
                    }}
                    renderInput={(inputProps) => (
                      <TextField fullWidth {...inputProps} />
                    )}
                    value={values.endWorkTime}
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
                {mode === "create" ? "Create" : "Update"}
              </Button>
              <NextLink href="/dashboard/couriers" passHref>
                <Button
                  component="a"
                  disabled={isSubmitting}
                  sx={{
                    m: 1,
                    mr: "auto",
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </NextLink>
            </CardActions>
          </Card>
        </form>
      )}
    </Formik>
  );
};
