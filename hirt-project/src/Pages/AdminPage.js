import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { useRequestData } from "../Hooks/UseRequestData";
import { goToNewBuild } from "../Routes/RouteFunctions";
// import { goToLoginPage } from "../Routes/RouteFunctions";
import styled from "styled-components";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const ContainerGeral = styled.div`
`
const CardObras = styled.div`
    width: 50%;
    height:auto;
    border: 0.25rem solid;
    border-color: #1C284Fff;
    border-radius: 10px;
    margin: 1rem;
    padding: 1rem;
    
    .button{
        
    }
`


const AdminPage = () => {
    const [obras
        // loading, erro
    ] = useRequestData(`${BASE_URL}/obra`);
    const navigate = useNavigate()

    const listaObras = obras && obras.map((ap) => {

        return <CardObras>
            <h3>Obra: {ap.nome_obra}</h3>
            <h4>Andares: {ap.qty_andares}</h4>
            <h4>Total de Apartamentos por andar: {ap.qty_ap_andar}</h4>
            <h4>Andares: {ap.qty_andares * ap.qty_ap_andar}</h4>
            <h4>Responsável: {ap.responsavel}</h4>
            <Button variant="contained" startIcon={<DeleteIcon />}>DELETAR</Button>
            <Button variant="contained">Editar</Button>
        </CardObras>
    });

    // console.log(obras)

    return (
        <ContainerGeral>
            <h3>ADMIN PAGE</h3>
            <Button variant="contained" onClick={() => goToNewBuild(navigate)}> Incluir nova Obra </Button>
            <p>{listaObras}</p>
        </ContainerGeral>
    )
}

export default AdminPage;