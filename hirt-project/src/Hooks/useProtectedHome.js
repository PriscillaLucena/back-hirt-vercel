import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToAdminPage, goToCollabPage, goToLoginPage } from "../Routes/RouteFunctions";

export const useProtectedHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      goToLoginPage(navigate, role)
    }
    else if(role === 'admin'){
      goToAdminPage(navigate, role)
    }
    else if(role === 'collab'){
      const id = localStorage.getItem("id");
      goToCollabPage(navigate, role, id)
    }
  }, [navigate]);
};