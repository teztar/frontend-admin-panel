import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import toast from "react-hot-toast";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { UploadFile } from "@mui/icons-material";
import { format } from "date-fns";
import { useDispatch, useSelector } from "src/store";
import {
  createBanner,
  getBannerReferenceTypes,
  getBannerTypes,
  getPartners,
  getPoints,
  getProductCategories,
  updateBanner,
} from "@services/index";
import { removeEmptyBodyFields } from "@utils/axios";
import { toSnakeCaseFormat } from "@utils/case-style";
import useBannersImageLoader from "@hooks/use-banner-images";

export const BannerEditForm = (props) => {
  const dispatch = useDispatch();

  const { banner, mode = "edit", ...other } = props;

  const { products, productCategories } = useSelector(
    (state) => state.products
  );

  const { bannerTypes, bannerReferenceTypes } = useSelector(
    (state) => state.handbooks
  );

  const { partners } = useSelector((state) => state.partners);

  const { points } = useSelector((state) => state.points);

  console.log({ bannerTypes, bannerReferenceTypes });

  const newBanner = useBannersImageLoader(banner, "bannerImages")[0];

  const [webImage, setWebImage] = useState(newBanner?.webImageUrl);
  const [appImage, setAppImage] = useState(newBanner?.appImageUrl);

  const [webImageUrl, setWebImageUrl] = useState(null);
  const [appImageUrl, setAppImageUrl] = useState(null);

  const [partner, setPartner] = useState(newBanner?.partner);

  const [isCategoryProductSelected, setIsCategoryProductSelected] =
    useState(false);
  const [isPointSelected, setIsPointSelected] = useState(false);

  const appImageRef = useRef(null);
  const webImageRef = useRef(null);

  const formData = new FormData();

  const handleTypeClick = (type) => {
    if (type === "REFERENCE_TYPE_PRODUCT_CATEGORY") {
      setIsCategoryProductSelected(true);
    } else if (type === "REFERENCE_TYPE_POINT") {
      setIsPointSelected(true);
    }
  };

  useEffect(() => {
    dispatch(getBannerTypes());
    dispatch(getBannerReferenceTypes());
  }, []);

  useEffect(() => {
    if (isCategoryProductSelected) {
      dispatch(getProductCategories({ page: 1, perPage: 100 }));
    }
  }, [isCategoryProductSelected]);

  useEffect(() => {
    if (isPointSelected) {
      dispatch(getPartners({ page: 1, perPage: 100 }));
    }
  }, [isPointSelected]);

  useEffect(() => {
    if (partner) {
      dispatch(getPoints({ page: 1, perPage: 100, partnerId: partner.id }));
    }
  }, [partner]);

  useEffect(() => {
    if (webImage) {
      setWebImageUrl(URL.createObjectURL(webImage));
    }
  }, [webImage]);

  useEffect(() => {
    if (appImage) {
      setAppImageUrl(URL.createObjectURL(appImage));
    }
  }, [appImage]);

  return (
    <Formik
      enableReinitialize={mode === "edit" ? true : false}
      initialValues={{
        id: newBanner?.id || "",
        title: newBanner?.title || "",
        body: newBanner?.body || "",
        queue: newBanner?.queue || "",
        link: newBanner?.link || "",
        active: newBanner?.active || true,
        partner: newBanner?.partner || true,
        startDate: newBanner?.startDate || null,
        endDate: newBanner?.endDate || null,
        webImage: mode === "edit" && newBanner?.webImageUrl,
        appImage: mode === "edit" && newBanner?.appImageUrl,
        type: newBanner?.type || "", // новое поле
        referenceType: newBanner?.referenceType || "", // новое поле
        referenceId: newBanner?.referenceId || "", // новое поле
        pointId: newBanner?.pointId || "", // новое поле
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required("Title is required"),
        body: Yup.string().min(16).required("Body is required"),
        type: Yup.string().required("Type is required"),
        queue: Yup.number().required("Queue is required"),

        referenceType: Yup.string().when("type", {
          is: "BANNER_TYPE_REFERENCE",
          then: Yup.string().required("Reference type is required"),
        }),
        referenceId: Yup.string().when("type", {
          is: "BANNER_TYPE_REFERENCE",
          then: Yup.string().required("Reference ID is required"),
        }),
        pointId: Yup.string().when("referenceType", {
          is: (val) => val && val !== "REFERENCE_TYPE_PRODUCT_CATEGORY",
          then: Yup.string().required("Point ID is required"),
        }),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm }
      ) => {
        try {
          const newValues = {
            ...values,
            active: mode === "create" ? null : values.active,
            startDate: format(new Date(values.startDate), "yyyy-MM-dd"),
            endDate: format(new Date(values.endDate), "yyyy-MM-dd"),
          };

          delete newValues.appImage;
          delete newValues.webImage;

          const payload = JSON.stringify(
            removeEmptyBodyFields(toSnakeCaseFormat(newValues))
          );

          formData.append("payload", payload);
          // if (mode === "edit") {
          if (!webImageUrl) {
            formData.append(
              "web_image",
              new File([values.webImage], "webImage.png", {
                type: "image/png",
                lastModified: new Date(),
              })
            );
          } else {
            formData.append("web_image", webImage);
          }

          if (!appImageUrl) {
            formData.append(
              "app_image",
              new File([values.appImage], "appImage.png", {
                type: "image/png",
                lastModified: new Date(),
              })
            );
          } else {
            formData.append("app_image", appImage);
          }

          if (mode === "create") {
            dispatch(
              createBanner({
                payload: formData,
                requestDigest: payload,
                resetForm: resetForm,
              })
            );
          } else {
            dispatch(
              updateBanner({
                payload: formData,
                requestDigest: payload,
              })
            );
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
              title={`${mode === "create" ? "Create" : "Edit"} banner`}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    name="title"
                    label="Title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    multiline
                    required
                    fullWidth
                    error={Boolean(touched.body && errors.body)}
                    helperText={touched.body && errors.body}
                    name="body"
                    label="Body"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.body}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    error={Boolean(touched.queue && errors.queue)}
                    helperText={touched.queue && errors.queue}
                    name="queue"
                    label="Queue"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.queue}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    select
                    required
                    fullWidth
                    label="Type"
                    name="type"
                    value={values.type}
                    onChange={(e) => setFieldValue("type", e.target.value)}
                  >
                    {bannerTypes?.map((bannerType) => (
                      <MenuItem key={bannerType.key} value={bannerType.key}>
                        {bannerType.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {values.type === "BANNER_TYPE_LINK" && (
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Link"
                      name="link"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.link}
                    />
                  </Grid>
                )}

                {values.type === "BANNER_TYPE_REFERENCE" && (
                  <>
                    <Grid item md={6} xs={12}>
                      <TextField
                        select
                        fullWidth
                        label="Reference Type"
                        name="referenceType"
                        value={values.referenceType}
                        onChange={(e) =>
                          setFieldValue("referenceType", e.target.value)
                        }
                      >
                        {bannerReferenceTypes?.map((bannerReferenceType) => (
                          <MenuItem
                            key={bannerReferenceType.key}
                            value={bannerReferenceType.key}
                            onClick={() =>
                              handleTypeClick(bannerReferenceType.key)
                            }
                          >
                            {bannerReferenceType.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    {values.referenceType !==
                      "REFERENCE_TYPE_PRODUCT_CATEGORY" &&
                      values.referenceType && (
                        <Grid item md={6} xs={12}>
                          <TextField
                            select
                            fullWidth
                            label="Partner"
                            value={values.partner}
                            onChange={(e) =>
                              setFieldValue("partner", e.target.value)
                            }
                          >
                            {partners?.map((partner) => (
                              <MenuItem
                                key={partner.id}
                                value={partner.id}
                                onClick={() => setPartner(partner)}
                              >
                                {partner.brand}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      )}

                    <Grid item md={6} xs={12}>
                      <TextField
                        select
                        fullWidth
                        label="Reference ID"
                        name="referenceId"
                        value={values.referenceId}
                        onChange={(e) =>
                          setFieldValue("referenceId", e.target.value)
                        }
                      >
                        {values.referenceType ===
                          "REFERENCE_TYPE_PRODUCT_CATEGORY" &&
                          productCategories?.map((productCategory) => (
                            <MenuItem
                              key={productCategory.id}
                              value={productCategory.id}
                            >
                              {productCategory.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>

                    {values.referenceType !==
                      "REFERENCE_TYPE_PRODUCT_CATEGORY" &&
                      values.referenceType && (
                        <Grid item md={6} xs={12}>
                          <TextField
                            select
                            fullWidth
                            label="Point ID"
                            name="pointId"
                            value={values.pointId}
                            onChange={(e) =>
                              setFieldValue("pointId", e.target.value)
                            }
                          >
                            {points?.map((point) => (
                              <MenuItem key={point.id} value={point.id}>
                                {point.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      )}
                  </>
                )}

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
                {mode === "edit" && (
                  <>
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
                    <Grid item md={6} xs={12}></Grid>
                  </>
                )}
                <Grid item md={6} xs={12}>
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
                <Grid item md={6} xs={12}>
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    ref={appImageRef}
                    onChange={(e) => setAppImage(e.target.files[0])}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<UploadFile />}
                    onClick={() => appImageRef?.current?.click()}
                  >
                    App image
                  </Button>
                  {appImageUrl && appImage && (
                    <Box mt={3}>
                      <img
                        src={appImageUrl}
                        style={{
                          width: 250,
                          height: 250,
                        }}
                      />
                    </Box>
                  )}
                </Grid>

                {!webImageUrl && values.webImage && (
                  <Grid item md={6} xs={12}>
                    <img
                      src={values.webImage}
                      alt="web image"
                      style={{
                        width: 40,
                      }}
                    />
                  </Grid>
                )}

                {!appImageUrl && values.appImage && (
                  <Grid item md={6} xs={12}>
                    <img
                      src={values.appImage}
                      alt="app image"
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
                {mode === "create" ? "Создать" : "Обновить"}
              </Button>
              <NextLink href="/dashboard/banners" passHref>
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
