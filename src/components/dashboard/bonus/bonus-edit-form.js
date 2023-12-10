import { useEffect, useState } from "react";
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
  FormControl,
  Grid,
  InputLabel,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "src/store";
import {
  createBonus,
  getBonusCategories,
  getBonusTypes,
  getPartners,
  getPoints,
  getProductCategoriesByPoint,
  getProducts,
  updateBonus,
} from "@services/index";
import { DateTimePicker } from "@mui/x-date-pickers";
import { formatRFC3339 } from "date-fns";

export const BonusEditForm = (props) => {
  const dispatch = useDispatch();

  const { partners } = useSelector((state) => state.partners);

  const { products, productCategories } = useSelector(
    (state) => state.products
  );

  const { bonusCategories, bonusTypes } = useSelector(
    (state) => state.handbooks
  );

  const { points } = useSelector((state) => state.points);

  const { bonus, mode = "edit", ...other } = props;

  const [partnerId, setPartnerId] = useState(bonus?.partnerId);
  const [pointId, setPointId] = useState(bonus?.pointId);
  const [productCategoryId, setProductCategoryId] = useState(
    bonus?.productCategoryId
  );

  useEffect(() => {
    dispatch(getBonusTypes());
    dispatch(getBonusCategories());
    dispatch(getPartners({ perPage: 100 }));
  }, []);

  useEffect(() => {
    if (partnerId) {
      dispatch(getPoints({ partnerId: partnerId }));
    }
  }, [partnerId, bonus]);

  useEffect(() => {
    if (pointId) {
      dispatch(getProductCategoriesByPoint({ pointId }));
    }
  }, [pointId, bonus]);

  useEffect(() => {
    if (productCategoryId) {
      dispatch(
        getProducts({
          pointId: pointId,
          perPage: Number(100),
          categoryId: productCategoryId,
        })
      );
    }
  }, [productCategoryId, bonus]);

  useEffect(() => {
    if (bonus) {
      dispatch(getPoints({ partnerId: bonus.partnerId }));
      dispatch(getProductCategoriesByPoint({ pointId: bonus.pointId }));
      dispatch(
        getProducts({
          pointId: bonus.pointId,
          perPage: Number(100),
          categoryId: bonus.productCategoryId,
        })
      );
    }
  }, [bonus]);

  return (
    <Formik
      enableReinitialize={mode === "edit" ? true : false}
      initialValues={{
        id: bonus?.id || "",
        active: bonus?.active || true,
        commission: bonus?.commission || "",
        partnerId: bonus?.partnerId || "",
        startDate: bonus?.startDate || null,
        endDate: bonus?.endDate || null,
        bonusFromOurSide: bonus?.bonusFromOurSide || "",
        bonusFromPartner: bonus?.bonusFromPartner || "",
        pointId: bonus?.pointId || "",
        productId: bonus?.productId || "",
        category: bonus?.category || "",
        productCategoryId: bonus?.productCategoryId || "",
        type: bonus?.type || "",
        submit: null,
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const newValues = {
            ...values,
            pointId: mode === "edit" ? null : values.pointId,
            startDate: formatRFC3339(new Date(values.startDate)),
            endDate: formatRFC3339(new Date(values.endDate)),
          };

          delete newValues?.partnerId;

          if (mode === "create") {
            dispatch(createBonus(newValues));
          } else {
            dispatch(updateBonus(newValues));
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
                  <FormControl fullWidth>
                    <InputLabel id="partnerId-label">Partner</InputLabel>
                    <Select
                      labelId="partnerId-label"
                      value={values.partnerId}
                      label="Partner"
                      name="partnerId"
                      onChange={handleChange}
                    >
                      {partners.map((partner) => (
                        <MenuItem
                          key={partner.id}
                          value={partner.id}
                          onClick={() => setPartnerId(partner?.id)}
                        >
                          {partner?.brand}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth disabled={!partnerId && pointId}>
                    <InputLabel id="point-label">Point</InputLabel>
                    <Select
                      labelId="point-label"
                      value={values.pointId}
                      label="Point"
                      name="pointId"
                      onChange={handleChange}
                    >
                      {points.map((point) => (
                        <MenuItem
                          key={point.id}
                          value={point.id}
                          onClick={() => setPointId(point.id)}
                        >
                          {point?.assortment}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="productType-label">Type</InputLabel>
                    <Select
                      labelId="productType-label"
                      value={values.type}
                      label="Type"
                      name="type"
                      onChange={handleChange}
                    >
                      {bonusTypes.map((productType) => (
                        <MenuItem key={productType.key} value={productType.key}>
                          {productType.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="productCategory-label">Category</InputLabel>
                    <Select
                      labelId="productCategory-label"
                      value={values.category}
                      label="Category"
                      name="category"
                      onChange={handleChange}
                    >
                      {bonusCategories?.map((category) => (
                        <MenuItem key={category.key} value={category.key}>
                          {category.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {values.category !== "OUR" && (
                  <Grid item md={6} xs={12}>
                    <FormControl
                      fullWidth
                      disabled={!values.pointId && !pointId}
                    >
                      <InputLabel id="productType-label">
                        Product Caregory
                      </InputLabel>
                      <Select
                        labelId="productType-label"
                        value={values.productCategoryId}
                        label="Product Caregory"
                        name="productCategoryId"
                        onChange={handleChange}
                      >
                        {productCategories.map((productCategory) => (
                          <MenuItem
                            key={productCategory.id}
                            value={productCategory.id}
                            onClick={() =>
                              setProductCategoryId(productCategory.id)
                            }
                          >
                            {productCategory.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {values.category !== "OUR" && values.category !== "FIX" && (
                  <Grid item md={6} xs={12}>
                    <FormControl
                      fullWidth
                      disabled={!values.productCategoryId && !productCategoryId}
                    >
                      <InputLabel id="productId-label">Product</InputLabel>
                      <Select
                        name="productId"
                        label="Product"
                        labelId="productId-label"
                        value={values.productId}
                        onChange={(e) => {
                          setFieldValue("productId", e.target.value);
                        }}
                      >
                        {products.map((product) => (
                          <MenuItem key={product.id} value={product.id}>
                            {product.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    error={Boolean(
                      touched.bonusFromOurSide && errors.bonusFromOurSide
                    )}
                    helperText={
                      touched.bonusFromOurSide && errors.bonusFromOurSide
                    }
                    name="bonusFromOurSide"
                    label="Bonus From Our Side"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bonusFromOurSide}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    error={Boolean(
                      touched.bonusFromPartner && errors.bonusFromPartner
                    )}
                    helperText={
                      touched.bonusFromPartner && errors.bonusFromPartner
                    }
                    name="bonusFromPartner"
                    label="Bonus From Partner"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bonusFromPartner}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    error={Boolean(touched.commission && errors.commission)}
                    helperText={touched.commission && errors.commission}
                    name="commission"
                    label="Commission"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.commission}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <DateTimePicker
                    ampm={false}
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
                  <DateTimePicker
                    ampm={false}
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
