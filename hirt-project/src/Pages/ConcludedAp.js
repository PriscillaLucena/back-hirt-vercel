import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { GlobalContext } from "../Global/GlobalContext";
import { goToCollabPage } from "../Routes/RouteFunctions";
import SendIcon from '@mui/icons-material/Send';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import styled from "styled-components";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const ContainerGeral = styled.div`
  min-width: 100%;
  min-height: 96vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #244372ff;
  justify-content: space-around;
`

const ContainerCard = styled.div`
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
    border: 0.2rem solid #1C284Fff;
    border-radius: 1rem;
    padding: 2.5rem;
    gap: 0.5rem;
    background: white;
    align-items: center;
`

const ContainerUpload = styled.div`
    display: flex;
`

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
        return <ContainerCard>

            <TextField required
                defaultValue="Ex: 1"
                id="outlined-required"
                label="Número do Andar"
                onChange={(e) => setLevel(e.target.value)} /><br/>
            <TextField required
                defaultValue="Ex: 101"
                id="outlined-required"
                label="Número do Apartamento"
                onChange={(e) => setApe(e.target.value)} />
            <ContainerUpload>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Concluído" onClick={() => concluded(true)} />
                </FormGroup>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden type="file" accept="image/*" capture="camera" onChange={(e) => setImage(e.target.files[0])} />
                    <PhotoCamera />
                </IconButton>
            </ContainerUpload>
            {
                image ? <img src={URL.createObjectURL(image)} alt="imagem" name="imagem" width={150} height={150} /> :
                    ''   // <img src={endImg} alt="imagem" width={150} height={150}></img>
            } <br /><br />
            <Button variant="contained" endIcon={<SendIcon />} onClick={() => uploadImage()}>Salvar</Button>
        </ContainerCard>

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
        <ContainerGeral>

           <h1>Concluded Ap</h1>
            <Button variant="contained" onClick={() => goToCollabPage(navigate)}>Voltar</Button>
            {loading && loading && <p>Carregando...</p>}
            {!loading && erro && <p>Deu ruim!</p>}
            {!loading && listaImg()}

        </ContainerGeral>
    )
};