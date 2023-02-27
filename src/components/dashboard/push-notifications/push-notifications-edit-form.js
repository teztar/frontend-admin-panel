import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik } from "formik";
import { format } from "date-fns";
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
import { useDispatch } from "src/store";
import {
  createPushNotification,
  updatePushNotification,
} from "@services/index";
import { DatePicker } from "@mui/x-date-pickers";
import { UploadFile } from "@mui/icons-material";
import { Box } from "@mui/system";

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

  const [webImage, setWebImage] = useState(pushNotification?.webImage);
  const [appImage, setAppImage] = useState(pushNotification?.appImage);
  const [webImageUrl, setWebImageUrl] = useState(null);
  const [appImageUrl, setAppImageUrl] = useState(null);

  const formData = new FormData();

  const appImageRef = useRef(null);
  const webImageRef = useRef(null);

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
        sortValue: pushNotification?.sortValue || "",
        webImage: webImage || "",
        appImage: appImage || "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        body: Yup.string().min(4).max(255),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          let data = {};

          if (values.id) {
            formData.append("id", values.id);
          }
          formData.append("title", values.title);
          formData.append("body", values.body);
          formData.append("format", values.format);
          formData.append(
            "dispatch_date",
            format(new Date(values.dispatchDate), "dd-MM-yyyy")
          );
          formData.append("sort_by", values.sortBy);
          formData.append("sort_value", values.sortValue);
          formData.append("web_image", webImage);
          formData.append("app_image", appImage);

          for (let pair of formData.entries()) {
            console.log("pair: ", (data[pair[0]] = pair[1]));
            data[pair[0]] = pair[1];
          }
          if (mode === "create") {
            dispatch(createPushNotification(formData));
          } else {
            dispatch(updatePushNotification(formData));
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
                      {formats.map((format) => (
                        <MenuItem key={format} value={format}>
                          {format}
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
                      {sortBys.map((sort) => (
                        <MenuItem key={sort} value={sort}>
                          {sort}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

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
