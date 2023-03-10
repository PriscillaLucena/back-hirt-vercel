import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToAdminPage, goToCollabPage, goToLoginPage } from "../Routes/RouteFunctions";

export const useProtectedPage = () => {
  const navigate = useNavigate();

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      goToLoginPage(navigate, role)
    }
    
  }, [navigate]);
};