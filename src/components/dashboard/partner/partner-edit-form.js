import NextLink from "next/link";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
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
import { wait } from "../../../utils/wait";
import { useDispatch } from "src/store";
import { createPartner, updatePartner } from "@services/index";

export const PartnerEditForm = (props) => {
  const { partner, mode = "edit", ...other } = props;

  console.log({ partner });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      brand: partner?.brand || "",
      companyTin: partner?.companyTin || "",
      directorName: partner?.directorName || "",
      email: partner?.email || "",
      passportSeries: partner?.passportSeries || "",
      phoneNumbers: partner?.phoneNumbers || ["+992938080888"],
      region: partner?.region || "",
      submit: null,
    },
    validationSchema: Yup.object({
      brand: Yup.string().max(255),
      companyTin: Yup.string().min(9).max(9),
      directorName: Yup.string().min(10).max(255),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      passportSeries: Yup.string()
        .max(14)
        .required("Passport series is required"),
      phoneNumbers: Yup.array(),
      region: Yup.string().max(255).required("Region is required"),
      phone: Yup.string().max(15),
      state: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        if (mode === "create") {
          dispatch(createPartner(values));
        } else {
          dispatch(updatePartner(values));
        }
        await wait(500);
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

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader
          title={`${mode === "create" ? "Create" : "Edit"} partner`}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.brand && formik.errors.brand)}
                fullWidth
                helperText={formik.touched.brand && formik.errors.brand}
                label="Brand name"
                name="brand"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.brand}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.companyTin && formik.errors.companyTin
                )}
                fullWidth
                helperText={
                  formik.touched.companyTin && formik.errors.companyTin
                }
                label="Company tin"
                name="companyTin"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.companyTin}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.directorName && formik.errors.directorName
                )}
                fullWidth
                helperText={
                  formik.touched.directorName && formik.errors.directorName
                }
                label="Director name"
                name="directorName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.directorName}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.passportSeries && formik.errors.passportSeries
                )}
                fullWidth
                helperText={
                  formik.touched.passportSeries && formik.errors.passportSeries
                }
                label="Passport series"
                name="passportSeries"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.passportSeries}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.region && formik.errors.region)}
                fullWidth
                helperText={formik.touched.region && formik.errors.region}
                label="Region"
                name="region"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.region}
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
          <NextLink href="/dashboard/partners" passHref>
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

PartnerEditForm.propTypes = {
  partner: PropTypes.object,
  mode: PropTypes.string,
};
