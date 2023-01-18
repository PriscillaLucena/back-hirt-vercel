import React from "react";
import logo from "../../images/logo.jpg";
import styled from "styled-components"
import {
    // goToAdminPage, goToCollabPage, 
    goToLoginPage
} from "../../Routes/RouteFunctions";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const ContainerGeral = styled.div`
  min-width: 100%;
  min-height: 96vh;
  background-size: cover;
  display: flex;
  align-items: center;
  background: #244372ff;
  justify-content: space-around;
`

const Image = styled.img`
    width: 20rem;
    height: auto; 
`

const ContainerCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 0.2rem solid #1C284Fff;
    border-radius: 1rem;
    padding: 2.5rem;
    gap: 0.5rem;
    background: white;
    align-items: center;
`

function HomePage() {

    const navigate = useNavigate();

    return (
        <ContainerGeral>
            <ContainerCard>
                <Image src={logo} alt='logo' />

                <Button variant="contained" onClick={() => goToLoginPage(navigate, 'ADMIN')}>Administrador</Button>
                <Button variant="contained" onClick={() => goToLoginPage(navigate, 'Collab')}>Colaborador</Button>

            </ContainerCard>
        </ContainerGeral>
    )
}

export default HomePage;
