import React from "react";
import { Route, Redirect, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({children}) =>{
const {isAuthenticate} = useAuth0();
  return isAuthenticate ? <>{children}</> : <Navigate to="/login" />;
}
export default PrivateRoute;