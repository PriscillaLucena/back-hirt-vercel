import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Constants/url";
import { useRequestData } from "../../Hooks/UseRequestData";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import { goToAdminPage, goToDeleteApPage } from "../../Routes/RouteFunctions";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Header } from "../../Constants/Header";
import { CardAps, CardApsgeral, CardCentraliza, CardObras, ContainerGeral, ContainerPorcentagem, Linha } from "../../Styled/StyledAdm/StyledInfoAdm";
import { funcLimpeza } from "../../Constants/Functions";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";

export const InfoAdmPage = () => {

    const navigate = useNavigate();
    const { id, type } = useParams();
    const token = localStorage.getItem("token");
    const [conclusion, setConclusion] = useState('');
    const [infos, loading, erro] = useRequestData(`${BASE_URL}/construction/info/${id}`);
    const inf = !!infos ? infos : "carregando"
    const info = inf.apartments

    let total = "";
    let apLimpGrossa = [];
    let apLimpFina = [];
    let apConcluded = [];

    const listaObra = () => {
        if (info.obra_id === `${id}`) {
            return <CardCentraliza>
                <CardObras>
                    <h4>{info.nome_obra}</h4>
                    <p><strong>Total de andares:</strong> {info.qty_andares}</p>
                    <p><strong>Apartamentos por andar:</strong> {info.qty_ap_andar}</p>
                    <p><strong>Total de apartamentos:</strong> {total = info.qty_ap_andar * info.qty_andares}</p>
                </CardObras>
            </CardCentraliza>
        }
    };

    const renderEdit = () => {
        return <FormControl >
            <InputLabel id="demo-simple-select-autowidth-label">Limpeza:</InputLabel>
            <Select sx={{ minWidth: 80 }}
                required
                labelId="demo-simple-select-label"
                label="Limpeza"
                id="demo-simple-select"
                value={conclusion}
                onChange={(e) => setConclusion(e.target.value)}
            >
                <MenuItem value={1}>Limpeza Grossa</MenuItem>
                <MenuItem value={2}>Limpeza Fina</MenuItem>
                <MenuItem value={3}>Entrega</MenuItem>
            </Select>
        </FormControl>
    }


    const ListInfos = info && info.apartamentos.map((info) => {
        return <CardApsgeral key={info.id}>
            <h4>Apartamento: {info.numero_ap}</h4>
            <p>Andar: {info.andar}</p>
            <p>Limpeza: {funcLimpeza(info.limpeza_completa)}</p>
            <p>{type === 'ADMIN' || "COLLAB" ?
                <EditIcon fontSize="medium" sx={{ color: '#1D2854ff' }} onClick={
                    <FormControl >
                        <InputLabel id="demo-simple-select-autowidth-label">Limpeza:</InputLabel>
                        <Select sx={{ minWidth: 80 }}
                            required
                            labelId="demo-simple-select-label"
                            label="Limpeza"
                            id="demo-simple-select"
                            value={conclusion}
                            onChange={(e) => setConclusion(e.target.value)}
                        >
                            <MenuItem value={1}>Limpeza Grossa</MenuItem>
                            <MenuItem value={2}>Limpeza Fina</MenuItem>
                            <MenuItem value={3}>Entrega</MenuItem>
                        </Select>
                    </FormControl>} />
                : ""}
            </p>
            <p>Data da limpeza: {info.data}</p>
            <DeleteRoundedIcon fontSize="medium" sx={{ color: '#1D2854ff' }} onClick={() => goToDeleteApPage(navigate, info.id)} />
        </CardApsgeral>
    });


    console.log("type e id", id)
    console.log("total", total)
    console.log('apLimpGrossa', apLimpGrossa.length)
    console.log('apLimpFina', apLimpFina.length)
    console.log('apConcluded', apConcluded.length)
    console.log('total', total)
    console.log("info", info)
    console.log("infos", infos)

    const generalList = () => {
        return <div>
            <Linha></Linha>
            {listaObra()}
            <CardCentraliza>
                <p><strong>Faltam {total - apConcluded.length} apartamentos para concluir a obra</strong></p>
                <Linha></Linha>
            </CardCentraliza>
            {info.apartamentos.length === 0 ? <h3>Ainda não foram adicionados apartamentos nesta obra!</h3>
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
            <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToAdminPage(navigate, type)}>Voltar</Button>
            {!loading && erro && <p>Deu ruim!</p>}
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
            {!loading && infos && generalList()}

        </ContainerGeral>
    )
};
