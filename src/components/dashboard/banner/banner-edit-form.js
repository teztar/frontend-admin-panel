import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import toast from "react-hot-toast";
import { Formik } from "formik";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { UploadFile } from "@mui/icons-material";
import { format } from "date-fns";
import { useDispatch } from "src/store";
import { createBanner, updateBanner } from "@services/index";
import { removeEmptyBodyFields } from "@utils/axios";
import { toSnakeCaseFormat } from "@utils/case-style";
import useBannersImageLoader from "@hooks/use-banner-images";

export const BannerEditForm = (props) => {
  const dispatch = useDispatch();

  const { banner, mode = "edit", ...other } = props;

  const newBanner = useBannersImageLoader(banner, "bannerImages")[0];

  const [webImage, setWebImage] = useState(newBanner?.webImageUrl);
  const [appImage, setAppImage] = useState(newBanner?.appImageUrl);

  const [webImageUrl, setWebImageUrl] = useState(null);
  const [appImageUrl, setAppImageUrl] = useState(null);

  const appImageRef = useRef(null);
  const webImageRef = useRef(null);

  const formData = new FormData();

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
        id: newBanner?.id || "",
        title: newBanner?.title || "",
        body: newBanner?.body || "",
        queue: newBanner?.queue || "",
        link: newBanner?.link || "",
        active: newBanner?.active || true,
        startDate: newBanner?.startDate || null,
        endDate: newBanner?.endDate || null,
        webImage: mode === "edit" && newBanner?.webImageUrl,
        appImage: mode === "edit" && newBanner?.appImageUrl,
        submit: null,
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const newValues = {
            ...values,
            active: mode === "create" ? null : values.active,
            startDate: format(new Date(values.startDate), "yyyy-MM-dd"),
            endDate: format(new Date(values.endDate), "yyyy-MM-dd"),
          };

          delete newValues.appImage;
          delete newValues.webImage;

          const payload = JSON.stringify(
            removeEmptyBodyFields(toSnakeCaseFormat(newValues))
          );

          formData.append("payload", payload);
          // if (mode === "edit") {
          if (!webImageUrl) {
            formData.append(
              "web_image",
              new File([values.webImage], "webImage.png", {
                type: "image/png",
                lastModified: new Date(),
              })
            );
          } else {
            formData.append("web_image", webImage);
          }

          if (!appImageUrl) {
            formData.append(
              "app_image",
              new File([values.appImage], "appImage.png", {
                type: "image/png",
                lastModified: new Date(),
              })
            );
          } else {
            formData.append("app_image", appImage);
          }

          if (mode === "create") {
            dispatch(
              createBanner({
                payload: formData,
                requestDigest: payload,
              })
            );
          } else {
            dispatch(
              updateBanner({
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
              title={`${mode === "create" ? "Create" : "Edit"} banner`}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    name="title"
                    label="Title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(touched.body && errors.body)}
                    helperText={touched.body && errors.body}
                    name="body"
                    label="Body"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.body}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(touched.link && errors.link)}
                    helperText={touched.link && errors.link}
                    name="link"
                    label="Link"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.link}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    error={Boolean(touched.queue && errors.queue)}
                    helperText={touched.queue && errors.queue}
                    name="queue"
                    label="Queue"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.queue}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    label="Start date"
                    onChange={(date) => {
                      setFieldValue("startDate", date);
                    }}
                    renderInput={(inputProps) => (
                      <TextField fullWidth {...inputProps} />
                    )}
                    value={values.startDate}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    label="End date"
                    onChange={(date) => {
                      setFieldValue("endDate", date);
                    }}
                    renderInput={(inputProps) => (
                      <TextField fullWidth {...inputProps} />
                    )}
                    value={values.endDate}
                  />
                </Grid>
                {mode === "edit" && (
                  <>
                    <Grid item md={6} xs={12}>
                      <FormControlLabel
                        name="active"
                        label="Active"
                        value={values.active}
                        onChange={handleChange}
                        control={<Switch defaultChecked />}
                        sx={{
                          "& .MuiTypography-root": {
                            useSelector: "none",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}></Grid>
                  </>
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

                {!webImageUrl && values.webImage && (
                  <Grid item md={6} xs={12}>
                    <img
                      src={values.webImage}
                      alt="web image"
                      style={{
                        width: 40,
                      }}
                    />
                  </Grid>
                )}

                {!appImageUrl && values.appImage && (
                  <Grid item md={6} xs={12}>
                    <img
                      src={values.appImage}
                      alt="app image"
                      style={{
                        width: 40,
                      }}
                    />
                  </Grid>
                )}
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
              <NextLink href="/dashboard/banners" passHref>
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
