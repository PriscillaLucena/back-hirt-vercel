import axios from "axios";
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { GlobalContext } from "../Global/GlobalContext";
import { goToCollabPage } from "../Routes/RouteFunctions";


export const ConcludedAp = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const { states, setters } = useContext(GlobalContext);
    const { image, endImg, conclusion, level } = states;
    const { setImage, setConclusion, setLevel } = setters;

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const [ape, setApe] = useState('');


    //fazer um post pra setar a conclusão
    const uploadImage = () => {
        setLoading(true)

        const formData = new FormData();
        formData.append('image', image);

        const body =
        {
            numero_ap: ape,
            limpeza_completa: conclusion,
            foto: image
        }
        console.log("body", body)

        axios.post(`${BASE_URL}/apartment/${id}`, body, {
            // headers: {
            //     auth: token,
            //     contentType: "application/json"
            // }
        }).then(() => {
            setLoading(false);
            alert("Informações Salvas, Apartamento Concluído!")
        }).catch(error => {
            setLoading(false)
            setErro(error.response)
            console.log("deu erro!", error.response)
        });
    };

    const concluded = (u) => {
        setConclusion(u)
    };

    const listaImg = () => {
        return <div>
            <input placeholder={"Número do Andar"} onChange={(e) => setLevel(e.target.value)} />
            <input placeholder={"Número do Apartamento"} onChange={(e) => setApe(e.target.value)} />
            <label>Concluído:</label>
            <input type='checkbox' value='true' onClick={() => concluded(true)} />
            <input type="file" accept="image/*" capture="camera" onChange={(e) => setImage(e.target.files[0])} /><br /><br />
            {
                image ? <img src={URL.createObjectURL(image)} alt="imagem" name="imagem" width={150} height={150} /> :
                 ''   // <img src={endImg} alt="imagem" width={150} height={150}></img>
            } <br /><br />
            <button onClick={() => uploadImage()}>Salvar</button>
        </div>

    };
    console.log("ape", ape)
    console.log('concluded', conclusion)
    console.log("imagem", image)

    // ####videoStreaming

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

    return (
        <div>
            <h1>Concluded Ap</h1>
            {loading && loading && <p>Carregando...</p>}
            {!loading && erro && <p>Deu ruim!</p>}
            {!loading && listaImg()}
            <button onClick={() => goToCollabPage(navigate)}>Voltar</button> 
        </div>
    )
};