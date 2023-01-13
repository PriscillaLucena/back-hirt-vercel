import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { GlobalContext } from "../Global/GlobalContext"
import { useRequestData } from "../Hooks/UseRequestData";
import { goToConcludedAp } from "../Routes/RouteFunctions";
import { ConcludedAp } from "./Home/ConcludedAp";

export default function CollabPage() {

    //variáveis globalState
    const navigate = useNavigate();
    const { states, setters } = useContext(GlobalContext);
    const { conclusion } = states;
    const { setConclusion } = setters;
    // const {apAtual}= dados;
    const [apartment, loading, erro] = useRequestData(`${BASE_URL}/apartamentos`);
    let apes = !!apartment ? apartment : "carregando";

    // const [obra_info] = useRequestData(`${BASE_URL}/obra`);
    // let obra = !!obra_info ? obra_info : "carregando";

    console.log("andar", apes)

    //###Incluir fotos do apartamento ok (acima)

    // let video = document.querySelector('video')

    // navigator.mediaDevices.getUserMedia({ video: true })
    //     .then(stream => { //o que fazer quando o usuário permitir acesso à camera
    //         video.srcObject = stream;
    //         video.play();
    //     })
    //     .catch(error => { //o que fazer quando o usuário não permite acesso à camera
    //         console.log(error);
    //     })

    // document.querySelector('button').addEventListener('click', () => {
    //     var canvas = document.querySelector('canvas');
    //     canvas.height = video.videoHeight;
    //     canvas.width = video.videoWidth;
    //     canvas.getContext('2d').drawImage(video, 0, 0);
    //     let link = document.createElement('a');
    //     link.download = 'foto.png';
    //     link.href = canvas.toDataURL();
    //     link.textContent = 'clique para baixar a imagem';
    // })

    // //###checkbox de conclusão



    const listaApes = apartment && apartment.map((ap) => {
        if(ap.limpeza_completa){
            return <div></div>
        }{
        return <div key={ap.id}>
            <h3>Andar: {ap.andar}</h3>
            <p>Apartamento: {ap.numero_ap}</p>
            <label>
                <input type='checkbox' value='true'/>
                Concluído
                <button onClick={()=>goToConcludedAp(navigate, ap.id)}>Inserir Foto</button>
            </label>
        </div>
        }
    });


    //###Andar passa a ficar como concluído após número de apartamentos estiver chegado ao limite

    const apsWithLevel = apartment && apartment.map(({ andar, numero_ap }) => ([andar, numero_ap]))
    // const apGrouped = apsWithLevel.groupBy(({u}) => u.andar)

    // if()

    console.log('apsWithLevel', apsWithLevel)

    // let apsByLevel = {};

    const apConcluded = apartment && apartment.filter((limp) => {
        return limp.limpeza_completa === 1
    }).map(({ andar, limpeza_completa }) => ({ andar, limpeza_completa }));


    console.log('apConcluded', apConcluded)



    return (
        <div>
            <p>Collab Page</p>

            {loading && loading && <p>Carregando...</p>}
            {!loading && erro && <p>Deu ruim!</p>}
            {!loading && apartment && apartment.length > 0 && listaApes}

        </div>
    )
};
