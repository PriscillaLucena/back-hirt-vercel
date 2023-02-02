import React from "react";
import logo from "../../images/logo.jpg";
import styled from "styled-components"
import { goToLoginPage } from "../../Routes/RouteFunctions";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import { device } from "../../Query"

const ContainerGeral = styled.div`
  min-width: 100%;
  min-height: 96vh;
  background-size: cover;
  display: flex;
  align-items: center;
  background: white;
  justify-content: space-around;
  
`

const Image = styled.img`
    width: 70%;
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

    @media ${device.mobileS} {
        width: 70%;
    }

    @media ${device.tablet} {
        width: 70%;
    }

    @media ${device.laptop} {
        width: 40%;
    }
`
const ContainerButton = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
    align-items: center;
`

function HomePage() {

    const navigate = useNavigate();

    return (
        <ContainerGeral>
            <ContainerCard>
                <Image src={logo} alt='logo' />
                <ContainerButton>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button variant="contained" onClick={() => goToLoginPage(navigate, 'ADMINISTRADOR')}>Administrador</Button>
                    <Button variant="contained" onClick={() => goToLoginPage(navigate, 'COLABORADOR')}>Colaborador</Button>
                    <Button variant="contained" onClick={() => goToLoginPage(navigate, 'CLIENTE')}>Cliente</Button>
                    </ButtonGroup>
                </ContainerButton>
            </ContainerCard>
        </ContainerGeral>
    )
}

export default HomePage;
