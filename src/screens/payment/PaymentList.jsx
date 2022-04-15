import { Typography } from "@mui/material";
import React from "react";
import NavBar from "../../components/NavBar";

const PaymentList = () => {
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
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="h4"
        >
          Payment Recept
        </Typography>
      </Box>
    </>
  );
};

export default PaymentList;
