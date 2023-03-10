import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Constants/url";
import { useRequestObra } from "../../Hooks/UseRequestData";
import { goToDeletePage, goToInfoAdmPage, goToNewBuild } from "../../Routes/RouteFunctions";
import { Button } from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import '@fontsource/roboto/300.css';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { Header } from "../../Constants/Header";
import { ButtonsInCard, CardObras, ContainerGeral, ContainerGrid, ContainerText } from "../../Styled/StyledAdm/StyledAdm";
import {useProtectedPage} from "../../Hooks/useProtectedPage";

const AdminPage = () => {

    useProtectedPage();
    const navigate = useNavigate();
    const { type } = useParams();
    const [obras, loading, erro] = useRequestObra(`${BASE_URL}/construction/all`);
    const obs = obras ? obras : "carregando";

    console.log('obras', obras)

    const listaObras = obras && obras.map((obra) => {
        return <CardObras key={obra.id}>
            <ContainerText>
                <h4>Obra: {obra.nome_obra}</h4> <br />
                <h4>Responsável: {obra.responsavel}</h4>
            </ContainerText>
            <ButtonsInCard>
                {/* <DeleteRoundedIcon fontSize="large" sx={{ color: '#1D2854ff' }} onClick={() => goToDeletePage(navigate, obra.id)} /> */}
                <InfoRoundedIcon fontSize="large" sx={{ color: '#1D2854ff' }} onClick={() => goToInfoAdmPage(navigate, type, obra.id)} />
            </ButtonsInCard>
        </CardObras>
    });


    return (
        <ContainerGeral>
            <Header />
            <Button variant="contained" startIcon={<LibraryAddIcon />} onClick={() => goToNewBuild(navigate)}> Incluir Obra </Button>
            <ContainerGrid>
                {!loading && erro && <p>Deu ruim!</p>}
                {!loading && obras && obras.length > 0 && listaObras}
            </ContainerGrid>
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
        </ContainerGeral>
    )
}

export default AdminPage;