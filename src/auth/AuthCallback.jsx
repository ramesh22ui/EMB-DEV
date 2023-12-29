import React, { useEffect, useState } from "react";
import auth from "./Auth";
import ApiSession from "../api/ApiSession";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        await auth.handleAuthentication();

        const apiSession = new ApiSession();
        const response = await apiSession.getScope();

        const scopeList = {
          role: response.role,
          name: response.name,
          access: response.scope.reduce((acc, scopeData) => {
            acc[scopeData] = true;
            return acc;
          }, {}),
        };

        localStorage.setItem("scope", JSON.stringify(scopeList));
        navigate(response.firstLogin ? "/TermsAndConditions" : "/home");
      } catch (error) {
        console.error("Authentication error:", error);

        if (error.response !== undefined) {
          navigate(error.response.status === 404 ? "/nonregistred" : "/");
        } else {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    handleAuth();
  }, [navigate]);

  return <>{loading ? "Loading.....!" : null}</>;
};

export default AuthCallback;
