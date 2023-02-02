import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Constants/url";
import { GlobalContext } from "../../Global/GlobalContext";
import { goToCollabPage } from "../../Routes/RouteFunctions";
import SendIcon from '@mui/icons-material/Send';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import styled from "styled-components";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import { device } from "../../Query";
import hirtLogo from "../../images/hirt-imagem-SF.png"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const ContainerGeral = styled.div`
  min-width: 100%;
  min-height: 96vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto';

  @media ${device.mobileS}{
        margin-top: 2rem;
 }

  @media ${device.laptop}{
        margin-top: 2rem;
 }

  @media ${device.laptopL}{
    justify-content: space-around;
}
`

const ContainerCard = styled.div`
    margin-top: 0.75rem;
    width: 50%;
    display: flex;
    flex-direction: column;
    border: 0.2rem solid #1C284Fff;
    border-radius: 1rem;
    padding: 2.5rem;
    gap: 0.5rem;
    background: #F5FFFA;
    align-items: center;

    @media ${device.mobileS}{
        margin-top: 2rem;
        padding: 1rem;
        width: 70%;
    }

    @media ${device.laptop}{
        margin-top: 2rem;
        width: 60%;
        padding: 2.5rem;
    }
`

const ContainerUpload = styled.div`
    display: flex;
`

const fileToImageUri = (file) => new Promise((resolve, reject) => {

    const reader = new FileReader();
    reader.onload = (event) => {
        resolve(event.target.result)
    };
    reader.readAsDataURL(file);
});

export const ConcludedAp = () => {

    const { obra_id } = useParams();

    const navigate = useNavigate();

    const { states, setters } = useContext(GlobalContext);
    const { image,conclusion, level } = states;
    const { setImage, setConclusion, setLevel } = setters;

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const [ape, setApe] = useState('');

    const onChangeImageUri = (file) => {

        if (!file) {
            setImage('');
            return;
        }

        fileToImageUri(file)
            .then(image => {
                setImage(image)
            })

    };

    console.log('id', obra_id)
    const uploadImage = () => {
        setLoading(true)

        const body =
        {
            numero_ap: ape,
            andar: level,
            limpeza_completa: conclusion,
            foto: image,
            obra_id: `${obra_id}`
        }

        axios.post(`${BASE_URL}/apartamentos/${obra_id}`, body, {
            // headers: {
            //     'access-control-allow-origin': `${BASE_URL}`
            //     auth: token,
            //     contentType: "application/json"
            // }
        }).then(() => {
            setLoading(false);
            alert("Informações Salvas, Apartamento Concluído!")
            setLevel('')
            setApe('')
            setConclusion('')
            setImage('')

        }).catch(error => {
            setLoading(false)
            alert("deuruim!")
            setErro(error.response)
            console.log("deu erro!", error.response)
        });
    };

    console.log("conclusion", conclusion)

    // const concluded = (u) => {
    //     setConclusion(u)
    // };

    const listaImg = () => {
        return <ContainerCard>
            <TextField fullWidth required
                id="outlined-required"
                label="Número do Andar"
                onChange={(e) => setLevel(e.target.value)} /><br />
            <TextField fullWidth required
                id="outlined-required"
                label="Nº Ap/local"
                onChange={(e) => setApe(e.target.value)} />
            <ContainerUpload>
                <FormControl >
                    <InputLabel id="demo-simple-select-autowidth-label">Limpeza:</InputLabel>
                    <Select sx={{minWidth: 80 }}
                        required
                        labelId="demo-simple-select-label"
                        label="Limpeza"
                        id="demo-simple-select"
                        value={conclusion}
                        onChange={(e)=>setConclusion(e.target.value)}
                    >
                        <MenuItem value={1}>Limpeza Grossa</MenuItem>
                        <MenuItem value={2}>Limpeza Fina</MenuItem>
                        <MenuItem value={3}>Entrega</MenuItem>
                    </Select>
                </FormControl>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden type="file" accept="image/*" capture="camera" onChange={(e) => onChangeImageUri(e.target.files[0] || null)} />
                    <PhotoCamera />
                </IconButton>
            </ContainerUpload>
            {image ? <img src={image} alt="imagem" width={150} height={150} /> :
                <img src={hirtLogo} alt="logo" width={150} height={150} />}
            <Button variant="contained" endIcon={<SendIcon />} onClick={() => uploadImage()}>Salvar</Button>
        </ContainerCard>
    };

    console.log("image", image.length)
    return (
        <ContainerGeral>
            <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToCollabPage(navigate)}>Voltar</Button>
            {!loading && erro && <p>Deu ruim!</p>}
            {!loading && listaImg()}
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
        </ContainerGeral>
    )
};

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
