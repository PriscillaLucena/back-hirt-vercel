import { useParams } from "react-router-dom";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { Header } from "../../Constants/Header";
import AdminPage from "../fluxo admin/AdminPage";

const ContainerGeral = styled.div`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
`

export default function LoginPage() {
    const { type } = useParams()

    return (
        <ContainerGeral>
            <Header
                role={type}
            />
            <LoginForm
                role={type}
            />

            {/* <p>{type}</p> */}

            {/* <button onClick={()=>goToSignUpPage(navigate, type)}>Registrar-se</button> */}
        </ContainerGeral>
    )
}