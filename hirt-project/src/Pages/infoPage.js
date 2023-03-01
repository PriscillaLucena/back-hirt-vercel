import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { useRequestDataCollab,  } from "../Hooks/UseRequestData";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import { goToCollabPage, goToDeleteApPage } from "../Routes/RouteFunctions";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Header } from "../Constants/Header";
import { CardAps, CardApsgeral, ContainerGeral } from "../Styled/StyledAdm/StyledInfoAdm";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useProtectedPage } from "../Hooks/useProtetedPage";


export const InfoPage = () => {

    useProtectedPage();
    const navigate = useNavigate();
    const { id, type, obra_id } = useParams();
    const [limpeza, setLimpeza] = useState('');
    const [infos, loading, erro] = useRequestDataCollab(`${BASE_URL}/apartments/all/${id}/${obra_id}`);
    const inf = !!infos ? infos : "carregando"
    const info = inf
    const [toggleLimpeza, setToggleLimpeza] = useState(false);
    console.log('infos', infos)
    console.log('obra_id', obra_id)


    const funcLimpeza = (limpeza_completa) => {
        if (limpeza_completa === 1) {
            return "Limpeza Grossa"
        } else if (limpeza_completa === 2) {
            return "Limpeza Fina"
        } else if (limpeza_completa === 3) {
            return "Pronto para Entrega"
        }
    };

    const setaLimpeza = () => {
        setToggleLimpeza(!toggleLimpeza)
    }


    const renderEdit = (info) => {
        return <div>
            <Select sx={{ minWidth: 80, height: 30 }}
                required
                value={info.limpeza}
                name={"limpeza_completa"}
                onChange={(e) => setLimpeza(e.target.value)}
            >
                <MenuItem value={1}>Limpeza Grossa</MenuItem>
                <MenuItem value={2}>Limpeza Fina</MenuItem>
                <MenuItem value={3}>Entrega</MenuItem>
            </Select>
            <Button variant="contained" size="small" sx={{ height: 20 }}
            // onClick={alteraLimpeza(info.id)}
            >salvar</Button>
        </div>
    };

    const ListInfos = infos && infos.map((info) => {
        return <CardApsgeral key={info.id}>
            <h4>Apartamento: {info.numero_ap}</h4>
            <p>Andar: {info.andar}</p>
            <p>Limpeza: {funcLimpeza(info.limpeza_completa)}
                <EditIcon fontSize="small" sx={{ color: '#1D2854ff' }} onClick={() => setaLimpeza(info)} />
                {toggleLimpeza ? renderEdit(info) : ""}</p>
            <p>Data da limpeza: {info.data}</p>
            {/* <DeleteRoundedIcon fontSize="medium" sx={{ color: '#1D2854ff' }} onClick={() => goToDeleteApPage(navigate, info.id)} /> */}
        </CardApsgeral>
    });


    return (
        <ContainerGeral>
            <Header />
            <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToCollabPage(navigate, type, id)}>Voltar</Button>
            {!loading && infos && <CardAps>{ListInfos}</CardAps>}
            {!loading && erro && <p>Deu ruim!</p>}
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}

        </ContainerGeral>
    )
};
