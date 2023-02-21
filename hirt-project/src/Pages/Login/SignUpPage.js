import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { goToAdminPage, goToCollabPage, goToHomePage } from "../../Routes/RouteFunctions"
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import { BASE_URL } from "../../Constants/url";
import axios from "axios";
import { Header } from "../../Constants/Header";
import { ContainerCard, ContainerGeral } from "../../Styled/StyledLogin/StyledSignUp";


export const SignUpPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('')
    const { type } = useParams()

    const [form, handleInputChange, clear] = useForm({
        name: "", email: "", password: "", role: type
    });


    const sendForm = event => {
        event.preventDefault();
        console.log(form)
        axios
            .post(`${BASE_URL}/user/signup`, form,
                {
                    headers: {
                        contentType: "application/json"
                    }
                }
            )
            .then(() => {
                setLoading(false)
                clear()
                if (type === "admin") {
                    goToAdminPage(navigate)
                } else {
                    goToCollabPage(navigate)
                }
            })
            .catch((error) => {
                setLoading(false)
                setErro(error.message)
                alert("Opa, deu erro! Tente novamente.", error.message)
            });
    };
    return (
        <ContainerGeral>
            <Header />
            {!loading && erro && <p>Deu ruim!</p>}
            <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToHomePage(navigate)}>Voltar</Button>

            <ContainerCard onSubmit={sendForm}>
                <TextField fullWidth required
                    id="outlined-required"
                    label="Nome"
                    type={'text'}
                    name={"name"}
                    onChange={handleInputChange}
                    value={form.name}
                />

                <TextField fullWidth required
                    id="outlined-required"
                    label="e-mail"
                    name={"email"}
                    onChange={handleInputChange}
                    value={form.email}
                    placeholder={"email"}
                />

                <TextField fullWidth required
                    id="outlined-required"
                    label="senha"
                    name={"password"}
                    onChange={handleInputChange}
                    value={form.password}
                />

                <Button variant="contained" endIcon={<SendIcon />} type="submit">Criar</Button>

                {loading && loading &&
                    <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />}
            </ContainerCard>
        </ContainerGeral>
    )
};
