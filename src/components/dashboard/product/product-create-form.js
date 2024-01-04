import { Fragment, useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { FieldArray, Formik, getIn } from "formik";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
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
import useImageLoader from "@hooks/use-image-loader";
import { UploadFile } from "@mui/icons-material";
import { removeEmptyBodyFields } from "@utils/axios";
import { toSnakeCaseFormat } from "@utils/case-style";

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

  const formData = new FormData();

  useEffect(() => {
    dispatch(getProductVolumes());
    dispatch(getProductCategories());
  }, []);

  useEffect(() => {
    if (webImage) {
      setWebImageUrl(URL.createObjectURL(webImage));
    }
  }, [webImage]);

  return (
    <Formik
      enableReinitialize={mode === "edit" ? true : false}
      initialValues={{
        id: mode === "edit" ? product?.id : null,
        pointId: mode === "create" ? pointId : null,
        name: product?.name || "",
        categories: product?.categories || [],
        description: product?.description || "",
        ingredients: product?.ingredients || "",
        volumes:
          product && product?.volumes?.length > 0
            ? product.volumes
            : [
                {
                  price: "",
                  volume: "",
                  measuring: "",
                  maxQuantityInOneOrder: "",
                },
              ],
        image: mode === "edit" ? newProduct?.imageUrl : webImageUrl,
        submit: null,
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const newValues = {
            ...values,
            categoriesId: values.categories.map((item) => item.id),
          };

          const payload = JSON.stringify(
            removeEmptyBodyFields(toSnakeCaseFormat(newValues))
          );

          formData.append("payload", payload);
          formData.append("image", webImage);

          console.log({ payload });
          if (mode === "create") {
            dispatch(
              createProduct({
                payload: formData,
                requestDigest: payload,
              })
            );
          } else {
            dispatch(updateProduct(values));
          }
          setStatus({ success: true });
          setSubmitting(false);
        } catch (err) {
          values = {};
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
                    error={Boolean(touched.description && errors.description)}
                    fullWidth
                    helperText={touched.description && errors.description}
                    label="Description"
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.description}
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
                  <FormControl fullWidth>
                    <InputLabel id="multiple-checkbox-label">
                      Categories
                    </InputLabel>
                    <Select
                      labelId="multiple-checkbox-label"
                      id="multiple-checkbox"
                      multiple
                      value={values.categories}
                      onChange={(event) =>
                        setFieldValue("categories", event.target.value)
                      }
                      input={<OutlinedInput label="Categories" />}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((category, index) => (
                            <Chip key={index} label={category.name} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {productCategories.map((productCategory) => (
                        <MenuItem
                          key={productCategory.id}
                          value={productCategory}
                        >
                          <Checkbox
                            checked={values.categories.some(
                              (cat) => cat.id === productCategory.id
                            )}
                          />
                          <ListItemText primary={productCategory.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FieldArray
                    name="volumes"
                    render={({ push, remove }) => (
                      <Grid container spacing={3}>
                        {values?.volumes?.map((p, index) => {
                          const maxQuantityInOneOrder = `volumes[${index}].maxQuantityInOneOrder`;
                          const price = `volumes[${index}].price`;
                          const measuring = `volumes[${index}].measuring`;
                          const volume = `volumes[${index}].volume`;

                          const touchedMaxQuantityInOneOrder = getIn(
                            touched,
                            maxQuantityInOneOrder
                          );
                          const errorMaxQuantityInOneOrder = getIn(
                            errors,
                            maxQuantityInOneOrder
                          );

                          const touchedPrice = getIn(touched, price);
                          const errorPrice = getIn(errors, price);

                          const touchedMeasuring = getIn(touched, measuring);
                          const errorMeasuring = getIn(errors, measuring);

                          const touchedVolume = getIn(touched, volume);
                          const errorVolume = getIn(errors, volume);

                          return (
                            <Fragment key={index}>
                              <Grid item md={6} xs={12}>
                                <TextField
                                  required
                                  fullWidth
                                  type="number"
                                  error={Boolean(touchedPrice && errorPrice)}
                                  helperText={touchedPrice && errorPrice}
                                  label="Price"
                                  name={price}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={p?.price}
                                />
                              </Grid>
                              <Grid item md={6} xs={12}>
                                <TextField
                                  fullWidth
                                  error={Boolean(
                                    touchedMeasuring && errorMeasuring
                                  )}
                                  helperText={
                                    touchedMeasuring && errorMeasuring
                                  }
                                  label="Measuring"
                                  name={measuring}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  required
                                  value={p?.measuring}
                                />
                              </Grid>

                              <Grid item md={6} xs={12}>
                                <FormControl fullWidth>
                                  <InputLabel id="partnerId-label">
                                    Volumes
                                  </InputLabel>
                                  <Select
                                    labelId="volume-label"
                                    value={p?.volume}
                                    label="Volumes"
                                    name={volume}
                                    onChange={handleChange}
                                  >
                                    {volumesArr.map((volume) => (
                                      <MenuItem
                                        key={volume.key}
                                        value={volume.key}
                                      >
                                        {volume?.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item md={6} xs={12}>
                                <TextField
                                  type="number"
                                  error={Boolean(
                                    touchedMaxQuantityInOneOrder &&
                                      errorMaxQuantityInOneOrder
                                  )}
                                  fullWidth
                                  helperText={
                                    touchedMaxQuantityInOneOrder &&
                                    errorMaxQuantityInOneOrder
                                      ? errorMaxQuantityInOneOrder
                                      : ""
                                  }
                                  label="Max Quantity In One Order"
                                  name={maxQuantityInOneOrder}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={p?.maxQuantityInOneOrder ?? ""}
                                />

                                <Box
                                  mt={3}
                                  gap={3}
                                  display="flex"
                                  justifyContent="space-between"
                                >
                                  {index + 1 === values.volumes.length && (
                                    <Button
                                      fullWidth
                                      color="primary"
                                      variant="contained"
                                      onClick={() => push(index, "")}
                                    >
                                      Add
                                    </Button>
                                  )}
                                  {index > 0 && (
                                    <Button
                                      fullWidth
                                      color="warning"
                                      variant="outlined"
                                      onClick={() => remove(index)}
                                    >
                                      Remove
                                    </Button>
                                  )}
                                </Box>
                              </Grid>
                            </Fragment>
                          );
                        })}
                      </Grid>
                    )}
                  />
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
