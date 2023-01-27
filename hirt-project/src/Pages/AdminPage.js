import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { useRequestData } from "../Hooks/UseRequestData";
import { goToConcludedAp, goToDeletePage, goToInfoApPage, goToNewBuild } from "../Routes/RouteFunctions";
import styled from "styled-components";
import { Button } from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import '@fontsource/roboto/300.css';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';

const ContainerGeral = styled.div`
  margin: 2rem;
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
    margin: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
`

const ContainerText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ButtonsInCard = styled.div`
    display: flex;
    justify-content: space-evenly;
    cursor: pointer;
`

const AdminPage = () => {
    const [obras, loading, erro] = useRequestData(`${BASE_URL}/obra`);
    
    const navigate = useNavigate();

        const listaObras = obras && obras.map((ap) => {
        return <CardObras key={ap.id}>
            <ContainerText>
                <h3>Obra: {ap.nome_obra}</h3> <br />
                <h3>Responsável: {ap.responsavel}</h3>
            </ContainerText>
            <ButtonsInCard>
                <DeleteRoundedIcon fontSize="large" sx={{ color: '#1D2854ff' }} onClick={()=>goToDeletePage(navigate, ap.id)} />
                <InfoRoundedIcon fontSize="large" sx={{ color: '#1D2854ff' }} onClick={() => goToInfoApPage(navigate, ap.id)} />
                <EditIcon fontSize="large" sx={{ color: '#1D2854ff' }} onClick={() => goToConcludedAp(navigate)} />
            </ButtonsInCard>
        </CardObras>
    });

    return (
        <ContainerGeral>
            <Button variant="contained" startIcon={<LibraryAddIcon />} onClick={() => goToNewBuild(navigate)}> Incluir Obra </Button>
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
            <ContainerGrid>
                {!loading && erro && <p>Deu ruim!</p>}
                {!loading && obras && obras.length > 0 && listaObras}
            </ContainerGrid>
        </ContainerGeral>
    )
}

export default AdminPage;