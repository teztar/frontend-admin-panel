import NextLink from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
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
import { createProduct, updateProduct } from "@services/index";
import { useRef } from "react";

export const ProductEditForm = (props) => {
  const { product, mode = "edit", ...other } = props;

  const dispatch = useDispatch();

  const { query } = useRouter();

  const partnerId = query?.partnerId;
  const pointId = query?.pointId;

  const map = useRef(null);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: product?.name || "",
        price: product?.price || "",
        category: product?.category || "",
        description: product?.description || "",
        ingredients: product?.ingredients || "",
        measuring: product?.measuring || "",
        id: mode === "edit" ? product?.id : null,
        pointId: mode === "create" ? pointId : null,
        submit: null,
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (mode === "create") {
            dispatch(createProduct(values));
          } else {
            dispatch(updateProduct(values));
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
        <form noValidate onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              title={`${mode === "create" ? "Create" : "Edit"} product`}
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

                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                    label="Price"
                    name="price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price}
                    inputProps={{ maxLength: 9 }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    error={Boolean(touched.measuring && errors.measuring)}
                    helperText={touched.measuring && errors.measuring}
                    label="Measuring"
                    name="measuring"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.measuring}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(touched.category && errors.category)}
                    helperText={touched.category && errors.category}
                    label="Category"
                    name="category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(touched.ingredients && errors.ingredients)}
                    helperText={touched.ingredients && errors.ingredients}
                    label="Ingredients"
                    name="ingredients"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ingredients}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    label="Description"
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
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
              <NextLink
                href={`/dashboard/partners/${partnerId}/points/${pointId}/products`}
                passHref
              >
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
