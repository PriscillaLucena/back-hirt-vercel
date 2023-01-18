import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { useRequestData } from "../Hooks/UseRequestData";
import { goToNewBuild } from "../Routes/RouteFunctions";
// import { goToLoginPage } from "../Routes/RouteFunctions";
import styled from "styled-components";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const ContainerGeral = styled.div`
  width: 100%;
  min-height: auto;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: #244372ff; */
  justify-content: space-around;
  
`

const ContainerGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rem;
`

const CardObras = styled.div`
    width: 90%;
    margin-top: 0.85rem;
    display: flex;
    flex-direction: column;
    border: 0.2rem solid #1C284Fff;
    border-radius: 1rem;
    padding: 2rem;
    background: white;
    align-items: center;
    background: #747C94ff;
    
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
            <Button variant="contained" startIcon={<DeleteIcon />}>DELETAR</Button><br />
            <Button variant="contained">Editar</Button>
        </CardObras>
    });

    // console.log(obras)

    return (
        <ContainerGeral>
            <h3>ADMIN PAGE</h3>
            <Button variant="contained" onClick={() => goToNewBuild(navigate)}> Incluir nova Obra </Button>
            <ContainerGrid>
                {listaObras}
            </ContainerGrid>
        </ContainerGeral>
    )
}

export default AdminPage;