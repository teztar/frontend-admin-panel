import { useEffect, useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "src/store";
import { createOrder, getClients, updateOrder } from "@services/index";

const PAYMENT_OPTIONS = ["CASH", "CARD", "QR", "BONUS"];

export const OrderEditForm = (props) => {
  const dispatch = useDispatch();

  const { clients } = useSelector((state) => state.clients);

  const { order, mode = "edit", ...other } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!clients.length) {
      dispatch(getClients());
    }
  }, []);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        count: order?.count || "",
        addedFrom: order?.addedFrom || "",
        clientId: order?.clientId || "",
        geolocationLatitude: order?.geolocationLatitude || "",
        geolocationLongitude: order?.geolocationLongitude || "",
        paymentOption: order?.paymentOption || "",
        productId: order?.productId || "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(4).max(255),
        phone: Yup.string().max(9).required("Phone is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (mode === "create") {
            dispatch(createOrder(values));
          } else {
            dispatch(updateOrder(values));
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
              title={`${mode === "create" ? "Create" : "Edit"} order`}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="client-label">Client</InputLabel>
                    <Select
                      labelId="client-label"
                      value={values.clientId}
                      label="Client"
                      name="clientId"
                      onChange={handleChange}
                    >
                      {clients.map((client) => (
                        <MenuItem key={client.id} value={client.id}>
                          {client.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="paymentOption-label">
                      Payment Option
                    </InputLabel>
                    <Select
                      labelId="paymentOption-label"
                      value={values.paymentOption}
                      label="Payment Option"
                      name="paymentOption"
                      onChange={handleChange}
                    >
                      {PAYMENT_OPTIONS.map((paymentOption) => (
                        <MenuItem key={paymentOption} value={paymentOption}>
                          {paymentOption}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="productId-label">Product</InputLabel>
                    <Select
                      labelId="productId-label"
                      value={values.productId}
                      label="Product"
                      name="productId"
                      onChange={handleChange}
                    >
                      {PAYMENT_OPTIONS.map((product) => (
                        <MenuItem key={product} value={product}>
                          {product}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.count && errors.count)}
                    fullWidth
                    helperText={touched.count && errors.count}
                    label="Count"
                    name="count"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.count}
                    inputProps={{ maxLength: 9 }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(
                      touched.geolocationLatitude && errors.geolocationLatitude
                    )}
                    helperText={
                      touched.geolocationLatitude && errors.geolocationLatitude
                    }
                    label="Geolocation Latitude"
                    name="geolocationLatitude"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.geolocationLatitude}
                    inputProps={{ maxLength: 9 }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(
                      touched.geolocationLongitude &&
                        errors.geolocationLongitude
                    )}
                    helperText={
                      touched.geolocationLongitude &&
                      errors.geolocationLongitude
                    }
                    label="Geolocation Longitude"
                    name="geolocationLongitude"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.geolocationLongitude}
                    inputProps={{ maxLength: 9 }}
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
              <NextLink href="/dashboard/orders" passHref>
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
