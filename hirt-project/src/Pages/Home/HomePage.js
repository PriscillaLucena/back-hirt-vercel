import React from "react";
import logo from "../../images/logo.jpg";
import styled from "styled-components"
import { 
    // goToAdminPage, goToCollabPage, 
    goToLoginPage } from "../../Routes/RouteFunctions";
import { useNavigate } from "react-router-dom";

const ContainerGeral = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Image = styled.img`
    width: 20rem;
    height: auto; 
`

const ContainerButton = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 10rem;
    height: 7rem;   
`

function HomePage() {

    const navigate = useNavigate();

    return (
        <ContainerGeral>
            <Image src={logo} alt='logo' />
            <ContainerButton>
                <button onClick={()=>goToLoginPage(navigate, 1)}>Administrador</button>
                <button onClick={()=>goToLoginPage(navigate, 2)}>Colaborador</button>
            </ContainerButton>
        </ContainerGeral>
    )
}

export default HomePage;
