import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { useRequestData, useRequestObra } from "../Hooks/UseRequestData";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import { goToAdminPage } from "../Routes/RouteFunctions";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Header } from "../Constants/Header";
import { CardAps, CardApsgeral, CardCentraliza, CardObras, ContainerGeral, ContainerPorcentagem, Linha } from "../Styled/StyledAdm/StyledInfoAdm";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { useProtectedPage } from "../Hooks/useProtetedPage";
import useForm from "../Hooks/useForm";

export const InfoAdmPage = () => {

    useProtectedPage();
    const navigate = useNavigate();
    const { type, obra_id } = useParams();
    const [infos, loading, erro] = useRequestData(`${BASE_URL}/construction/info/${obra_id}`);
    const inf = !!infos ? infos : "carregando"
    const info = inf
    const [toggleNomeObra, setToggleNomeObra] = useState(false);
    const [toggleAndar, setToggleAndar] = useState(false);
    const [toggleApAndar, setToggleApAndar] = useState(false);
    const [toggleResponsavel, setToggleResponsavel] = useState(false);
    // console.log('info', infos.qty_andares)
    // console.log('obra_id', obra_id)

    const [form, handleInputChange] = useForm({
        nome_obra: "", qty_andares: "", qty_ap_andar: "", responsavel: ""
    });

    let total = '';
    let apLimpGrossa = [];
    let apLimpFina = [];
    let apConcluded = [];
    let apConcluded2 = [];
    let apLimpFina2 = [];
    let apLimpGrossa2 = [];

    const funcLimpeza = (limpeza_completa) => {
        if (limpeza_completa === 1) {
            apLimpGrossa2 = [...apLimpGrossa, limpeza_completa]
            apLimpGrossa = apLimpGrossa2
            return "Limpeza Grossa"
        } else if (limpeza_completa === 2) {
            apLimpFina2 = [...apLimpFina, limpeza_completa]
            apLimpFina = apLimpFina2
            return "Limpeza Fina"
        } else if (limpeza_completa === 3) {
            apConcluded2 = [...apConcluded, limpeza_completa]
            apConcluded = apConcluded2
            return "Pronto para Entrega"
        }
    };



    const editInput = (nome) => {
        return <TextField fullWidth required
            id="outlined-required"
            type={'text'}
            name={nome}
            onChange={handleInputChange}
            value={form.nome}
        />
    }

    const setaNomeobra = () => {
        setToggleNomeObra(!toggleNomeObra)
    };

    const setaAndar = () => {
        setToggleAndar(!toggleAndar)
    };

    const setaApAndar = () => {
        setToggleApAndar(!toggleApAndar)
    };

    const setaResponsavel = () => {
        setToggleResponsavel(!toggleResponsavel)
    }

    const listaObra = () => {
        return <CardCentraliza>
            <CardObras>
                {/* <form onClick={sendForm(obra_id)}> */}
                <h4>{info.nome_obra} <span>
                        <EditIcon fontSize="small" sx={{ color: '#1D2854ff' }} onClick={() => setaNomeobra()} />
                        {toggleNomeObra ? editInput("nome_obra") : ""}</span>
                    </h4>
                <p><strong>Total de andares:</strong> {info.qty_andares}<span>
                    <EditIcon fontSize="small" sx={{ color: '#1D2854ff' }} onClick={() => setaAndar()} />
                    {toggleAndar ? editInput("qty_andares") : ""}</span>
                </p>
                <p><strong>Apartamentos por andar:</strong> {info.qty_ap_andar} <span>
                    <EditIcon fontSize="small" sx={{ color: '#1D2854ff' }} onClick={() => setaApAndar()} />
                    {toggleApAndar ? editInput("qty_ap_andar") : ""}</span>
                </p>
                <p><strong>Total de apartamentos:</strong> {total = info.qty_ap_andar * info.qty_andares}</p>
                <p><strong>Responsavel:</strong> {info.responsavel}<span>
                    <EditIcon fontSize="small" sx={{ color: '#1D2854ff' }} onClick={() => setaResponsavel()} />
                    {toggleResponsavel ? editInput("responsavel") : ""}</span></p>

                <Button variant="contained" size="small" sx={{ height: 20 }}>salvar</Button>
                {/* </form> */}
            </CardObras>
        </CardCentraliza>
    };


    const ListInfos = infos && infos.apartamentos.map((info) => {
        return <CardApsgeral key={info.id}>
            <h4>Apartamento: {info.numero_ap}</h4>
            <p>Andar: {info.andar}</p>
            <p>Limpeza: {funcLimpeza(info.limpeza_completa)} </p>
            <p>Data da limpeza: {info.data}</p>
            {/* <DeleteRoundedIcon fontSize="medium" sx={{ color: '#1D2854ff' }} onClick={() => goToDeleteApPage(navigate, info.id)} /> */}
        </CardApsgeral>
    });

    const generalList = () => {
        return <div>
            <CardCentraliza>
                <p><strong>Faltam {total - apConcluded.length} apartamentos para concluir a obra</strong></p>
                <Linha></Linha>
            </CardCentraliza>
         
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
            <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToAdminPage(navigate, type)}>Voltar</Button>

            <Linha></Linha>
            {listaObra()} 
            {generalList()}
            {ListInfos}

            {!loading && erro && <p>Deu ruim!</p>}
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
        </ContainerGeral>
    )
};
