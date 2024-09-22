import { useState } from "react";
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
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "src/store";
import { createClient, updateClient } from "@services/index";
import ReactInputMask from "react-input-mask";

const GENDERS = ["MALE", "FEMALE"];

export const ClientEditForm = (props) => {
  const dispatch = useDispatch();

  const { client, mode = "edit", ...other } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: client?.id || "",
        name: client?.name || "",
        surname: client?.surname || "",
        patronymic: client?.patronymic || "",
        gender: client?.gender || "",
        birthday: client?.birthday || null,
        password: client?.password || "",
        phone: client?.phone?.substring(4) || "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(4).max(255),
        phone: Yup.string().max(12).required("Phone is required"),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm }
      ) => {
        try {
          const newValues = {
            ...values,
            birthday: format(new Date(values.birthday), "yyyy-MM-dd"),
            phone: "+992" + values?.phone?.replaceAll(" ", ""),
          };
          if (mode === "create") {
            delete newValues.password;
            dispatch(createClient({ values: newValues, resetForm: resetForm }));
          } else {
            dispatch(updateClient(newValues));
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
              title={`${mode === "create" ? "Create" : "Edit"} client`}
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
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      value={values.gender}
                      label="Gender"
                      name="gender"
                      onChange={handleChange}
                    >
                      {GENDERS.map((gender) => (
                        <MenuItem key={gender} value={gender}>
                          {gender}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <ReactInputMask
                    mask="999 99 99 99"
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="999 99 99 99"
                    maskChar=" "
                  >
                    {() => (
                      <TextField
                        error={Boolean(touched.phone && errors.phone)}
                        fullWidth
                        helperText={touched.phone && errors.phone}
                        label="Phone"
                        name="phone"
                      />
                    )}
                  </ReactInputMask>
                </Grid>
                <Grid item md={6} xs={12}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    label="Birth date"
                    onChange={(date) => {
                      setFieldValue("birthday", date);
                    }}
                    renderInput={(inputProps) => (
                      <TextField fullWidth {...inputProps} />
                    )}
                    value={values.birthday}
                  />
                </Grid>
                {mode === "create" && (
                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        autoComplete={false}
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
              <NextLink href="/dashboard/clients" passHref>
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
