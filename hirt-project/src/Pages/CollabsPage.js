import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { useRequestData } from "../Hooks/UseRequestData";
import { goToConcludedAp, goToInfoApPage } from "../Routes/RouteFunctions";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ContainerGeral = styled.div`
  width: 100%;
  min-height: auto;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: 'Roboto';  
`
const ContainerGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5rem;
`

const CardObras = styled.div`
    width: 90%;
    margin-top: 0.85rem;
    display: flex;
    flex-direction: column;
    border: 0.1rem dashed #1C284Fff;
    border-radius: 1rem;
    padding: 2rem;
    background: #F5FFFA;
    column-gap: 0.1rem;
    justify-content: space-around;
   `
const ContainerText = styled.div`
    display: flex;
    justify-content: center;
`

const ContainerButton = styled.div`
    display: flex;
    justify-content: space-around;
`

export default function CollabsPage() {

    const navigate = useNavigate();

    const [obra_info, loading, erro] = useRequestData(`${BASE_URL}/obra`);
    // let obra = !!obra_info ? obra_info : "carregando";

    const listaObras = obra_info && obra_info.map((obra) => {
        return <CardObras key={obra.id}>
            <ContainerText>
                <h3>{obra.nome_obra}</h3>
            </ContainerText>

            <ContainerButton>
                <InfoRoundedIcon fontSize="large" sx={{ color: '#1D2854ff' }} onClick={() => goToInfoApPage(navigate, obra.id)} />
                <AddCircleIcon fontSize="large" sx={{ color: '#1D2854ff' }} onClick={() => goToConcludedAp(navigate, obra.id)} />
            </ContainerButton>
        </CardObras>
    });

    return (
        <ContainerGeral>
            <p>Collab Page</p>

            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
            <ContainerGrid>
                {!loading && erro && <p>Deu ruim!</p>}
                {!loading && obra_info && obra_info.length > 0 && listaObras}
            </ContainerGrid>
        </ContainerGeral>
    )
}