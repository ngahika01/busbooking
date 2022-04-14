import { Box, Container, Typography } from "@mui/material";
import React from "react";
import NavBar from "../../components/NavBar";

const PaymentsScreen = () => {
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
          <Typography sx={{
              textAlign: "center",
          }} variant="h4">Payment</Typography>
          
      </Box>
    </>
  );
};

export default PaymentsScreen;
