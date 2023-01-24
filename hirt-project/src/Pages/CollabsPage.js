import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useRequestData } from "../Hooks/UseRequestData";
import { goToConcludedAp, goToInfoApPage, goToInfoPage } from "../Routes/RouteFunctions";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

export default function CollabsPage() {

    const navigate = useNavigate();

    const [apartment, loading, erro] = useRequestData(`${BASE_URL}/apartamentos`);
    let apes = !!apartment ? apartment : "carregando";

    const [obra_info] = useRequestData(`${BASE_URL}/obra`);
    let obra = !!obra_info ? obra_info : "carregando";

    //###Renderiza obras para incluir aps
    console.log("obra_info", obra_info)


    const listaObras = obra_info && obra_info.map((obra) => {
        return <div key={obra.id}>
            <p>{obra.nome_obra}</p>
            <InfoRoundedIcon sx={{ color: '#1D2854ff' }} onClick={() => goToInfoApPage(navigate, obra.id)} />
            <EditRoundedIcon sx={{ color: '#1D2854ff' }} onClick={() => goToConcludedAp(navigate, obra.id)} />
        </div>
    });

    //###Andar passa a ficar como concluído após número de apartamentos estiver chegado ao limite

    const apConcluded = apartment && apartment.filter((limp) => {
        return limp.limpeza_completa === 1
    }).map(({ andar, limpeza_completa }) => ({ andar, limpeza_completa }));

    let apByLevel = obra_info && obra_info.map(({ qty_andares, qty_ap_andar }) => ({ qty_andares, qty_ap_andar }))


    console.log('apByLevel', apByLevel)



    return (
        <div>
            <p>Collab Page</p>
            {/* <Button variant="contained" onClick={() => goToConcludedAp(navigate)}>Inserir Conclusão</Button> */}

            {loading && loading && <p>Carregando...</p>}
            {!loading && erro && <p>Deu ruim!</p>}
            {!loading && obra_info && obra_info.length > 0 && listaObras}
            listaObras
        </div>
    )
}