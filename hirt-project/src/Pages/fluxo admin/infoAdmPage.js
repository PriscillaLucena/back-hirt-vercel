import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Constants/url";
import { useRequestData } from "../../Hooks/UseRequestData";
import styled from "styled-components";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import { goToAdminPage, goToDeleteApPage } from "../../Routes/RouteFunctions";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Header } from "../../Constants/Header";
import { device } from "../../Query"

const ContainerGeral = styled.div`
  width: 100%;
  min-height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto';
  row-gap: 1rem;
  `
const CardObras = styled.div`
    margin-top: 0.85rem;
    display: flex;
    flex-direction: column;
    border: 0.1rem dashed #1C284Fff;
    border-radius: 1rem;
    padding: 2rem;
    background: #F5FFFA;
    column-gap: 0.3rem;
    align-items: center;

    @media ${device.mobileS} {
        width: 90%;
        padding: 0.5rem;
        margin-left: 0.5rem;
        margin-top: 1rem;
    }

    @media ${device.mobileM} {
        width: 70%;
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

const CardApsgeral = styled.div`
    width: 80%;
    row-gap: 1rem;
    align-items: center;
    border: 0.1rem dashed #1C284Fff;
    border-radius: 1rem;
    padding: 2rem;
    background: #F5FFFA;
`

const CardAps = styled.div`
    width: 30%;
    row-gap: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);   
    align-items: center;
  

    @media ${device.mobileS} {
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.2rem;
        column-gap: 0.5rem;
    }

    @media ${device.mobileM} {
        width: 80%;
    }


    @media ${device.tablet} {
        width: 85%;
        padding: 2rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);  
        column-gap: 2rem; 
    } 
`

const CardCentraliza = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const InfoAdmPage = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [infos, loading, erro] = useRequestData(`${BASE_URL}/info/${id}`);

    const [obra_info] = useRequestData(`${BASE_URL}/obra`);

    let total = "";
    let apConcluded = [];
    let apConcluded2 = [];

    const listaObra = obra_info && obra_info.map((info) => {
        if (info.id === `${id}`) {
            return <CardCentraliza>
                <CardObras key={info.id}>
                    <h4>{info.nome_obra}</h4>
                    <p><strong>Total de andares:</strong> {info.qty_andares}</p>
                    <p><strong>Apartamentos por andar:</strong> {info.qty_ap_andar}</p>
                    <p><strong>Total de apartamentos:</strong> {total = info.qty_total_ap}</p>
                </CardObras>
            </CardCentraliza>
        }
    });

    const funcPorcent = (ap) => {
        apConcluded2 = [...apConcluded, ap]
        apConcluded = apConcluded2
    };

    const ListInfos = infos && infos.map((info) => {
        return <CardApsgeral key={info.apartamentos.id}>
            <h4>Apartamento: {info.apartamentos.numero_ap}</h4>
            <p>Andar: {info.apartamentos.andar}</p>
            <p>Numero: {info.apartamentos.numero_ap}</p>
            <p>Limpeza: {info.apartamentos.limpeza_completa === 1 ? (funcPorcent(info.apartamentos.limpeza_completa))
                && ("Concluída") : "Pendente"}</p>
            {info.apartamentos.data ? <p>Data da limpeza: {info.apartamentos.data}</p> : ""}
            <DeleteRoundedIcon fontSize="large" sx={{ color: '#1D2854ff' }} onClick={() => goToDeleteApPage(navigate, info.apartamentos.id)} />
        </CardApsgeral>
    });

    console.log('infos', infos)

    const generalList = () => {
        return <div>
            {listaObra}
            <CardCentraliza>
                <p><strong>Faltam {total - apConcluded.length} apartamentos para concluir a obra</strong></p>
            </CardCentraliza>
            {ListInfos.length > 0 ? <CardAps>{ListInfos}</CardAps> :
                <h3>Ainda não foram adicionados apartamentos nesta obra!</h3>}
            <CardCentraliza>
                <p><strong>Média de aproveitamento semanal:</strong> {((apConcluded.length / total) / 7 * 100).toFixed(1)}%</p>
                <p><strong>Média de aproveitamento mensal:</strong> {((apConcluded.length / total) / 30 * 100).toFixed(1)}%</p>
            </CardCentraliza>
        </div>
    };

    return (
        <ContainerGeral>
            <Header />
            <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToAdminPage(navigate)}>Voltar</Button>
            {!loading && erro && <p>Deu ruim!</p>}
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
            {!loading && obra_info && obra_info.length > 0 && generalList()}

        </ContainerGeral>
    )
};
