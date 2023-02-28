import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { useRequestData, useRequestDataCollab, useRequestObra } from "../Hooks/UseRequestData";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import { goToAdminPage, goToCollabPage, goToDeleteApPage } from "../Routes/RouteFunctions";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Header } from "../Constants/Header";
import { CardAps, CardApsgeral, CardCentraliza, CardObras, ContainerGeral, ContainerPorcentagem, Linha } from "../Styled/StyledAdm/StyledInfoAdm";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { useProtectedPage } from "../Hooks/useProtetedPage";
import useForm from "../Hooks/useForm";

export const InfoPage = () => {

    useProtectedPage();
    const navigate = useNavigate();
    const { id, type, obra_id } = useParams();
    const [conclusion, setConclusion] = useState('');
    const url = type === "collab" ? `http://localhost:3003/apartments/all/${id}/${obra_id}` : "http://localhost:3003/construction/all"
    const [infos, loading, erro] = useRequestDataCollab(url);
    const inf = !!infos ? infos : "carregando"
    const info = inf
    const [toggleLimpeza, setToggleLimpeza] = useState(false);
    const [toggleNomeObra, setToggleNomeObra] = useState(false);
    const [toggleAndar, setToggleAndar] = useState(false);
    const [toggleApAndar, setToggleApAndar] = useState(false);
    console.log('infos', infos)
    console.log('obra_id', obra_id)

    const [form, handleInputChange] = useForm({
        nome_obra: "", qty_andares: "", qty_ap_andar: "", limpeza_completa: ""
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

        } else if (limpeza_completa === 2) {
            apLimpFina2 = [...apLimpFina, limpeza_completa]
            apLimpFina = apLimpFina2

        } else if (limpeza_completa === 3) {
            apConcluded2 = [...apConcluded, limpeza_completa]
            apConcluded = apConcluded2

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

    const setaLimpeza = () => {
        setToggleLimpeza(!toggleLimpeza)
    }


    const listaObra = infos && infos.map((info) => {
        if (info.obra_id === `${obra_id}`) {
            return <CardCentraliza>
                <CardObras>
                    {/* <form onClick={sendForm(obra_id)}> */}
                    <h4>{info.nome_obra} <span>
                        {type === 'admin' ?
                            <EditIcon fontSize="small" sx={{ color: '#1D2854ff' }} onClick={() => setaNomeobra()} /> : ''}
                        {toggleNomeObra ? editInput("nome_obra") : ""}</span>
                    </h4>
                    <p><strong>Total de andares:</strong> {info.qty_andares}<span>
                        {type === 'admin' ?
                            <EditIcon fontSize="small" sx={{ color: '#1D2854ff' }} onClick={() => setaAndar()} /> : ''}
                        {toggleAndar ? editInput("qty_andares") : ""}</span>
                    </p>
                    <p><strong>Apartamentos por andar:</strong> {info.qty_ap_andar} <span>
                        {type === 'admin' ?
                            <EditIcon fontSize="small" sx={{ color: '#1D2854ff' }} onClick={() => setaApAndar()} /> : ''}
                        {toggleApAndar ? editInput("qty_ap_andar") : ""}</span>
                    </p>
                    <p><strong>Total de apartamentos:</strong> {total = info.qty_ap_andar * info.qty_andares}</p>
                    <Button variant="contained" size="small" sx={{ height: 20 }}>salvar</Button>
                    {/* </form> */}
                </CardObras>
            </CardCentraliza>
        }
    });

    const renderEdit = (ap_id) => {
        return <FormControl
        //fazer o sendForm com o endpoint criado no back
        // onSubmit={sendForm(ap_id)}
        >
            <Select sx={{ minWidth: 80, height: 30 }}
                required
                value={form.limpeza_completa}
                name={"limpeza_completa"}
                onChange={handleInputChange}
            >
                <MenuItem value={1}>Limpeza Grossa</MenuItem>
                <MenuItem value={2}>Limpeza Fina</MenuItem>
                <MenuItem value={3}>Entrega</MenuItem>
            </Select>
            <Button variant="contained" size="small" sx={{ height: 20 }}>salvar</Button>
        </FormControl>
    };


    const ListInfos = infos && infos.map((info) => {
        return <CardApsgeral key={info.id}>
            <h4>Apartamento: {info.numero_ap}</h4>
            <p>Andar: {info.andar}</p>
            <p>Limpeza: {type === 'collab' ?
                <EditIcon fontSize="small" sx={{ color: '#1D2854ff' }} onClick={() => setaLimpeza()} /> : ''}
                {type === 'collab' ? renderEdit(info.id) : ""}</p>
            {type === 'CLIENT' ? <p>Limpeza: {info.limpeza_completa} </p> : ""}
            {funcLimpeza(info.limpeza_completa)}
            <p>Data da limpeza: {info.data}</p>
            <DeleteRoundedIcon fontSize="medium" sx={{ color: '#1D2854ff' }} onClick={() => goToDeleteApPage(navigate, info.id)} />
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
            {infos.length === 0 ? <h3>Ainda não foram adicionados apartamentos nesta obra!</h3>
                : <CardAps>{ListInfos}</CardAps>}
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
            {type === 'admin' ? <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToAdminPage(navigate, type)}>Voltar</Button> :
                type === 'collab' ? <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToCollabPage(navigate, type)}>Voltar</Button> :
                    ""}

            {type === 'collab' ? generalList() : ListInfos}

            {!loading && erro && <p>Deu ruim!</p>}
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
            {!loading && infos && generalList()}

        </ContainerGeral>
    )
};
