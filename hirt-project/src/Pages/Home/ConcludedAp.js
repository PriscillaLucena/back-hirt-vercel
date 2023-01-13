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
    const { image, endImg } = states;
    const { setImage } = setters;
    const [loading, setLoading] = useState(false);
    const [erroPost, setErroPost] = useState('');
    const [conclusion, setConclusion] = useState([]);

    const uploadImage = async e => {
        e.preventDefault()
        console.log(image)
    };

    //fazer um post pra setar a conclusão
    const conclusionSetter = () => {
        setLoading(true)
        const body = 
        {
            limpeza_completa: conclusion,
            foto: image           
        }

        axios.post(`${BASE_URL}/apartment/${id}`, body, {
            // headers: {
            //     auth: token,
            //     contentType: "application/json"
            // }
        }).then(() => {
            setLoading(false);
            setConclusion(true)
            setImage(image)
        }).catch(error => {
            setLoading(false)
            setErroPost(error.response)
        });
    }

    <form onSubmit={uploadImage}>
        <input type="file" accept="image/*" capture="camera" onChange={(e) => conclusionSetter()} />
        {image ? <img src={URL.createObjectURL(image)} alt="imagem" width={150} height={150} /> :
            <img src={endImg} alt="imagem" width={150} height={150}></img>}
        <button type="submit"
        >Salvar</button>
    </form>


    return (
        <div>
            <h1>Concluded Ap</h1>

        </div>
    )
}