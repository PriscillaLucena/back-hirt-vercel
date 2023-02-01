import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { goToLoginPage } from "../Routes/RouteFunctions";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
    const navigate = useNavigate();
    return(
    <div>
<p>Sign up Page</p>
<Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToLoginPage(navigate)}>Voltar</Button>
    </div>
    )
};