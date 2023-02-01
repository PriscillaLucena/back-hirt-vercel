import { NavLink, useNavigate, useParams } from "react-router-dom";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { Header } from "../../Constants/Header";
import { goToSignUpPage } from "../../Routes/RouteFunctions";
import logo from "../../images/logo.jpg";
import { device } from "../../Query"

const ContainerGeral = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
`

const Image = styled.img`
    width: 30%;
    height: auto;  
    align-items: center;

    @media ${device.laptop} {
        width: 15%;
    }
`


export default function LoginPage() {
    const { type } = useParams();
    const navigate = useNavigate();
    return (
        <ContainerGeral>
            <Header
                role={type}
            />
            <Image src={logo} alt='logo' />
            <LoginForm
                role={type}
            /><br/>
            <NavLink  to={goToSignUpPage(navigate, type)}>Registrar-se</NavLink>
        </ContainerGeral>
    )
}