// import { useContext } from "react"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
// import { GlobalContext } from "../Global/GlobalContext"
import { useRequestData } from "../Hooks/UseRequestData";
import { goToConcludedAp } from "../Routes/RouteFunctions";

export default function CollabsPage() {

    const navigate = useNavigate();

    const [apartment, loading, erro] = useRequestData(`${BASE_URL}/apartamentos`);
    let apes = !!apartment ? apartment : "carregando";
    
    const [obra_info] = useRequestData(`${BASE_URL}/obra`);
    let obra = !!obra_info ? obra_info : "carregando";

    console.log("andar", apes)
    console.log("obra", obra)
    //###Renderiza apes concluídos por andar

    const listaApes = apartment && apartment.map((ap) => {
        return <div>
                {
                ap.limpeza_completa ? "" :
                    <div key={ap.id}>
                        <h3>Andar: {ap.andar}</h3>
                        <p>Apartamento: {ap.numero_ap}</p>
                        <image src={ap.foto}/>
                    </div>
            }

        </div>

    });


    //###Andar passa a ficar como concluído após número de apartamentos estiver chegado ao limite

    const apsWithLevel = apartment && apartment.map(({ andar, numero_ap, limpeza_completa }) => ({andar, numero_ap, limpeza_completa}))


    console.log('apsWithLevel', apsWithLevel)

    const apConcluded = apartment && apartment.filter((limp) => {
        return limp.limpeza_completa === 1
    }).map(({ andar, numero_ap, limpeza_completa }) => ({ andar, numero_ap, limpeza_completa }));


    console.log('apConcluded', apConcluded)



    return (
        <div>
            <p>Collab Page</p>
            <h4> Andares com apartamentos Concluídos</h4>
            <Button variant="contained" onClick={() => goToConcludedAp(navigate)}>Inserir Conclusão</Button>

            {loading && loading && <p>Carregando...</p>}
            {!loading && erro && <p>Deu ruim!</p>}
            {!loading && apartment && apartment.length > 0 && listaApes}

        </div>
    )
}