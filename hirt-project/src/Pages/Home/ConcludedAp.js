import { useContext } from "react"
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../Global/GlobalContext";
// import { BASE_URL } from "../Constants/url";
// import { useRequestData } from "../Hooks/UseRequestData";

export const ConcludedAp = () => {

    const { id } = useParams();
    const { states, setters } = useContext(GlobalContext);
    const { image, endImg } = states;
    const { setImage } = setters;
    const [loadingPost, setLoadingPost] = useState(false);
    const [erroPost, setErroPost] = useState('');
    const [conclusion, setConclusion] = useState([]);

    const uploadImage = async e => {
        e.preventDefault()
        console.log(image)
    };

    //fazer um post pra setar a conclusão
    const conclusionSetter = () => {
        setLoading(true)
        const body = {
            
        }
        axios.post(`${BASE_URL}/apartment/${id}`, body, {
            headers: {
                auth: token,
                contentType: "application/json"
            }
        }).then((response) => {
            setLoadingPost(false);
        }).catch(error => {
            setLoadingPost(false)
            setErroPost(error.response)
        });
    }


    <form onSubmit={uploadImage}>
        <input type="file" accept="image/*" capture="camera" onChange={(e) => setImage(e.target.files[0])} />
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