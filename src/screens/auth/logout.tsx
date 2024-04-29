import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

const LogoutScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Cookies.remove("accessToken", { path: "/", domain: "localhost" });
    navigate("/login");
  }, [navigate]);
  return null;
};

export default LogoutScreen;
