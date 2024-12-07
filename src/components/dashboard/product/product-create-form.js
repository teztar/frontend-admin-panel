import { Fragment, useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { FieldArray, Formik, getIn } from "formik";
import * as Yup from "yup";
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
        dispatch(
            getProductCategories({
                page: 1,
                perPage: 100,
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (webImage) {
            setWebImageUrl(URL.createObjectURL(webImage));
        }
    }, [webImage]);

    console.log("объемы: ", volumesArr);
    console.log("объем: ", product?.volumes);

    return (
        <Formik
            enableReinitialize={mode === "edit" ? true : false}
            initialValues={{
                id: mode === "edit" ? product?.id : null,
                pointId: mode === "create" ? pointId : null,
                name: product?.name || "",
                categories:
                    product?.categories?.map((category) => ({
                        id: category.category.id,
                        name: category.category.name,
                    })) || [],
                description: product?.description || "",
                ingredients: product?.ingredients || "",
                volumes:
                    product?.volumes?.length > 0
                        ? product.volumes.map((volume) => ({
                            price: volume.price,
                            volume: volume.volume,
                            measuring: volume.measuring,
                            maxQuantityInOneOrder: volume.maxQuantityInOneOrder,
                        }))
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
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .max(255, "Название слишком длинное")
                    .required("Название обязательно"),
                description: Yup.string()
                    .max(500, "Описание слишком длинное")
                    .required("Описание обязательно"),
                ingredients: Yup.string().max(500, "Ингредиенты слишком длинные"),
                categories: Yup.array()
                    .of(
                        Yup.object().shape({
                            id: Yup.string().required(),
                            name: Yup.string().required(),
                        })
                    )
                    .min(1, "Необходимо выбрать хотя бы одну категорию")
                    .required("Категории обязательны"),
                volumes: Yup.array()
                    .of(
                        Yup.object().shape({
                            price: Yup.number()
                                .typeError("Цена должна быть числом")
                                .positive("Цена должна быть больше 0")
                                .required("Цена обязательна"),
                            volume: Yup.string().required("Объем обязателен"),
                            measuring: Yup.string().required("Единица измерения обязательна"),
                            maxQuantityInOneOrder: Yup.number()
                                .typeError("Максимальное количество должно быть числом")
                                .positive("Максимальное количество должно быть больше 0")
                                .required("Максимальное количество в одном заказе обязательно"),
                        })
                    )
                    .min(1, "Необходимо добавить хотя бы один объем")
                    .required("Объемы обязательны"),
            })}
            onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting, resetForm }
            ) => {
                try {
                    const newValues = {
                        ...values,
                        categoriesId: values.categories.map((item) => item.id),
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
                                type: "image/png",
                                lastModified: new Date(),
                            })
                        );
                    }

                    if (mode === "create") {
                        dispatch(
                            createProduct({
                                payload: formData,
                                requestDigest: payload,
                                resetForm,
                            })
                        );
                    } else {
                        dispatch(
                            updateProduct({
                                payload: formData,
                                requestDigest: payload,
                            })
                        );
                    }
                    setStatus({ success: true });
                    setSubmitting(false);
                } catch (err) {
                    console.error(err);
                    toast.error("Что-то пошло не так!");
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
                            title={`${mode === "create" ? "Создать" : "Редактировать"} продукт`}
                        />
                        <Divider />
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
                                        required
                                        value={values.description}
                                    />
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        error={Boolean(touched.ingredients && errors.ingredients)}
                                        helperText={touched.ingredients && errors.ingredients}
                                        label="Ингредиенты"
                                        name="ingredients"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.ingredients}
                                    />
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="multiple-checkbox-label">
                                            Категории
                                        </InputLabel>
                                        <Select
                                            required
                                            labelId="multiple-checkbox-label"
                                            id="multiple-checkbox"
                                            multiple
                                            value={values.categories}
                                            onChange={(event) =>
                                                setFieldValue("categories", event.target.value)
                                            }
                                            input={<OutlinedInput label="Категории" />}
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
                                                                    label="Цена"
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
                                                                    label="Единица измерения"
                                                                    name={measuring}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    required
                                                                    value={p?.measuring}
                                                                />
                                                            </Grid>

                                                            <Grid item md={6} xs={12}>
                                                                <FormControl fullWidth>
                                                                    <InputLabel id="volume-label">
                                                                        Объемы
                                                                    </InputLabel>
                                                                    <Select
                                                                        labelId="volume-label"
                                                                        value={
                                                                            volumesArr.find(
                                                                                (volumeOption) =>
                                                                                    volumeOption.key === p.volume
                                                                            )?.value || ""
                                                                        }
                                                                        label="Объемы"
                                                                        name={volume}
                                                                        onChange={(e) => {
                                                                            const selectedValue = e.target.value;
                                                                            const selectedVolume = volumesArr.find(
                                                                                (volumeOption) =>
                                                                                    volumeOption.value === selectedValue
                                                                            );
                                                                            setFieldValue(
                                                                                `volumes[${index}].volume`,
                                                                                selectedVolume?.key
                                                                            );
                                                                        }}
                                                                    >
                                                                        {volumesArr.map((volumeOption) => (
                                                                            <MenuItem
                                                                                key={volumeOption.key}
                                                                                value={volumeOption.value}
                                                                            >
                                                                                {volumeOption.value}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </Grid>
                                                            <Grid item md={6} xs={12}>
                                                                <TextField
                                                                    type="number"
                                                                    required
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
                                                                    label="Максимальное количество в одном заказе"
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
                                                                            onClick={() =>
                                                                                push({
                                                                                    price: "",
                                                                                    volume: "",
                                                                                    measuring: "",
                                                                                    maxQuantityInOneOrder: "",
                                                                                })
                                                                            }
                                                                        >
                                                                            Добавить
                                                                        </Button>
                                                                    )}
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
                                        Веб-изображение
                                    </Button>
                                    {webImageUrl && webImage && (
                                        <Box mt={3}>
                                            <img
                                                src={webImageUrl}
                                                style={{
                                                    width: 250,
                                                    height: 250,
                                                }}
                                                alt="Веб-изображение"
                                            />
                                        </Box>
                                    )}
                                </Grid>
                                {!webImageUrl && values.image && (
                                    <Grid item xs={12}>
                                        <img
                                            src={values.image}
                                            alt="Веб-изображение"
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
