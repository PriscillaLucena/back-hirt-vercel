import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants/url";
import { useRequestData } from "../../Hooks/UseRequestData";
import { goToInfoclientPage } from "../../Routes/RouteFunctions";
import styled from "styled-components";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import '@fontsource/roboto/300.css';
import CircularProgress from '@mui/material/CircularProgress';
import { device } from "../../Query"
import { Header } from "../../Constants/Header";

const ContainerGeral = styled.div`
  width: 100%;
  min-height: auto;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: 'Roboto';
  position: absolute;
  `

const ContainerGrid = styled.div`
    margin: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rem;

    @media ${device.mobileS} {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin: 0rem;
    }

    @media ${device.tablet} {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    @media ${device.laptop} {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
`

const CardObras = styled.div`
    width: 90%;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    border: 0.1rem solid #c1c1c3 ;
    border-bottom: hidden;
    border-left: hidden;
    border-top: hidden;
    padding: 2rem;
    background: #F5FFFA;

    @media ${device.mobileS} {
        padding: 1rem;
    }

    @media ${device.laptop} {
       width: 80%;
    }
`

const ContainerText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ButtonsInCard = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
`

export const ClientPage = () => {
    const [obras, loading, erro] = useRequestData(`${BASE_URL}/obra`);

    const navigate = useNavigate();

    const listaObras = obras && obras.map((obra) => {
        return <CardObras key={obra.id}>
            <ContainerText>
                <h4>Obra: {obra.nome_obra}</h4> <br />
                <h4>Responsável: {obra.responsavel}</h4>
            </ContainerText>
            <ButtonsInCard>
                <InfoRoundedIcon fontSize="large" sx={{ color: '#1D2854ff' }} onClick={() => goToInfoclientPage(navigate, obra.id)} />
            </ButtonsInCard>
        </CardObras>
    });

    return (
        <ContainerGeral>
            <Header />
            <ContainerGrid>
                {!loading && erro && <p>Deu ruim!</p>}
                {!loading && obras && obras.length > 0 && listaObras}
            </ContainerGrid>
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
        </ContainerGeral>
    )
};
