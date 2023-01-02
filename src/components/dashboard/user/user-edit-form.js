import { useEffect, useState } from "react";
import NextLink from "next/link";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Autocomplete,
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
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "src/store";
import { createUser, getRoles, updateUser } from "@services/index";

export const UserEditForm = (props) => {
  const dispatch = useDispatch();

  const { roles } = useSelector((state) => state.roles);

  const { user, mode = "edit", ...other } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user?.id || "",
      roleId: user?.roleId || "",
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().min(4).max(255),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (mode === "create") {
          dispatch(createUser(values));
        } else {
          dispatch(updateUser(values));
        }
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!roles.length) {
      dispatch(getRoles());
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title={`${mode === "create" ? "Create" : "Edit"} user`} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="User name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                name="email"
                type="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
            </Grid>
            {mode === "create" && (
              <Grid item md={6} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    name="password"
                    value={formik.values.password}
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
            )}
            <Grid item md={6} xs={12}>
              <Autocomplete
                fullWidth
                options={roles}
                filterSelectedOptions
                value={formik.values.roleId}
                onChange={(_, value) => {
                  formik.setFieldValue("roleId", value.id);
                }}
                getOptionLabel={(option) => option.name || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Выбрать роль"
                    variant="outlined"
                  />
                )}
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
            disabled={formik.isSubmitting}
            type="submit"
            sx={{ m: 1 }}
            variant="contained"
          >
            {mode === "create" ? "Create" : "Update"}
          </Button>
          <NextLink href="/dashboard/users" passHref>
            <Button
              component="a"
              disabled={formik.isSubmitting}
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
  );
};
