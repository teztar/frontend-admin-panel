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
  Grid,
  TextField,
} from "@mui/material";
import { useDispatch } from "src/store";
import { createProductCategory, updateProductCategory } from "@services/index";

export const ProductCategoryEditForm = (props) => {
  const dispatch = useDispatch();

  const { productCategory, mode = "edit", ...other } = props;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: productCategory?.id || "",
        name: productCategory?.name || "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(4).max(255),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm }
      ) => {
        try {
          if (mode === "create") {
            dispatch(
              createProductCategory({ values: values, resetForm: resetForm })
            );
          } else {
            dispatch(updateProductCategory(values));
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
        <form noValidate onSubmit={handleSubmit} {...other}>
          <Card>
            <CardHeader
              title={`${
                mode === "create" ? "Create" : "Edit"
              } product category`}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
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
              <NextLink href="/dashboard/product-categories" passHref>
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
