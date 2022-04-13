import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

const CheckBoxComponent = ({ name }) => {
  const { setFieldTouched, errors, touched, setFieldValue, values } =
    useFormikContext();

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              setFieldValue(name, e.target.checked);
            }}
            checked={values[name]}
            onBlur={() => setFieldTouched(name, true)}
          />
        }
        label={name}
      />

      {touched[name] && errors[name] && (
        <FormHelperText variant="outlined" error={true}>
          {" "}
          {errors[name]}{" "}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CheckBoxComponent;
