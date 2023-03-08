import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Constants/url";
import { goToCollabPage } from "../../Routes/RouteFunctions";
import SendIcon from '@mui/icons-material/Send';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import hirtLogo from "../../images/hirt-imagem-SF.png"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { ContainerCard, ContainerGeral, ContainerUpload } from "../../Styled/StyledCollab/StyledConcludedAp";
import { Header } from "../../Constants/Header";


export const ConcludedAp = () => {
    useProtectedPage();
    const filesElement = useRef(null);
    const { obra_id } = useParams();
    const navigate = useNavigate();
    const [level, setLevel] = useState('');
    const [conclusion, setConclusion] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const [ape, setApe] = useState('');
    const token = localStorage.getItem("token");

      const uploadImage = () => {
        setLoading(true)

        const dataForm = new FormData();
        for (const file2 of filesElement.current.files) {
          dataForm.append('avatar', file2);

        // const body =
        // {
        //     numero_ap: ape,
        //     andar: level,
        //     limpeza_completa: conclusion,
        //     avatar: dataForm,
        //     obra_id: `${obra_id}`
        // }

        const file = dataForm

        // console.log(file)



        axios.post(`${BASE_URL}/apartments/fotos`, file, {
            Headers: {
                
                "Content-Type": "multipart/form-data"
            }
        }).then(() => {
            setLoading(false);
            alert("Informações Salvas, Apartamento Concluído!")
            setLevel('')
            setApe('')
            setConclusion('')
            setImage('')

        }).catch(error => {
            setLoading(false)
            // alert("deuruim!")
            console.log(error)
            setErro(error.response)
            // console.log("deu erro!", error.response)
        });
    }
};

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
                    <Select sx={{ minWidth: 80 }}
                        required
                        labelId="demo-simple-select-label"
                        label="Limpeza"
                        id="demo-simple-select"
                        value={conclusion}
                        onChange={(e) => setConclusion(e.target.value)}
                    >
                        <MenuItem value={1}>Limpeza Grossa</MenuItem>
                        <MenuItem value={2}>Limpeza Fina</MenuItem>
                        <MenuItem value={3}>Entrega</MenuItem>
                    </Select>
                </FormControl>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden type="file" multiple ref={filesElement} name={'avatar'}/>
                    <PhotoCamera />
                </IconButton>

                {/* <form action="/profile" method="post" encType="multipart/form-data" onSubmit={uploadImage}>
                    <input type={"file"} name="avatar" onSelect={(e) => setImage(e.target.value)}/> */}

                    {/* <button variant="contained"  type={"submit"}>enviar</button> */}
                 {/* </form> */}

            </ContainerUpload>
            {image ? <img src={image} alt="imagem" width={150} height={150} /> :
                <img src={hirtLogo} alt="logo" width={150} height={150} />}
            <Button variant="contained"  endIcon={<SendIcon />} onClick={() => uploadImage()}>Salvar</Button>
        </ContainerCard>
    };

    // console.log("image", image.length)
    return (
        <ContainerGeral>
            {/* <Header/> */}
            
            <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => navigate(-1)}>Voltar</Button>
            {!loading && erro && <p>Deu ruim!</p>}
            {!loading && listaImg()}
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
        </ContainerGeral>
    )
}
;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const enviaImage = () =>{

//     axios.post(`${BASE_URL}/apartaments/fotos`,  {
//         headers: {
//             authorization: token,
//             ContentType: "multipart/form-data"
//         }
//     }).then(() => {
//         setLoading(false);
//         // alert("Informações Salvas, Apartamento Concluído!")
//         // setLevel('')
//         // setApe('')
//         // setConclusion('')
//         // setImage('')

//     }).catch(error => {
//         setLoading(false)
//         alert("deuruim!")
//         setErro(error.response)
//         console.log("deu erro!", error.response)
//     });
// }

// const imageFunc = () =>{
//     return(
//         <form action="/profile" method="post" encType="multipart/form-data" onSubmit={enviaImage}>
//             <input type={"file"} name="avatar" />

//             <button variant="contained"  type={"submit"}>enviar</button>
//         </form>
//     )
// }

// return(
//     <ContainerGeral>
        
//         <Header/>

//         {listaImg()}
//         {imageFunc()}

//     </ContainerGeral>
// )
// };


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

    // const onChangeImageUri = (file) => {

    //     if (!file) {
    //         setImage('');
    //         return;
    //     }

    //     fileToImageUri(file)
    //         .then(image => {
    //             setImage(image)
    //         })

    // };

    // console.log('id', obra_id)

    // const sendFile = async () => {
    //     const dataForm = new FormData();
    //     for (const file of filesElement.current.files) {
    //       dataForm.append('file', file);
    //     }
    //     const res = await fetch(`http://localhost:8080/upload`, {
    //       method: 'POST',
    //       body: dataForm,
    //     });
    //     const data = await res.json();
    //     console.log(data);
    
          // const fileToImageUri = (file) => new Promise((resolve, reject) => {

//     const reader = new FileReader();
//     reader.onload = (event) => {
//         resolve(event.target.result)
//     };
//     reader.readAsDataURL(file);
// });
