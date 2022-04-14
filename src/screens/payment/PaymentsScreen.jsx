import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import { io } from "socket.io-client";
import { createPayment, updatePayment } from "../../actions/paymentActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const socket = io("http://localhost:5000");

const PaymentsScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [ld, setLd] = React.useState(false);
  const [feedback, setFeedback] = React.useState(null);
  const[id,setId] = React.useState(null)

  socket.on("querying", (data) => {
    setLd(true);
    setId(data.CheckoutRequestID);
  });

  socket.on("queried", (data) => {
    {
      setLd(false);
      setFeedback(data);

    }
  });
  console.log(feedback);

  const paymentUpdateToPaid  = useSelector((state) => state.paymentUpdateToPaid);
  const { loading, success } = paymentUpdateToPaid;

  const bookingSave = useSelector((state) => state.bookingSave);
  const { booking: bk } = bookingSave;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  React.useEffect(() => {
    if (feedback === "Request cancelled by user") {
      setFeedback(null);
      toast.error("Request cancelled by user");
      navigate("/home", {
        replace: true,
      });
    }
    if(feedback === "The service request is processed successfully"){
      dispatch(updatePayment(id))
    }

  }, [feedback, navigate, dispatch,id]);

  const handlePay = (e) => {
    e.preventDefault();
    dispatch(createPayment({
      booking: bk._id,
    }));
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          mt: {
            xs: 5,
            md: 10,
          },
        }}
      >
        {ld && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="h4"
        >
          Payment
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
              }}
            >
              <img
                src="https://hapakenya.com/wp-content/uploads/2019/06/lipa-na-mpesa-paybill-770x416.jpg"
                style={{
                  width: 300,
                  height: 300,
                  objectFit: "contain",
                }}
              />
              <Typography variant="h6" component="h2">
                Amount: {bk.price}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handlePay(e)}
              >
                Pay via mpesa
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PaymentsScreen;
