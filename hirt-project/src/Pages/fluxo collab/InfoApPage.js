import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Constants/url";
import { useRequestData } from "../../Hooks/UseRequestData";
import styled from "styled-components";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import { goToCollabPage } from "../../Routes/RouteFunctions";
import { Header } from "../../Constants/Header";
import { device } from "../../Query"

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
  row-gap: 1rem;
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

    @media ${device.mobileS} {
        width: 90%;
        padding: 0.5rem;
        margin-left: 0.5rem;
        margin-top: 1rem;
    }

    @media ${device.mobileM} {
        padding: 1rem;
        column-gap: 2rem;
        margin: 0;
    }

    @media ${device.tablet} {
        width: 75%;
        margin-left: 2rem;
    } 

    @media ${device.laptop} {
        width: 60%;
        margin-top: 5%;
    }

    @media ${device.laptopL} {
        width: 50%;
        margin-top: 5%;
    }
    `

const CardAps = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);   
    align-items: center;

    @media ${device.mobileS} {
        width: 75%;
        column-gap: 1rem;
    }

    @media ${device.mobileM} {
        width: 60%;
        padding: 0;
        column-gap: 2rem;
    }


    @media ${device.tablet} {
        width: 85%;
        grid-template-columns: repeat(3, 1fr);  
        column-gap: 2rem; 
    } 
`

const CardCentraliza = styled.div`
    display: flex;
    justify-content: space-around;
`

export const InfoApPage = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [infos, loading, erro] = useRequestData(`${BASE_URL}/info/${id}`);

    const [obra_info] = useRequestData(`${BASE_URL}/obra`);

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
            <Header />
            <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToCollabPage(navigate)}>Voltar</Button>
            {!loading && erro && <p>Deu ruim!</p>}
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
            {!loading && obra_info && obra_info.length > 0 && generalList()}
        </ContainerGeral>
    )
};
