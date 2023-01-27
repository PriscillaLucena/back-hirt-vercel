import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { useRequestData } from "../Hooks/UseRequestData";
import styled from "styled-components";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import { goToAdminPage } from "../Routes/RouteFunctions";

const ContainerGeral = styled.div`
  width: 100%;
  min-height: auto;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  align-items: center;
  font-family: 'Roboto';
  `
const CardObras = styled.div`
    width: 65%;
    margin-top: 0.85rem;
    display: flex;
    flex-direction: column;
    border: 0.1rem dashed #1C284Fff;
    border-radius: 1rem;
    padding: 2rem;
    background: #F5FFFA;
    column-gap: 0.1rem;
    margin: 2rem;
    `

const CardAps = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);   
    align-items: center;
`

const CardCentraliza = styled.div`
    display: flex;
    justify-content: space-around;
`

export const InfoApPage = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [infos, loading, erro] = useRequestData(`${BASE_URL}/info/${id}`);
    // const inf = !!infos ? infos : "carregando"

    const [obra_info] = useRequestData(`${BASE_URL}/obra`);
    // let obra = !!obra_info ? obra_info : "carregando";

    console.log("infos", infos)
    console.log("obra_info", obra_info)

    let total = "";
    let apConcluded = "";

    const listaObra = obra_info && obra_info.map((info) => {
        if (info.id === `${id}`) {
            return <CardObras>
                <h4>{info.nome_obra}</h4>
                <p><strong>Total de andares:</strong> {info.qty_andares}</p>
                <p><strong>Apartamentos por andar:</strong> {info.qty_ap_andar}</p>
                <p><strong>Total de apartamentos:</strong> {total = info.qty_total_ap}</p>
            </CardObras>
        }
    });


    const ListInfos = infos && infos.map((info) => {
        return <CardObras>
            <h4>Apartamento:</h4>
            <p>Andar: {info.apartamentos.andar}</p>
            <p>Numero: {info.apartamentos.numero_ap}</p>
            <p>Limpeza: {info.apartamentos.limpeza_completa === 1 ? (apConcluded = info.apartamentos.limpeza_completa)
                && ("Concluída") : "Pendente"}</p>
            {info.apartamentos.data ? <p>Data da limpeza: {info.apartamentos.data}</p> : ""}
        </CardObras>
    });
    // console.log("apConcluded", apConcluded)

    const generalList = () => {
        return <div>
            {listaObra}
            <CardCentraliza>
                <p><strong>Faltam {total - apConcluded} apartamentos para concluir a obra</strong></p>
            </CardCentraliza>
            {ListInfos.length > 0 ? <CardAps>{ListInfos}</CardAps> :
                <h3>Ainda não foram adicionados apartamentos nesta obra!</h3>}
        </div>
    };

    return (
        <ContainerGeral>
            <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToAdminPage(navigate)}>Voltar</Button>
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
            {!loading && erro && <p>Deu ruim!</p>}
            {!loading && obra_info && obra_info.length > 0 && generalList()}
        </ContainerGeral>
    )
};
