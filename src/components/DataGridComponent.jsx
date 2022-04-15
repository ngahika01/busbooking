import { Box, Button, Container, Paper, TableContainer, Typography } from "@mui/material";
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
      <>
        <Box
          style={{
            height: "100vh",
            width: "100%",
          }}
        >
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Button variant="contained" onClick={onClick} color="primary">
            {buttonTitle}
          </Button>
          {
            <TableContainer component={Paper}>
              <DataGrid
                style={{ height: "100vh" }}
                rows={rows}
                columns={columns}
                pageSize={7}
                getRowId={(row) => row._id}
                disableSelectionOnClick
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </TableContainer>
          }
        </Box>
      </>
    </>
  );
};

export default DataGridComponent;
