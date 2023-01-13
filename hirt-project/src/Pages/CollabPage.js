import { spread } from "axios";
import { useContext } from "react"
import { BASE_URL } from "../Constants/url";
import { GlobalContext } from "../Global/GlobalContext"
import { useRequestData } from "../Hooks/UseRequestData";

export default function CollabPage() {

    //variáveis globalState

    const { states, setters } = useContext(GlobalContext);
    const { conclusion, image, endImg } = states;
    const { setConclusion, setImage } = setters;
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

    const uploadImage = async e => {
        e.preventDefault()
        console.log(image)
    }

    const listaApes = apartment && apartment.map((ap) => {
        return <div key={ap.id}>
            <h3>Andar: {ap.andar}</h3>
            <p>Apartamento: {ap.numero_ap}</p>
            <label>
                <input type='checkbox' onClick={() => setConclusion(true)} />
                Concluído
            </label>
            {conclusion ?
                <form onSubmit={uploadImage}>
                    <input type="file" accept="image/*" capture="camera" onChange={(e) => setImage(e.target.files[0])} />
                    {image ? <img src={URL.createObjectURL(image)} alt="imagem" width={150} height={150} /> :
                        <img src={endImg} alt="imagem" width={150} height={150}></img>}
                    <button type="submit"
                    >Salvar</button>
                </form> : ""}
        </div>
    });


    //###Andar passa a ficar como concluído após número de apartamentos estiver chegado ao limite

    const apsWithLevel = apartment && apartment.map(({ andar, numero_ap }) => ([ andar, numero_ap ]))
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
