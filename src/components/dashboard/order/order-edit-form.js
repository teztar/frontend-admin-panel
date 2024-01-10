import { useEffect, useRef } from "react";
import NextLink from "next/link";
import toast from "react-hot-toast";
import { Formik } from "formik";
import { Map, Placemark, SearchControl, YMaps } from "react-yandex-maps";
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
  MenuItem,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "src/store";
import { createOrder, getClients, updateOrder } from "@services/index";

const PAYMENT_OPTIONS = ["CASH", "CARD", "QR", "BONUS"];

export const OrderEditForm = (props) => {
  const dispatch = useDispatch();

  const { clients } = useSelector((state) => state.clients);

  const { order, mode = "edit", ...other } = props;

  const map = useRef(null);

  const handleGetGeoObject = async (map, setFieldValue) => {
    if (Array.isArray(map)) {
      setFieldValue("geolocationLatitude", map[0]);
      setFieldValue("geolocationLongitude", map[1]);
    } else {
      const coords = map.get("coords");
      setFieldValue("geolocationLatitude", coords[0]);
      setFieldValue("geolocationLongitude", coords[1]);
    }
  };

  useEffect(() => {
    if (!clients.length) {
      dispatch(getClients({ page: 1, perPage: 1000 }));
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

                <Grid item xs={12}>
                  <YMaps
                    query={{
                      lang: "ru_RU",
                      apikey: "6d2219fd-5118-4e09-bb69-e786ff23284a",
                    }}
                  >
                    <Map
                      defaultState={{
                        center: [38.559772, 68.787038],
                        zoom: 11,
                      }}
                      options={{ maxZoom: 11, minZoom: 8 }}
                      width="100%"
                      height="300px"
                      onClick={(map) => {
                        handleGetGeoObject(map, setFieldValue);
                      }}
                      modules={[
                        "templateLayoutFactory",
                        "layout.ImageWithContent",
                        "geocode",
                        "geoObject.addon.balloon",
                        "multiRouter.MultiRoute",
                      ]}
                      instanceRef={map}
                    >
                      <SearchControl
                        options={{
                          float: "right",
                        }}
                      />
                      <Placemark
                        // onClick={() => handlePoint(point)}
                        geometry={[
                          values.geolocationLatitude,
                          values.geolocationLongitude,
                        ]}
                        options={{
                          iconColor: "#ff0000",
                        }}
                        //       properties={{
                        //         hintContent: `
                        // <div>
                        //   <h6>Название: ${point?.name}</h6>
                        //     <div>Адрес: ${point?.address}</div>
                        //     <div>Тип: ${point?.type?.name}</div><br/>
                        // </div>
                        // `,
                        //       }}
                        modules={["geoObject.addon.hint"]}
                      />
                    </Map>
                  </YMaps>
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
