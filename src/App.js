import React from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Auth from "./auth/Auth";
import ShellLayout from "./layout/ShellLayout";
import Login from "./pages/login";
import home from "./pages/home";

const authLogin = new Auth();





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
