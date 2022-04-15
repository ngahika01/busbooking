import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import NavBar from "../components/NavBar";

const AboutScreen = () => {
  return (
    <>
      <NavBar />
      <>
        <Box
          sx={{
            mt: {
              md: 10,
              xs: 5,
            },
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
            }}
            variant="h4"
            component="div"
          >
            Welcome to our about page
          </Typography>
          <Grid container spacing={2}>
            <Grid item sx={12}>
              <Typography sx={{
                  textAlign:"justify"
              }} variant="paragraph" component="div">
                This app is made for users to book for  bus trips from
                mombasa to Nairobi and vice versa. We have integrated mpesa
                online payment to save you the burden of paying. Cheers!
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </>
    </>
  );
};

export default AboutScreen;
