import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FieldArray, Formik, getIn } from "formik";
import { Map, Placemark, SearchControl, YMaps } from "react-yandex-maps";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { format } from "date-fns";
import { useDispatch, useSelector } from "src/store";
import { createPoint, getKitchenTypes, updatePoint } from "@services/index";
import useImageLoader from "@hooks/use-image-loader";
import { removeEmptyBodyFields } from "@utils/axios";
import { toSnakeCaseFormat } from "@utils/case-style";
import ReactInputMask from "react-input-mask";

export const PointEditForm = (props) => {
    const { point, mode = "edit", ... other } = props;

    const dispatch = useDispatch();

    const { kitchenTypes } = useSelector((state) => state.kitchenTypes);

    const newPoint = useImageLoader("points", point, "pointImage")[0];

    const { query } = useRouter();

    const pointId = query?.pointId;
    const partnerId = query?.partnerId;

    const map = useRef(null);
    const webImageRef = useRef(null);

    const [webImage, setWebImage] = useState(newPoint?.imageUrl);
    const [webImageUrl, setWebImageUrl] = useState(null);

    const formData = new FormData();

    const handleGetGeoObject = async (map, setFieldValue) => {
        if (Array.isArray(map)) {
            setFieldValue("location.latitude", map[0]);
            setFieldValue("location.longitude", map[1]);
        } else {
            const coords = map.get("coords");

            setFieldValue("location.latitude", coords[0]);
            setFieldValue("location.longitude", coords[1]);
        }
    };

    const convertToTime = (minutes) => {
        const date = new Date();
        date.setHours(0);
        date.setMinutes(minutes ? parseInt(minutes, 10) : 0);
        return date;
    };

    const pointPhones = point?.phoneNumbers?.map((item) => ({
        phoneNumber:item.substring(4),
    }));

    useEffect(() => {
        if (webImage) {
            setWebImageUrl(URL.createObjectURL(webImage));
        }
    }, [webImage]);

    useEffect(() => {
        if (!webImage && point?.pointImage?.imageUrl) {
            setWebImageUrl(point.pointImage.imageUrl); // Set the existing image URL
        }
    }, [point]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(
                getKitchenTypes({
                    page:1,
                    perPage:100,
                    search:"",
                })
            );
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Formik
            enableReinitialize={mode === "edit" ? true : false}
            initialValues={{
                id:mode === "edit" ? pointId : "",
                partnerId:mode === "create" ? partnerId : "",
                name:point?.name || "",
                description:point?.description || "",
                commission:point?.commission || "",
                averageCookingTime:
                    mode === "edit" ? convertToTime(point?.averageCookingTime) : null,
                closingTime:
                    mode === "edit" ? new Date("01/01/1970 " + point?.closingTime) : null,
                location:{
                    latitude:point?.address?.latitude || "",
                    longitude:point?.address?.longitude || "",
                    name:point?.address?.name || "",
                },
                kitchenTypeId:point?.kitchenTypeId || "",
                minimumCheckAmount:point?.minimumCheckAmount || "",
                openingTime:
                    mode === "edit" ? new Date("01/01/1970 " + point?.openingTime) : null,
                status:point?.status || "",
                image:mode === "edit" ? newPoint?.imageUrl : webImageUrl,
                phoneNumbers:
                    pointPhones && pointPhones.length > 0
                        ? pointPhones
                        : [{ phoneNumber:"" }],
                submit:null,
            }}
            validationSchema={Yup.object().shape({
                name:Yup.string()
                    .max(255, "Слишком длинное название точки")
                    .required("Поле «Название» обязательно для заполнения"),
                description:Yup.string().max(500, "Слишком длинное описание"),
                commission:Yup.number()
                    .typeError("Комиссия должна быть числом")
                    .min(0, "Комиссия должна быть положительной")
                    .required("Поле «Комиссия» обязательно для заполнения"),
                averageCookingTime:Yup.date().required("Поле «Среднее время приготовления» обязательно"),
                closingTime:Yup.date().required("Поле «Время закрытия» обязательно"),
                openingTime:Yup.date().required("Поле «Время открытия» обязательно"),
                kitchenTypeId:Yup.string().required("Поле «Тип кухни» обязательно для заполнения"),
                location:Yup.object().shape({
                    latitude:Yup.string().notRequired(),
                    longitude:Yup.string().notRequired(),
                    name:Yup.string()
                        .max(255, "Слишком длинное название улицы")
                        .required("Поле «Название улицы» обязательно для заполнения"),
                }),
                minimumCheckAmount:Yup.number()
                    .typeError("Минимальная сумма чека должна быть числом")
                    .min(0, "Минимальная сумма чека должна быть положительной")
                    .required("Поле «Минимальная сумма чека» обязательно для заполнения"),
                phoneNumbers:Yup.array()
                    .of(
                        Yup.object().shape({
                            phoneNumber:Yup.string()
                                .matches(/^[0-9 ]*$/, "Некорректный формат номера телефона")
                                .min(9, "Номер должен содержать не менее 9 цифр")
                                .max(12, "Слишком длинный номер телефона")
                                .required("Поле «Номер телефона» обязательно для заполнения"),
                        })
                    )
                    .min(1, "Необходимо указать хотя бы один номер телефона"),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                try {
                    const phonesWithPrefix = values.phoneNumbers.map((item) =>
                        "+992" + item?.phoneNumber?.replaceAll(" ", "")
                    );

                    const newValues = {
                        ... values,
                        phoneNumbers:phonesWithPrefix,
                        averageCookingTime:format(new Date(values.averageCookingTime), "mm"),
                        closingTime:format(new Date(values.closingTime), "HH:mm"),
                        openingTime:format(new Date(values.openingTime), "HH:mm"),
                        minimumCheckAmount:+values.minimumCheckAmount,
                        commission:+values.commission,
                        location:{
                            latitude:values.location.latitude.toString(),
                            longitude:values.location.longitude.toString(),
                            name:values.location.name,
                        },
                    };

                    const payload = JSON.stringify(
                        removeEmptyBodyFields(toSnakeCaseFormat(newValues))
                    );

                    formData.append("payload", payload);

                    if (webImage) {
                        formData.append("image", webImage);
                    } else if (values.image) {
                        formData.append(
                            "image",
                            new File([values.image], "image.png", {
                                type:"image/png",
                                lastModified:new Date(),
                            })
                        );
                    }

                    if (mode === "create") {
                        dispatch(
                            createPoint({ payload:formData, requestDigest:payload, resetForm })
                        );
                    } else {
                        dispatch(updatePoint({ payload:formData, requestDigest:payload }));
                    }

                    setStatus({ success:true });
                    setSubmitting(false);
                } catch (err) {
                    console.error(err);
                    toast.error("Что-то пошло не так!");
                    setStatus({ success:false });
                    setErrors({ submit:err.message });
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
                            title={`${mode === "create" ? "Создать" : "Редактировать"} точку`}
                        />
                        <Divider/>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(touched.name && errors.name)}
                                        fullWidth
                                        helperText={touched.name && errors.name}
                                        label="Название"
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
                                        multiline
                                        helperText={touched.description && errors.description}
                                        label="Описание"
                                        name="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.description}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(touched.commission && errors.commission)}
                                        fullWidth
                                        helperText={touched.commission && errors.commission}
                                        label="Комиссия"
                                        name="commission"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.commission}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TimePicker
                                        ampm={false}
                                        required
                                        inputFormat="mm"
                                        label="Среднее время приготовления (минуты)"
                                        value={values.averageCookingTime}
                                        onChange={(time) => {
                                            setFieldValue("averageCookingTime", time);
                                        }}
                                        renderInput={(params) => (
                                            <TextField fullWidth {... params} required/>
                                        )}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TimePicker
                                        ampm={false}
                                        inputFormat="HH:mm"
                                        label="Время открытия"
                                        onChange={(time) => {
                                            setFieldValue("openingTime", time);
                                        }}
                                        renderInput={(inputProps) => (
                                            <TextField fullWidth {... inputProps} />
                                        )}
                                        value={values.openingTime}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TimePicker
                                        ampm={false}
                                        required
                                        inputFormat="HH:mm"
                                        label="Время закрытия"
                                        onChange={(time) => {
                                            setFieldValue("closingTime", time);
                                        }}
                                        renderInput={(inputProps) => (
                                            <TextField fullWidth {... inputProps} />
                                        )}
                                        value={values.closingTime}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="kitchenTypeId-label">
                                            Тип кухни
                                        </InputLabel>
                                        <Select
                                            labelId="kitchenTypeId-label"
                                            value={values?.kitchenTypeId}
                                            label="Тип кухни"
                                            name="kitchenTypeId"
                                            onChange={handleChange}
                                            required
                                        >
                                            {kitchenTypes.map((kitchenType) => (
                                                <MenuItem
                                                    key={kitchenType.id}
                                                    value={kitchenType.id}
                                                    onClick={() =>
                                                        setFieldValue("kitchenTypeId", kitchenType.id)
                                                    }
                                                >
                                                    {kitchenType?.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        error={Boolean(
                                            touched.location?.latitude && errors.location?.latitude
                                        )}
                                        helperText={
                                            touched.location?.latitude && errors.location?.latitude
                                        }
                                        label="Широта"
                                        name="latitude"
                                        onBlur={handleBlur}
                                        onChange={(e) =>
                                            setFieldValue("location.latitude", e.target.value)
                                        }
                                        value={values.location?.latitude}
                                        inputProps={{ maxLength:9 }}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        error={Boolean(
                                            touched.location?.longitude && errors.location?.longitude
                                        )}
                                        helperText={
                                            touched.location?.longitude && errors.location?.longitude
                                        }
                                        label="Долгота"
                                        name="longitude"
                                        onBlur={handleBlur}
                                        onChange={(e) =>
                                            setFieldValue("location.longitude", e.target.value)
                                        }
                                        value={values.location?.longitude}
                                        inputProps={{ maxLength:9 }}
                                    />
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        // type="number"
                                        error={Boolean(
                                            touched.location?.name && errors.location?.name
                                        )}
                                        helperText={touched.location?.name && errors.location?.name}
                                        label="Название улицы"
                                        name="location.name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.location?.name}
                                        inputProps={{ maxLength:9 }}
                                    />
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                error={Boolean(
                                                    touched.minimumCheckAmount && errors.minimumCheckAmount
                                                )}
                                                helperText={
                                                    touched.minimumCheckAmount &&
                                                    errors.minimumCheckAmount
                                                }
                                                label="Минимальная сумма чека"
                                                name="minimumCheckAmount"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.minimumCheckAmount}
                                                inputProps={{ maxLength:9 }}
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
                                                startIcon={<UploadFile/>}
                                                onClick={() => webImageRef?.current?.click()}
                                            >
                                                Загрузить изображение
                                            </Button>
                                            {webImageUrl && webImage && (
                                                <Box mt={3}>
                                                    <img
                                                        src={webImageUrl}
                                                        style={{
                                                            width:250,
                                                            height:250,
                                                        }}
                                                        alt="Предпросмотр изображения"
                                                    />
                                                </Box>
                                            )}
                                        </Grid>
                                        {!webImageUrl && values.image && (
                                            <Grid item xs={12}>
                                                <img
                                                    src={values.image}
                                                    alt="Исходное изображение"
                                                    style={{
                                                        width: 40,
                                                    }}
                                                />
                                            </Grid>
                                        )}
                                    </Grid>
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
                                                                        label="Номера телефонов"
                                                                        name={phoneNumber}
                                                                        required
                                                                    />
                                                                )}
                                                            </ReactInputMask>

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
                                                                    Добавить
                                                                </Button>
                                                                {index > 0 && (
                                                                    <Button
                                                                        fullWidth
                                                                        color="warning"
                                                                        variant="outlined"
                                                                        onClick={() => remove(index)}
                                                                    >
                                                                        Удалить
                                                                    </Button>
                                                                )}
                                                            </Box>
                                                        </Grid>
                                                    );
                                                })}
                                            </Grid>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <YMaps
                                        query={{
                                            lang:"ru_RU",
                                            apikey:"6d2219fd-5118-4e09-bb69-e786ff23284a",
                                        }}
                                    >
                                        <Map
                                            defaultState={{
                                                center:[38.559772, 68.787038],
                                                zoom:11,
                                            }}
                                            options={{ minZoom:8 }}
                                            width="100%"
                                            height="300px"
                                            onClick={(map) => {
                                                handleGetGeoObject(map, setFieldValue);
                                            }}
                                            modules={[
                                                "templateLayoutFactory",
                                                "layout.ImageWithContent",
                                                "geocode",
                                                "geoObject.addon.balloon",
                                                "multiRouter.MultiRoute",
                                            ]}
                                            instanceRef={map}
                                        >
                                            {/*<SearchControl*/}
                                            {/*    options={{*/}
                                            {/*        float:"right",*/}
                                            {/*    }}*/}
                                            {/*/>*/}
                                            <Placemark
                                                geometry={[
                                                    values.location.latitude,
                                                    values.location.longitude,
                                                ]}
                                                options={{
                                                    iconColor:"#ff0000",
                                                }}
                                                //       properties={{
                                                //         hintContent: `
                                                // <div>
                                                //   <h6>Название: ${point?.name}</h6>
                                                //     <div>Адрес: ${point?.address}</div>
                                                //     <div>Тип: ${point?.type?.name}</div><br/>
                                                // </div>
                                                // `,
                                                //       }}
                                                modules={["geoObject.addon.hint"]}
                                            />
                                        </Map>
                                    </YMaps>
                                </Grid>
                                {/* </Grid> */}
                            </Grid>
                        </CardContent>
                        <CardActions
                            sx={{
                                flexWrap:"wrap",
                                m:-1,
                            }}
                        >
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                sx={{ m:1 }}
                                variant="contained"
                            >
                                {mode === "create" ? "Создать" : "Обновить"}
                            </Button>
                            <NextLink
                                href={`/dashboard/partners/${partnerId}/points`}
                                passHref
                            >
                                <Button
                                    component="a"
                                    disabled={isSubmitting}
                                    sx={{
                                        m:1,
                                        mr:"auto",
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
