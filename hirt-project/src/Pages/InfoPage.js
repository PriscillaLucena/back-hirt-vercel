import { useParams } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { useRequestData } from "../Hooks/UseRequestData";

export const InfoPage = () => {

    const {id} = useParams();

    const [infos] = useRequestData(`${BASE_URL}/info/${id}`) 
    // const inf = !!infos ? infos : "carregando"
       
    const ListInfos = infos && infos.map((info) => {
        return <div>
            <p>Nome Obra:{info.nome_obra}</p>
            <p>Total de Andares:{info.qty_andares}</p>
            <p>Total de Apartamentos por andar:{info.qty_ap_andar}</p>
            <p>Total Apartamentos:{info.qty_total_ap}</p>
            <p>Cliente:{info.responsavel}</p>
            {/* <p>Apartamentos: {info.apartamentos}</p> */}
        </div>
    })

    return (
        <div>
            <h4>Info Page</h4>
            {ListInfos}
        </div>
    )
};