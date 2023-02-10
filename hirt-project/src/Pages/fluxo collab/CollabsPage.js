import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Constants/url";
import { useRequestData } from "../../Hooks/UseRequestData";
import { goToConcludedAp, goToInfoApPage } from "../../Routes/RouteFunctions";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CircularProgress from '@mui/material/CircularProgress';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Header } from "../../Constants/Header";
import { CardObras, ContainerButton, ContainerGeral, ContainerGrid, ContainerText } from "../../Styled/StyledCollab/StyledCollab";

export default function CollabsPage() {

    const navigate = useNavigate();

    const [obra_info, loading, erro] = useRequestData(`${BASE_URL}/obra`);

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
            <Header />
            <ContainerGrid>
                {!loading && erro && <p>Deu ruim!</p>}
                {!loading && obra_info && obra_info.length > 0 && listaObras}
            </ContainerGrid>
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
        </ContainerGeral>
    )
};