import NextLink from "next/link";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "src/store";
import { createRole, getPermissions, updateRole } from "@services/index";
import { useEffect } from "react";

export const RoleEditForm = (props) => {
  const { role, mode = "edit", ...other } = props;

  const dispatch = useDispatch();

  const { permissions } = useSelector((state) => state.roles);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: role?.id || "",
      name: role?.name || "",
      permissions: role?.permissions || [""],
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255),
      permissions: Yup.array(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const permissionKeys = values.permissions.map((item) => item.key);
        const newValues = { ...values, permissions: permissionKeys };
        if (mode === "create") {
          dispatch(
            createRole({ values: newValues, resetForm: helpers.resetForm })
          );
        } else {
          dispatch(updateRole(newValues));
        }
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    dispatch(getPermissions());
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title={`${mode === "create" ? "Create" : "Edit"} role`} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Role name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                fullWidth
                multiple
                value={formik.values.permissions}
                options={permissions}
                onChange={(event, value) =>
                  formik.setFieldValue("permissions", value)
                }
                getOptionLabel={(option) => option.value || option.key}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Выбрать роль"
                    variant="outlined"
                  />
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
            disabled={formik.isSubmitting}
            type="submit"
            sx={{ m: 1 }}
            variant="contained"
          >
            {mode === "create" ? "Create" : "Update"}
          </Button>
          <NextLink href="/dashboard/roles" passHref>
            <Button
              component="a"
              disabled={formik.isSubmitting}
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
  );
};
