import NextLink from "next/link";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FieldArray, Formik, getIn } from "formik";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useDispatch } from "src/store";
import { createPartner, updatePartner } from "@services/index";
import ReactInputMask from "react-input-mask";

export const PartnerEditForm = (props) => {
  const { partner, mode = "edit", ...other } = props;

  const dispatch = useDispatch();

  const partnerPhones = partner?.phoneNumbers?.map((item) => {
    return {
      phoneNumber: item.substring(4),
    };
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: partner?.id || "",
        brand: partner?.brand || "",
        companyTin: partner?.companyTin || "",
        directorName: partner?.directorName || "",
        email: partner?.email || "",
        passportSeries: partner?.passportSeries || "",
        phoneNumbers:
          partnerPhones && partnerPhones.length > 0
            ? partnerPhones
            : [{ phoneNumber: "" }],
        region: partner?.region || "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        // brand: Yup.string().max(255),
        // companyTin: Yup.string().min(9).max(9),
        // directorName: Yup.string().min(10).max(255),
        // email: Yup.string()
        //   .email("Must be a valid email")
        //   .max(255)
        //   .required("Email is required"),
        // passportSeries: Yup.string()
        //   .max(8)
        //   .required("Passport series is required"),
        // phoneNumbers: Yup.array().of(
        //   Yup.object().shape({
        //     phoneNumber: Yup.string()
        //       .min(9)
        //       .max(12)
        //       .required("Phone number is required"),
        //   })
        // ),
        // region: Yup.string().max(255).required("Region is required"),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm }
      ) => {
        try {
          const phonesWithPrefix = values.phoneNumbers.map(
            (item) => "+992" + item?.phoneNumber?.replaceAll(" ", "")
          );

          const newValues = { ...values, phoneNumbers: phonesWithPrefix };

          if (mode === "create") {
            dispatch(
              createPartner({ values: newValues, resetForm: resetForm })
            );
          } else {
            dispatch(updatePartner(newValues));
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
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              title={`${mode === "create" ? "Create" : "Edit"} partner`}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.brand && errors.brand)}
                    fullWidth
                    helperText={touched.brand && errors.brand}
                    label="Brand name"
                    name="brand"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.brand}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(touched.companyTin && errors.companyTin)}
                    helperText={touched.companyTin && errors.companyTin}
                    label="Company tin"
                    name="companyTin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.companyTin}
                    inputProps={{
                      maxLength: 9,
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.directorName && errors.directorName)}
                    fullWidth
                    helperText={touched.directorName && errors.directorName}
                    label="Director name"
                    name="directorName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.directorName}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.email}
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
                    error={Boolean(touched.region && errors.region)}
                    fullWidth
                    helperText={touched.region && errors.region}
                    label="Region"
                    name="region"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.region}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FieldArray
                    name="phoneNumbers"
                    render={({ push, remove }) => (
                      <Grid container spacing={3}>
                        {values?.phoneNumbers?.map((p, index) => {
                          const phoneNumber = `phoneNumbers[${index}].phoneNumber`;
                          const touchedPhone = getIn(touched, phoneNumber);
                          const errorPhone = getIn(errors, phoneNumber);
                          return (
                            <Grid item xs={12} key={index}>
                              <ReactInputMask
                                mask="999 99 99 99"
                                value={p?.phoneNumber ?? ""}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="999 99 99 99"
                                maskChar=" "
                              >
                                {() => (
                                  <TextField
                                    error={Boolean(touchedPhone && errorPhone)}
                                    fullWidth
                                    helperText={
                                      touchedPhone && errorPhone
                                        ? errorPhone
                                        : ""
                                    }
                                    label="Phone numbers"
                                    name={phoneNumber}
                                  />
                                )}
                              </ReactInputMask>
                              {/* <TextField
                                error={Boolean(touchedPhone && errorPhone)}
                                fullWidth
                                helperText={
                                  touchedPhone && errorPhone ? errorPhone : ""
                                }
                                label="Phone numbers"
                                name={phoneNumber}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={p?.phoneNumber ?? ""}
                                inputProps={{ maxLength: 9 }}
                              /> */}
                              <Box
                                mt={3}
                                gap={3}
                                display="flex"
                                justifyContent="space-between"
                              >
                                <Button
                                  fullWidth
                                  color="primary"
                                  variant="contained"
                                  onClick={() => push(index, "")}
                                >
                                  Add
                                </Button>
                                <Button
                                  fullWidth
                                  color="warning"
                                  variant="outlined"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </Button>
                              </Box>
                            </Grid>
                          );
                        })}
                      </Grid>
                    )}
                  />
                </Grid>
                {/* </Grid> */}
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
              <NextLink href="/dashboard/partners" passHref>
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
