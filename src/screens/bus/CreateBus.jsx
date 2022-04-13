import React from "react";
import { useTheme } from "@emotion/react";
import {
  AppBar,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BUS_CREATE_RESET } from "../../constants/busConstants";
import InputComponent from "../../components/form/InputComponent";
import SubmitButton from "../../components/form/SubmitComponent";
import Form from "../../components/form/Form";
import NavBar from "../../components/NavBar";
import { CustomSelectComponent } from "../../components/form/CustomSelectComponent";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  seats: Yup.array().required("Seats is required"),
  numberPlate: Yup.string().required("Number Plate is required"),
});

const CreateBus = () => {
  const dispatch = useDispatch();

  const { palette } = useTheme();
  const navigate = useNavigate();

  const busCreate = useSelector((state) => state.busCreate);
  const { loading, error, success } = busCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [inindivualPrice, setIndividualPrice] = useState([]);
  const [multiInput, setMultiInput] = useState([
    { seatNumber: "", available: true },
  ]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/", { replace: true });
    }
    if (success) {
      dispatch({ type: BUS_CREATE_RESET });
      navigate("/buses");
      toast("Bus created successfully", {
        type: "success",
      });
    }
  }, [userInfo, dispatch, navigate, success]);

  const handleSubmit = async ({ name, status }) => {
    // dispatch(createStore(name, status));
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value  } = e.target;
    const inputList = [...multiInput];
    inputList[index][name] = value;
    setMultiInput(inputList);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (e, index) => {
    e.preventDefault();
    const inputList = [...multiInput];
    inputList.splice(index, 1);
    setMultiInput(inputList);
  };

  // handle click event of the Add button
  const handleAddClick = (e) => {
    e.preventDefault();
    setMultiInput([...multiInput, { seatNumber: "", available: true }]);
  };
  console.log(multiInput);
  return (
    <>
      <NavBar />
      <Box
        sx={{
          p: {
            md: 10,
            xs: 5,
          },
        }}
      >
        <Typography
          style={{
            textAlign: "center",
            mt: 10,
          }}
          variant="h4"
          component={"div"}
        >
          Create Bus
        </Typography>
        <Grid container spacing={3}>
          <Form
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            initialValues={{
              name: "",
              seats: "",
              numberPlate: "",
            }}
          >
            <Grid item xs={12}>
              <InputComponent label="name" />
            </Grid>
            <Grid item xs={12}>
              <InputComponent label="numberPlate" />
            </Grid>

            <>
              {multiInput.map((input, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <FormControl
                    sx={{
                      m: 3,
                    }}
                    fullWidth
                  >
                    <FormControl sx={{ mt: 2, mb: 2 }} fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Create Seat
                      </InputLabel>
                      <br />
                    </FormControl>
                    <FormControl sx={{ mb: 2, mt: 2 }} fullWidth>
                      <TextField
                        name="seatNumber"
                        label="seatNumber"
                        value={input.qty}
                        type="default"
                        required
                        onChange={(e) => {
                          handleInputChange(e, index);
                        }}
                      />
                    </FormControl>
                    <>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Available"
                        value={input.available}
                        name="available"
                        onChange={(e) => {
                          handleInputChange(e, index);
                        }}
                      />
                    </>

                    {index > 0 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => handleRemoveClick(e, index)}
                      >
                        Remove
                      </Button>
                    )}
                  </FormControl>
                </Grid>
              ))}

              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleAddClick(e)}
                >
                  Add
                </Button>
              </Grid>
            </>
            <Grid item xs={12}>
              <SubmitButton title={"Continue"} />
            </Grid>
          </Form>
        </Grid>
      </Box>
    </>
  );
};
export default CreateBus;
