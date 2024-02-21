import { useRef } from "react";
import NextLink from "next/link";
import toast from "react-hot-toast";
import { Map, Placemark, SearchControl, YMaps } from "react-yandex-maps";
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

  const map = useRef(null);

  const handleGetGeoObject = async (map, setFieldValue) => {
    if (Array.isArray(map)) {
      setFieldValue("location.latitude", map[0]);
      setFieldValue("location.longitude", map[1]);
    } else {
      const coords = map.get("coords");

      setFieldValue("location.latitude", coords[0]);
      setFieldValue("location.longitude", coords[1]);
    }
  };

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
        location: {
          latitude: courier?.address?.latitude || "",
          longitude: courier?.address?.longitude || "",
          name: courier?.address?.name || "",
        },
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(4).max(255),
        tin: Yup.string().min(9).max(9),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm }
      ) => {
        let newValues;
        try {
          newValues = {
            ...values,
            dateOfBirth: format(new Date(values.dateOfBirth), "yyyy-MM-dd"),
            startWorkTime: format(new Date(values.startWorkTime), "HH:mm"),
            endWorkTime: format(new Date(values.endWorkTime), "HH:mm"),
            phoneNumber: "+992" + values?.phoneNumber?.replaceAll(" ", ""),
            location: {
              latitude: values.location.latitude.toString(),
              longitude: values.location.longitude.toString(),
              name: values.location.name,
            },
          };
          if (mode === "create") {
            dispatch(
              createCourier({ values: newValues, resetForm: resetForm })
            );
          } else {
            dispatch(updateCourier(newValues));
          }
          setStatus({ success: true });
          setSubmitting(false);
        } catch (err) {
          newValues = {};
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
                    type="tel"
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
                    inputProps={{ maxLength: 9 }}
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
                  <TimePicker
                    ampm={false}
                    inputFormat="hh:mm"
                    label="Start Work Time"
                    value={values.startWorkTime}
                    onChange={(time) => {
                      setFieldValue("startWorkTime", time);
                    }}
                    renderInput={(inputProps) => (
                      <TextField fullWidth {...inputProps} error={false} />
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
                      <TextField fullWidth {...inputProps} error={false} />
                    )}
                    value={values.endWorkTime}
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
                  <TextField
                    required
                    fullWidth
                    // type="number"
                    error={Boolean(
                      touched.location?.latitude && errors.location?.latitude
                    )}
                    helperText={
                      touched.location?.latitude && errors.location?.latitude
                    }
                    label="Geolocation Latitude"
                    name="latitude"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location?.latitude}
                    inputProps={{ maxLength: 9 }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    // type="number"
                    error={Boolean(
                      touched.location?.longitude && errors.location?.longitude
                    )}
                    helperText={
                      touched.location?.longitude && errors.location?.longitude
                    }
                    label="Geolocation Longitude"
                    name="longitude"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location?.longitude}
                    inputProps={{ maxLength: 9 }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(
                      touched.location?.name && errors.location?.name
                    )}
                    helperText={touched.location?.name && errors.location?.name}
                    label="Street Name"
                    name="location.name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location?.name}
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
                      options={{ minZoom: 8 }}
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
                        geometry={[
                          values.location?.latitude,
                          values.location?.longitude,
                        ]}
                        options={{
                          iconColor: "#ff0000",
                        }}
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
