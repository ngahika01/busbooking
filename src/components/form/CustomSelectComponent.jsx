import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormikContext } from "formik";
import { Autocomplete, FormHelperText, TextField } from "@mui/material";
export const CustomSelectComponent = ({ name, item }) => {
  const { setFieldTouched, errors, touched, setFieldValue, values } =
    useFormikContext();

  return (
    <>
      <FormControl sx={{ mt: 2, mb: 2 }} fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>

        <Select
          onBlur={() => setFieldTouched(name)}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values[name]}
          label={name}
          onChange={(e) => setFieldValue(name, e.target.value)}
          className="form-note-control-selection"
          error={touched[name] && !!errors[name]}
        >
          {item &&
            item.map((itm) => (
              <MenuItem
                selected
                value={
                  itm._id ||
                  itm.value ||
                  itm.id ||
                  itm.firstName + " " + itm.lastName
                }
              >
                {itm.name ||
                  itm.item ||
                  itm.givenName ||
                  itm.title ||
                  itm.label ||
                  itm.firstName + " " + itm.lastName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {touched[name] && errors[name] && (
        <FormHelperText variant="outlined" error={true}>
          {" "}
          {errors[name]}{" "}
        </FormHelperText>
      )}
    </>
  );
};
