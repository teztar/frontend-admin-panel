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
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "src/store";
import { createBonus, getRoles, updateBonus } from "@services/index";

const categories = ["FIX", "PRESENT", "OUR"];

export const BonusEditForm = (props) => {
  const dispatch = useDispatch();

  const { points } = useSelector((state) => state.points);

  const { bonus, mode = "edit", ...other } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!points.length) {
      dispatch(getRoles());
    }
  }, []);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: bonus?.id || "",
        active: bonus?.active || false,
        bonus: bonus?.bonus || "",
        pointId: bonus?.pointId || "",
        name: bonus?.name || "",
        email: bonus?.email || "",
        password: bonus?.password || "",
        category: bonus?.category || "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(4).max(255),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (mode === "create") {
            dispatch(createBonus(values));
          } else {
            dispatch(updateBonus(values));
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
              title={`${mode === "create" ? "Create" : "Edit"} bonus`}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Bonus name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.name}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email"
                    name="email"
                    type="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.email}
                  />
                </Grid>
                {mode === "create" && (
                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        name="password"
                        value={values?.password}
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </Grid>
                )}
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Categories</InputLabel>
                    <Select
                      labelId="category-label"
                      value={values.category}
                      label="Categories"
                      name="category"
                      onChange={handleChange}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="point-label">Role</InputLabel>
                    <Select
                      labelId="point-label"
                      value={values.pointId}
                      label="Role"
                      name="pointId"
                      onChange={handleChange}
                    >
                      {points.map((point) => (
                        <MenuItem key={point.id} value={point.id}>
                          {point.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
              <NextLink href="/dashboard/bonuses" passHref>
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
