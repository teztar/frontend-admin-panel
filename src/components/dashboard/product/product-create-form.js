import NextLink from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Formik } from "formik";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "src/store";
import {
  createProduct,
  getProductCategories,
  getProductVolumes,
  updateProduct,
} from "@services/index";
import { useEffect, useRef, useState } from "react";
import useImageLoader from "@hooks/use-image-loader";
import { UploadFile } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const ProductEditForm = (props) => {
  const { product, mode = "edit", ...other } = props;

  const dispatch = useDispatch();

  const { volumes: volumesArr } = useSelector((state) => state.handbooks);

  const { productCategories } = useSelector((state) => state.products);

  const { query } = useRouter();

  const newProduct = useImageLoader("products", product, "image")[0];

  const webImageRef = useRef(null);

  const [webImage, setWebImage] = useState(newProduct?.imageUrl);

  const [webImageUrl, setWebImageUrl] = useState(null);

  const partnerId = query?.partnerId;
  const pointId = query?.pointId;

  useEffect(() => {
    dispatch(getProductVolumes());
    dispatch(getProductCategories());
  }, []);

  useEffect(() => {
    if (webImage) {
      setWebImageUrl(URL.createObjectURL(webImage));
    }
  }, [webImage]);

  console.log({ volumesArr });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        id: mode === "edit" ? product?.id : null,
        pointId: mode === "create" ? pointId : null,
        name: product?.name || "",
        price: product?.price || "",
        categories: product?.categories || [],
        description: product?.description || "",
        ingredients: product?.ingredients || "",
        measuring: product?.measuring || "",
        volumes:
          product && product?.volumes?.length > 0
            ? product.volumes
            : [
                {
                  price: 0,
                  volume: "",
                  measuring: "",
                  max_quantity_in_one_order: 0,
                },
              ],
        image: mode === "edit" ? newProduct?.imageUrl : webImageUrl,
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
              title={`${
                mode === "create" ? "Create" : "Edit"
              } product, ведется работа`}
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
                  <FormControl fullWidth>
                    <InputLabel id="multiple-checkbox-label">
                      Categories
                    </InputLabel>
                    <Select
                      labelId="multiple-checkbox-label"
                      id="multiple-checkbox"
                      multiple
                      value={values.categories}
                      onChange={handleChange}
                      input={<OutlinedInput label="Categories" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {productCategories.map((productCategory) => (
                        <MenuItem
                          key={productCategory.id}
                          value={productCategory.id}
                        >
                          <Checkbox
                            checked={
                              values.categories.indexOf(productCategory.id) > -1
                            }
                          />
                          <ListItemText primary={productCategory.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="partnerId-label">Volumes</InputLabel>
                    <Select
                      labelId="volume-label"
                      value={values.volume}
                      label="Volumes"
                      name="volume"
                      onChange={handleChange}
                    >
                      {volumesArr.map((volume) => (
                        <MenuItem key={volume.key} value={volume.key}>
                          {volume?.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
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
                {!webImageUrl && values.image && (
                  <Grid item xs={12}>
                    <img
                      src={values.image}
                      alt="image web"
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
