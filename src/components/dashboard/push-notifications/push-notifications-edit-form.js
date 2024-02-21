import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import toast from "react-hot-toast";
import { Formik } from "formik";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "src/store";
import {
  createPushNotification,
  getGenders,
  getNotificationFormats,
  getNotificationSortedFields,
  getNotificationStatuses,
  getPrefixes,
  updatePushNotification,
} from "@services/index";
import { DatePicker } from "@mui/x-date-pickers";
import { UploadFile } from "@mui/icons-material";
import { Box } from "@mui/system";
import { removeEmptyBodyFields } from "@utils/axios";
import { toSnakeCaseFormat } from "@utils/case-style";
import { formatRFC3339 } from "date-fns";

const sortBys = [
  "AGE",
  "GENDER",
  "AVERAGE_ORDER_CHECK",
  "AVERAGE_ORDER_QUANTITY_PER_MONTH",
];

const formats = ["GENERAL", "SELECTIVE"];

export const PushNotificationEditForm = (props) => {
  const dispatch = useDispatch();

  const { pushNotification, mode = "edit", ...other } = props;

  const { genders, prefixes, notificationFormats, notificationSortedFields } =
    useSelector((state) => state.handbooks);

  const [webImage, setWebImage] = useState(pushNotification?.webImage);
  const [appImage, setAppImage] = useState(pushNotification?.appImage);
  const [webImageUrl, setWebImageUrl] = useState(null);
  const [appImageUrl, setAppImageUrl] = useState(null);

  const formData = new FormData();

  const appImageRef = useRef(null);
  const webImageRef = useRef(null);

  useEffect(() => {
    dispatch(getGenders());
    dispatch(getPrefixes());
    dispatch(getNotificationFormats());
    dispatch(getNotificationStatuses());
    dispatch(getNotificationSortedFields());
  }, []);

  useEffect(() => {
    if (webImage) {
      setWebImageUrl(URL.createObjectURL(webImage));
    }
  }, [webImage]);

  useEffect(() => {
    if (appImage) {
      setAppImageUrl(URL.createObjectURL(appImage));
    }
  }, [appImage]);

  return (
    <Formik
      enableReinitialize={mode === "edit" ? true : false}
      initialValues={{
        id: pushNotification?.id || "",
        title: pushNotification?.title || "",
        body: pushNotification?.body || "",
        dispatchDate: pushNotification?.dispatchDate || null,
        format: pushNotification?.format || "",
        sortBy: pushNotification?.sortBy || "",
        prefix: pushNotification?.prefix || "",
        sortValue: pushNotification?.sortValue || "",
        webImage: mode === "edit" && pushNotification?.webImageUrl,
        appImage: mode === "edit" && pushNotification?.appImageUrl,
        submit: null,
      }}
      // validationSchema={Yup.object().shape({
      //   body: Yup.string().min(4).max(255),
      // })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm }
      ) => {
        try {
          const newValues = {
            ...values,
            dispatchDate: formatRFC3339(new Date(values.dispatchDate)),
            sortValue: values.prefix + values.sortValue,
          };

          delete newValues.appImage;
          delete newValues.webImage;
          delete newValues.prefix;

          const payload = JSON.stringify(
            removeEmptyBodyFields(toSnakeCaseFormat(newValues))
          );

          formData.append("payload", payload);
          formData.append("web_image", webImage);
          formData.append("app_image", appImage);

          if (mode === "create") {
            dispatch(
              createPushNotification({
                payload: formData,
                requestDigest: payload,
                resetForm: resetForm,
              })
            );
          } else {
            dispatch(
              updatePushNotification({
                payload: formData,
                requestDigest: payload,
              })
            );
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
              title={`${
                mode === "create" ? "Create" : "Edit"
              } push notification`}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.title && errors.title)}
                    fullWidth
                    helperText={touched.title && errors.title}
                    label="Title"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.title}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    multiline
                    error={Boolean(touched.body && errors.body)}
                    fullWidth
                    helperText={touched.body && errors.body}
                    label="Body"
                    name="body"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.body}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    label="Dispatch date"
                    onChange={(date) => {
                      setFieldValue("dispatchDate", date);
                    }}
                    renderInput={(inputProps) => (
                      <TextField fullWidth {...inputProps} />
                    )}
                    value={values.dispatchDate}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="format-label">Format</InputLabel>
                    <Select
                      labelId="format-label"
                      value={values.format}
                      label="Sort by"
                      name="format"
                      onChange={handleChange}
                    >
                      {notificationFormats.map((format) => (
                        <MenuItem key={format.key} value={format.key}>
                          {format.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                      labelId="sort-label"
                      value={values.sortBy}
                      label="Sort By"
                      name="sortBy"
                      onChange={handleChange}
                    >
                      {notificationSortedFields.map((sort) => (
                        <MenuItem key={sort.key} value={sort.key}>
                          {sort.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {values.sortBy !== "GENDER" && (
                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="prefix-label">Prefix</InputLabel>
                      <Select
                        labelId="prefix-label"
                        value={values.prefix}
                        label="Prefix"
                        name="prefix"
                        onChange={handleChange}
                      >
                        {prefixes.map((prefix) => (
                          <MenuItem key={prefix.key} value={prefix.key}>
                            {prefix.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {values.sortBy === "GENDER" && (
                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        labelId="gender-label"
                        value={values.sortValue}
                        label="Prefix"
                        name="sortValue"
                        onChange={handleChange}
                      >
                        {genders.map((gender) => (
                          <MenuItem key={gender.key} value={gender.key}>
                            {gender.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {values.sortBy !== "GENDER" && (
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.sortValue && errors.sortValue)}
                      fullWidth
                      helperText={touched.sortValue && errors.sortValue}
                      label="Sort value"
                      name="sortValue"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      value={values.sortValue}
                    />
                  </Grid>
                )}

                <Grid item md={6} xs={12}>
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    ref={webImageRef}
                    onChange={(e) => setWebImage(e.target.files[0])}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<UploadFile />}
                    onClick={() => webImageRef?.current?.click()}
                  >
                    Web image
                  </Button>
                  {webImageUrl && webImage && (
                    <Box mt={3}>
                      <img
                        src={webImageUrl}
                        style={{
                          width: 250,
                          height: 250,
                        }}
                      />
                    </Box>
                  )}
                </Grid>
                <Grid item md={6} xs={12}>
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    ref={appImageRef}
                    onChange={(e) => setAppImage(e.target.files[0])}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<UploadFile />}
                    onClick={() => appImageRef?.current?.click()}
                  >
                    App image
                  </Button>
                  {appImageUrl && appImage && (
                    <Box mt={3}>
                      <img
                        src={appImageUrl}
                        style={{
                          width: 250,
                          height: 250,
                        }}
                      />
                    </Box>
                  )}
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
              <NextLink href="/dashboard/push-notifications" passHref>
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
