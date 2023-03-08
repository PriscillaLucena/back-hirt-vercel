import { NavLink, useNavigate, useParams } from "react-router-dom";
import LoginForm from "./LoginForm";
import { Header } from "../../Constants/Header";
import { goToSignUpPage } from "../../Routes/RouteFunctions";
import { ContainerGeral } from "../../Styled/StyledLogin/StyledloginPage";
import useUnprotectedPage from "../../Hooks/useUnprotectedPage";

export default function LoginPage() {
    const { type } = useParams();
    useUnprotectedPage(type)
    const navigate = useNavigate();
    return (
        <ContainerGeral>
            <Header
                role={type}
            />
            <LoginForm
                
            /><br/>
            <NavLink  to={goToSignUpPage(navigate, type)}>Registrar-se</NavLink>
        </ContainerGeral>
    )
}