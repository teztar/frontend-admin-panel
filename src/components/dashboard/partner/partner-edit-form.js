import NextLink from "next/link";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FieldArray, Formik, getIn } from "formik";
import {
    Box,
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
import { createPartner, updatePartner } from "@services/index";
import ReactInputMask from "react-input-mask";

export const PartnerEditForm = (props) => {
    const { partner, mode = "edit", ...other } = props;

    const dispatch = useDispatch();

    const partnerPhones = partner?.phoneNumbers?.map((item) => {
        return {
            phoneNumber: item.substring(4),
        };
    });

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                id: partner?.id || "",
                brand: partner?.brand || "",
                companyTin: partner?.companyTin || "",
                directorName: partner?.directorName || "",
                email: partner?.email || "",
                passportSeries: partner?.passportSeries || "",
                phoneNumbers:
                    partnerPhones && partnerPhones.length > 0
                        ? partnerPhones
                        : [{ phoneNumber: "" }],
                region: partner?.region || "",
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                brand: Yup.string()
                    .max(255, "Слишком длинное название бренда")
                    .required("Поле «Название бренда» обязательно для заполнения"),
                companyTin: Yup.string()
                    .matches(/^[0-9]*$/, "Разрешены только цифры")
                    .max(9, "ИНН должен содержать не более 9 цифр"),
                directorName: Yup.string()
                    .max(255, "Слишком длинное имя директора")
                    .required("Поле «Имя директора» обязательно для заполнения"),
                email: Yup.string()
                    .email("Введите корректный адрес электронной почты")
                    .max(255, "Слишком длинный адрес электронной почты"),
                passportSeries: Yup.string()
                    .max(8, "Серия паспорта слишком длинная"),
                region: Yup.string()
                    .max(255, "Слишком длинное название региона")
                    .required("Поле «Регион» обязательно для заполнения"),
                phoneNumbers: Yup.array()
                    .of(
                        Yup.object().shape({
                            phoneNumber: Yup.string()
                                .matches(/^[0-9 ]*$/, "Некорректный формат номера")
                                .min(9, "Номер должен содержать не менее 9 цифр")
                                .max(12, "Слишком длинный номер телефона")
                                .required("Поле «Номер телефона» обязательно для заполнения"),
                        })
                    )
                    .min(1, "Необходимо указать как минимум один номер телефона"),
            })}
            onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting, resetForm }
            ) => {
                try {
                    const phonesWithPrefix = values.phoneNumbers.map(
                        (item) => "+992" + item?.phoneNumber?.replaceAll(" ", "")
                    );

                    const newValues = { ...values, phoneNumbers: phonesWithPrefix };

                    if (mode === "create") {
                        dispatch(
                            createPartner({ values: newValues, resetForm: resetForm })
                        );
                    } else {
                        dispatch(updatePartner(newValues));
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
                  isSubmitting,
                  touched,
                  values,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader
                            title={`${mode === "create" ? "Создать" : "Редактировать"} партнёра`}
                        />
                        <Divider/>
                        <CardContent>
                            <Grid container spacing={3}>
                                {/* Название бренда */}
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(touched.brand && errors.brand)}
                                        fullWidth
                                        helperText={touched.brand && errors.brand}
                                        label="Название бренда"
                                        name="brand"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.brand}
                                    />
                                </Grid>

                                {/* ИНН компании */}
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        error={Boolean(touched.companyTin && errors.companyTin)}
                                        helperText={touched.companyTin && errors.companyTin}
                                        label="ИНН компании"
                                        name="companyTin"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyTin}
                                        inputProps={{
                                            maxLength: 9,
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                        }}
                                    />
                                </Grid>

                                {/* Имя директора */}
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(touched.directorName && errors.directorName)}
                                        fullWidth
                                        helperText={touched.directorName && errors.directorName}
                                        label="Имя директора"
                                        name="directorName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.directorName}
                                    />
                                </Grid>

                                {/* Email */}
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(touched.email && errors.email)}
                                        fullWidth
                                        helperText={touched.email && errors.email}
                                        label="Адрес электронной почты"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                    />
                                </Grid>

                                {/* Серия паспорта */}
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.passportSeries && errors.passportSeries
                                        )}
                                        fullWidth
                                        helperText={touched.passportSeries && errors.passportSeries}
                                        label="Серия паспорта"
                                        name="passportSeries"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.passportSeries}
                                        inputProps={{ maxLength: 9 }}
                                    />
                                </Grid>

                                {/* Регион */}
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(touched.region && errors.region)}
                                        fullWidth
                                        helperText={touched.region && errors.region}
                                        label="Регион"
                                        name="region"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.region}
                                    />
                                </Grid>

                                {/* Номера телефонов */}
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
                                                                    onClick={() => push("")}
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
                            <NextLink href="/dashboard/partners" passHref>
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
