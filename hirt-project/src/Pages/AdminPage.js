import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { useRequestData } from "../Hooks/UseRequestData";
import { goToNewBuild } from "../Routes/RouteFunctions";
// import { goToLoginPage } from "../Routes/RouteFunctions";
import styled from "styled-components";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import '@fontsource/roboto/300.css';

const ContainerGeral = styled.div`
  width: 100%;
  min-height: auto;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: #244372ff; */
  justify-content: space-around;
  font-family: arial;
  
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
    border: 0.2rem dashed #1C284Fff;
    border-radius: 1rem;
    padding: 2rem;
    background: white;
    align-items: center;
    column-gap: 0.1rem;
    /* background: #747C94ff; */
`

const ButtonsInCard = styled.div`
    display: flex;
    row-gap: 0.15rem;
`


const AdminPage = () => {
    const [obras
        // loading, erro
    ] = useRequestData(`${BASE_URL}/obra`);
    const navigate = useNavigate()

    const listaObras = obras && obras.map((ap) => {

        return <CardObras>
            <p><strong>Obra:</strong> {ap.nome_obra}</p>
            <p><strong>Andares:</strong>{ap.qty_andares}</p> 
            <p><strong>Total de Apartamentos por andar:</strong> {ap.qty_ap_andar}</p>
            <p><strong>Andares:</strong>{ap.qty_andares}</p>
            <p><strong>Responsável: </strong>{ap.responsavel}</p>
            <ButtonsInCard>
            <Button variant="contained" startIcon={<DeleteIcon />}>DELETAR</Button><br />
            <Button variant="contained">Editar</Button>
            </ButtonsInCard>
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