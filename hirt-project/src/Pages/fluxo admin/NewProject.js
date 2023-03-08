import { useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { goToAdminPage } from "../../Routes/RouteFunctions"
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import { BASE_URL } from "../../Constants/url";
import axios from "axios";
import { Header } from "../../Constants/Header";
import { ContainerCard, ContainerGeral } from "../../Styled/StyledAdm/StyledNewProject";
import {useProtectedPage} from "../../Hooks/useProtectedPage";

export function NewProject() {
    
    useProtectedPage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('')
    const token = localStorage.getItem("token");
    const [form, handleInputChange, clear] = useForm({
        nome_obra: "", qty_andares: "", qty_ap_andar: "", qty_total_ap: "", responsavel: ""
    });

    const sendForm = event => {
        event.preventDefault();
        axios
            .post(`${BASE_URL}/construction/new`, form,
                {
                    headers: {
                        contentType: "application/json",
                        authorization: token
                    }
                }
            )
            .then(() => {
                setLoading(false)
                alert("deu boa")
                clear()
                goToAdminPage(navigate)
            })
            .catch((error) => {
                setLoading(false)
                setErro(error.message)
                alert("Opa, deu erro! Tente novamente.")
            });
    };

    return (
        <ContainerGeral>
            <Header />
            {!loading && erro && <p>Deu ruim!</p>}
            <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToAdminPage(navigate)}>Voltar</Button>

            <ContainerCard onSubmit={sendForm}>
                <TextField fullWidth required
                    id="outlined-required"
                    label="Nome Obra"
                    type={'text'}
                    name={"nome_obra"}
                    onChange={handleInputChange}
                    value={form.nome_obra}
                />

                <TextField fullWidth required
                    id="outlined-required"
                    label="Quantidade Andares"
                    name={"qty_andares"}
                    onChange={handleInputChange}
                    value={form.qty_andares}
                    placeholder={"Quantidade de andares"}
                />

                <TextField fullWidth required
                    id="outlined-required"
                    label="Quantidade apartamento por andar"
                    name={"qty_ap_andar"}
                    onChange={handleInputChange}
                    value={form.qty_ap_andar}
                />

                <TextField fullWidth required
                    id="outlined-required"
                    label="Nome do cliente"
                    name={"responsavel"}
                    onChange={handleInputChange}
                    type={'text'}
                    value={form.responsavel}
                />

                <Button variant="contained" endIcon={<SendIcon />} type="submit">Criar</Button>

                {loading && loading &&
                    <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
            </ContainerCard>

        </ContainerGeral>

    )
};

// {
//     headers: {
//         contentType: "application/json"
//     }
// }).then(() => {
//     setLoading(false)
//     handleInputChange({ nome_obra: "", qty_andares: "", qty_ap_andar: "", responsavel: "" })
//     alert("Obra incluída!")
// }).catch((error) => {
//     setLoading(false)
//     setErro(error.message)
//     console.log(error.message)
// });
// };
