import React from "react";
import logo from "../../images/logo.jpg";
import { goToLoginPage } from "../../Routes/RouteFunctions";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import { ContainerButton, ContainerCard, ContainerGeral, Image } from "../../Styled/StyledHome/StyledHome";

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
