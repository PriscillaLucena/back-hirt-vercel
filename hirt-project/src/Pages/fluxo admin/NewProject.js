import { useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { goToAdminPage } from "../../Routes/RouteFunctions"
import styled from "styled-components";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import { BASE_URL } from "../../Constants/url";
import axios from "axios";
import { Header } from "../../Constants/Header";
import { device } from "../../Query"


const ContainerGeral = styled.div`
  min-width: 100%;
  min-height: 96vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: 'Roboto';

  @media ${device.mobileM} {
        row-gap: 2rem;
        justify-content:  flex-start;
        padding: 1rem;
    }
`

const ContainerCard = styled.form`
    width: 50%;
    display: flex;
    flex-direction: column;
    border: 0.2rem solid #1C284Fff;
    border-radius: 1rem;
    padding: 2.5rem;
    gap: 0.5rem;
    background: #F5FFFA;
    align-items: center;
    row-gap: 1rem;

    @media ${device.mobileM} {
        row-gap: 2rem;
        padding: 1rem;
    }
`

export function NewProject() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('')

    const [form, handleInputChange, clear] = useForm({
        nome_obra: "", qty_andares: "", qty_ap_andar: "", qty_total_ap: "", responsavel: ""
    });


    const sendForm = event => {
        event.preventDefault();
        axios
            .post(`${BASE_URL}/nova-obra`, form,
                {
                    headers: {
                        contentType: "application/json"
                    }
                }
            )
            .then(() => {
                setLoading(false)
                clear()
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
