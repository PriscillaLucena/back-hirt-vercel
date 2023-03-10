import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Constants/url";
import { useRequestData } from "../../Hooks/UseRequestData";
import {  goToInfoPage } from "../../Routes/RouteFunctions";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import '@fontsource/roboto/300.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Header } from "../../Constants/Header";
import {useProtectedPage} from "../../Hooks/useProtectedPage";
import {CardObras, ContainerText, ButtonsInCard, ContainerGeral, ContainerGrid} from "../../Styled/StyledClient/StyledClient"


export const ClientPage = () => {
    
    useProtectedPage();
    const navigate = useNavigate();
    const {type} = useParams();
    const [obras, loading, erro] = useRequestData(`${BASE_URL}/obra`);
    
    const listaObras = obras && obras.map((obra) => {
        return <CardObras key={obra.id}>
            <ContainerText>
                <h4>Obra: {obra.nome_obra}</h4> <br />
                <h4>Responsável: {obra.responsavel}</h4>
            </ContainerText>
            <ButtonsInCard>
                <InfoRoundedIcon fontSize="large" sx={{ color: '#1D2854ff' }} onClick={() => goToInfoPage(navigate, type, obra.id)} />
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
