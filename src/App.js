import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
