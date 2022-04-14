import * as React from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import { useFormikContext } from "formik";
import { FormControl, FormHelperText, Stack } from "@mui/material";

export default function CustomTimePicker({ label }) {
  const [value, setValue] = React.useState(null);
  const { setFieldTouched, errors, touched, setFieldValue, values } =
    useFormikContext();


  return (
    <FormControl fullWidth>
      <>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <TimePicker
            label={label}
            value={values[label]}
            onChange={(e) => setFieldValue(label, e)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {touched[label] && errors[label] && (
          <FormHelperText variant="outlined" error={true}>
            {errors[label]}
          </FormHelperText>
        )}
      </>
    </FormControl>
  );
}
