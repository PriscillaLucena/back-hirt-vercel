import { useParams } from "react-router-dom";
import LoginForm from "./LoginForm";
// import { goToSignUpPage } from "../../Routes/RouteFunctions";
import styled from "styled-components";

const ContainerGeral = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function LoginPage (){
    const {type} = useParams()
    console.log(type)
    return(
        <ContainerGeral>
            <p>Login Page</p>
            <LoginForm 
            role = {type}
            />    
            <p>{type}</p>

            {/* <button onClick={()=>goToSignUpPage(navigate, type)}>Registrar-se</button> */}
        </ContainerGeral>
    )
}