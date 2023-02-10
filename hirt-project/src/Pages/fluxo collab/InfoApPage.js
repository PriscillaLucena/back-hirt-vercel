import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Constants/url";
import { useRequestData } from "../../Hooks/UseRequestData";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import { goToCollabPage } from "../../Routes/RouteFunctions";
import { Header } from "../../Constants/Header";
import { CardAps, CardApsgeral, CardCentraliza, CardObras, ContainerGeral, ContainerPorcentagem, Linha } from "../../Styled/StyledCollab/StyledInfoAp";

export const InfoApPage = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [infos, loading, erro] = useRequestData(`${BASE_URL}/info/${id}`);

    const [obra_info] = useRequestData(`${BASE_URL}/obra`);

    let total = "";

    let apLimpGrossa = [];
    let apLimpGrossa2 = [];

    let apLimpFina = [];
    let apLimpFina2 = [];

    let apConcluded = [];
    let apConcluded2 = [];

    const listaObra = obra_info && obra_info.map((info) => {
      if (info.id === `${id}`) {
            return <CardCentraliza>
                <CardObras>
                    <h4>{info.nome_obra}</h4>
                    <p><strong>Total de andares:</strong> {info.qty_andares}</p>
                    <p><strong>Apartamentos por andar:</strong> {info.qty_ap_andar}</p>
                    <p><strong>Total de apartamentos:</strong> {total = info.qty_total_ap}</p>
                </CardObras>
            </CardCentraliza>
        }
    });

    const funcLimpeza = (limpeza_completa) => {
        if (limpeza_completa === 1) {
            apLimpGrossa2 = [...apLimpGrossa, limpeza_completa]
            apLimpGrossa = apLimpGrossa2
            return "Fina"
        } else if (limpeza_completa === 2) {
            apLimpFina2 = [...apLimpFina, limpeza_completa]
            apLimpFina = apLimpFina2
            return "Grossa"
        } else if (limpeza_completa === 3) {
            apConcluded2 = [...apConcluded, limpeza_completa]
            apConcluded = apConcluded2
            return "Entrega"
        } else {
            return "Pendente"
        }
    };

    const ListInfos = infos && infos.map((info) => {
        return <CardApsgeral key={info.apartamentos.id}>
            <h4>Apartamento: {info.apartamentos.numero_ap}</h4>
            <p>Andar: {info.apartamentos.andar}</p>
            <p>Limpeza: {funcLimpeza(info.apartamentos.limpeza_completa)}</p>
            <p>Data da limpeza: {info.apartamentos.data}</p>
        </CardApsgeral>
    });

    const generalList = () => {
        return <div>
            <Linha></Linha>
            {listaObra}
            <CardCentraliza>
                <p><strong>Faltam {total - apConcluded.length} apartamentos para concluir a obra</strong></p>
                <Linha></Linha>
            </CardCentraliza>
            {ListInfos.length > 0 ? <CardAps>{ListInfos}</CardAps> :
                <h3>Ainda não foram adicionados apartamentos nesta obra!</h3>}
            <CardCentraliza>
                <Linha></Linha>
                <ContainerPorcentagem>
                    <p><strong>Limpeza fina:</strong> {((apLimpFina.length / total) * 100).toFixed(1)}%</p>
                    <p><strong>Limpeza Grossa:</strong> {((apLimpGrossa.length / total) * 100).toFixed(1)}%</p>
                    <p><strong>Entrega:</strong> {((apConcluded.length / total) * 100).toFixed(1)}%</p>
                </ContainerPorcentagem>
                <Linha></Linha>
                <ContainerPorcentagem>
                    <p><strong>Média de aproveitamento semanal:</strong> {((apConcluded.length / total) / 7 * 100).toFixed(1)}%</p>
                    <p><strong>Média de aproveitamento mensal:</strong> {((apConcluded.length / total) / 30 * 100).toFixed(1)}%</p>
                </ContainerPorcentagem>
                <Linha></Linha>
            </CardCentraliza>
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
