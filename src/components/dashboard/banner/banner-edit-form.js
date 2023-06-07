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
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { useDispatch } from "src/store";
import { createBanner, updateBanner } from "@services/index";

export const BannerEditForm = (props) => {
  const dispatch = useDispatch();

  const { banner, mode = "edit", ...other } = props;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: banner?.id || "",
        title: banner?.title || "",
        body: banner?.body || "",
        queue: banner?.queue || "",
        link: banner?.link || "",
        active: banner?.active || true,
        startDate: banner?.startDate || null,
        endDate: banner?.endDate || null,
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

          console.log({ newValues });
          if (mode === "create") {
            dispatch(createBanner(newValues));
          } else {
            dispatch(updateBanner(newValues));
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
                {mode === "edit" && (
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
                )}
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
