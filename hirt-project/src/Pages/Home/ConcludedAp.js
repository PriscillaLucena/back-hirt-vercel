import axios from "axios";
import { useContext, useState } from "react"
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../Constants/url";
import { GlobalContext } from "../../Global/GlobalContext";
// import { BASE_URL } from "../Constants/url";
// import { useRequestData } from "../Hooks/UseRequestData";

export const ConcludedAp = () => {

    const { id } = useParams();
    const { states, setters } = useContext(GlobalContext);
    const { image, endImg, conclusion } = states;
    const { setImage, setConclusion } = setters;
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');


    const concluded = (u) => {
        setConclusion(u)
    };

    const listaImg = () => {
        return <div>
            <label>Concluído:</label>
            <input type='checkbox' value='true' onClick={() => concluded(true)} />
            <input type="file" accept="image/*" capture="camera" onChange={(e) => setImage(e.target.files[0])} /><br /><br />
            {
                image ? <img src={URL.createObjectURL(image)} alt="imagem" width={150} height={150} /> :
                    <img src={endImg} alt="imagem" width={150} height={150}></img>
            } <br /><br />
            <button onClick={() => uploadImage()}>Salvar</button>

        </div>
    };

    //fazer um post pra setar a conclusão
    const uploadImage = () => {
        setLoading(true)

        const formData = new FormData();
        formData.append('image', image);

        const body =
        {
            limpeza_completa: conclusion,
            foto: image
        }
        console.log("body",body)

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

    console.log(conclusion, image)
    return (
        <div>
            <h1>Concluded Ap</h1>
            {listaImg()}

        </div>
    )
}