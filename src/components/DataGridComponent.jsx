import { Box, Button, Container, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbar,
} from "@mui/x-data-grid";
import React from "react";

const DataGridComponent = ({ title, buttonTitle, columns, rows, onClick }) => {
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        className={gridClasses.toolbarContainer}
      ></GridToolbarContainer>
    );
  }

  return (
    <>
      <Container
        sx={{
          pt: 10,
        }}
        style={{ height: "90vh" }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" component="h2">
            {title}
          </Typography>

          <Button variant="contained" onClick={onClick} color="primary">
            {buttonTitle}
          </Button>
        </Box>

        {
          <DataGrid
            style={{ height: "100%" }}
            rows={rows}
            columns={columns}
            pageSize={7}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
          />
        }
      </Container>
    </>
  );
};

export default DataGridComponent;
