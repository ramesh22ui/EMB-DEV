import React from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Auth from "./auth/Auth";
import ShellLayout from "./layout/ShellLayout";
import Login from "./pages/login";
import Home from "./pages/home";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateRoute from "./utils/PrivateRoute";
import About from "./pages/about";
import Service from "./pages/service";
import TopNavbar from "./pages/topNavbar";



const authLogin = new Auth();
const App = () => {
  const {isAuthenticated} = useAuth0();
  return (
   
    <Router>
       <TopNavbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/service"  element={ <PrivateRoute>  <Service /> </PrivateRoute> }
        />
      </Routes>
    </Router>
  );
};

export default App;
