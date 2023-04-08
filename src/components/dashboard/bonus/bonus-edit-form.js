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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "src/store";
import {
  createBonus,
  getBonusCategories,
  getBonusTypes,
  getPartners,
  getPoints,
  updateBonus,
} from "@services/index";
import { format } from "date-fns";

const categories = ["FIX", "PRESENT", "OUR"];

const types = ["CONSTANT", "TEMPORARY", "FOR_FIRST_ORDER"];

export const BonusEditForm = (props) => {
  const dispatch = useDispatch();

  const { partners } = useSelector((state) => state.partners);

  const { bonusCategories, bonusTypes } = useSelector(
    (state) => state.handbooks
  );

  const { points } = useSelector((state) => state.points);

  const { bonus, mode = "edit", ...other } = props;

  const [partnerId, setPartnerId] = useState();

  useEffect(() => {
    dispatch(getBonusTypes());
    dispatch(getBonusCategories());
    dispatch(getPartners());
  }, []);

  useEffect(() => {
    if (partnerId) {
      dispatch(getPoints({ partnerId: partnerId }));
    }
  }, [partnerId]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: bonus?.id || "",
        active: bonus?.active || true,
        commission: bonus?.commission || "",
        startDate: bonus?.startDate || null,
        endDate: bonus?.endDate || null,
        fixBonus: bonus?.fixBonus || "",
        bonusFromOurSide: bonus?.bonusFromOurSide || "",
        bonusFromPartner: bonus?.bonusFromPartner || "",
        pointId: bonus?.pointId || "",
        productId: bonus?.productId || "",
        productCategory: bonus?.productCategory || "",
        type: bonus?.type || "",
        submit: null,
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const newValues = {
            ...values,
            partnerId: null,
            pointId: mode === "edit" ? null : values.pointId,
            startDate: format(new Date(values.startDate), "yyyy-MM-dd"),
            endDate: format(new Date(values.endDate), "yyyy-MM-dd"),
          };

          console.log({ newValues });
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
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
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
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
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
                  <FormControl fullWidth disabled={!partnerId}>
                    <InputLabel id="point-label">Point</InputLabel>
                    <Select
                      labelId="point-label"
                      value={values.pointId}
                      label="Point"
                      name="pointId"
                      onChange={handleChange}
                    >
                      {points.map((point) => (
                        <MenuItem key={point.id} value={point.id}>
                          {point?.assortment}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="productCategory-label">
                      Product Category
                    </InputLabel>
                    <Select
                      labelId="productCategory-label"
                      value={values.productCategory}
                      label="Product Category"
                      name="productCategory"
                      onChange={handleChange}
                    >
                      {bonusCategories?.map((productCategory) => (
                        <MenuItem
                          key={productCategory.key}
                          value={productCategory.key}
                        >
                          {productCategory.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="productType-label">Product Type</InputLabel>
                    <Select
                      labelId="productType-label"
                      value={values.type}
                      label="Product Type"
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
