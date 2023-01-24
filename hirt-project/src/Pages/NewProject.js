import { useNavigate } from "react-router-dom";
import useForm from "../Hooks/useForm";
import { goToAdminPage } from "../Routes/RouteFunctions";
import styled from "styled-components";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { BASE_URL } from "../Constants/url";
import { useState } from "react";
import axios from "axios";


const ContainerGeral = styled.div`
  min-width: 100%;
  min-height: 96vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #244372ff;
  justify-content: space-around;
  font-family: 'Roboto';
`

const ContainerCard = styled.form`
    display: flex;
    flex-direction: column;
    border: 0.2rem solid #1C284Fff;
    border-radius: 1rem;
    padding: 2.5rem;
    gap: 0.5rem;
    background: white;
    align-items: center;
`

export const NewProject = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('')

    const [form, handleInputChange] = useForm({
        nome_obra: "", qty_andares: "", qty_ap_andar: "", qty_total_ap: "", responsavel: ""
    });


    const sendForm = (e) => {
        e.preventDefault();

        axios.post(`${BASE_URL}/nova-obra`, form,
            {
                headers: {
                    contentType: "application/json"
                }
            }).then(() => {
                alert("Obra incluída!")
                setLoading(false)
                handleInputChange({ nome_obra: "", qty_andares: "", qty_ap_andar: "", qty_total_ap: "", responsavel: "" })

            }).catch((error) => {
                setLoading(false)
                setErro(error.message)
                console.log(error.message)
            });
    };

    return (
        <ContainerGeral>
            <h3>Inclusão de novos Projetos</h3>
            {loading && loading && <p>Carregando...</p>}
            {!loading && erro && <p>Deu ruim!</p>}

            <Button variant="contained" onClick={() => goToAdminPage(navigate)}>Voltar</Button>

            <ContainerCard onSubmit={()=>sendForm()}>
                
                    <TextField required
                        id="outlined-required"
                        label="Nome Obra"
                        type={'text'}
                        name={"nome_obra"}
                        onChange={handleInputChange}
                        value={form.nome_obra}
                    />

                    <TextField required
                        id="outlined-required"
                        label="Quantidade Andares"
                        name={"qty_andares"}
                        onChange={handleInputChange}
                        value={form.qty_andares}
                        placeholder={"Quantidade de andares"}
                    />

                    <TextField required
                        id="outlined-required"
                        label="Quantidade total de apartamentos"
                        name={"qty_total_ap"}
                        onChange={handleInputChange}
                        value={form.qty_total_ap}
                    />

                    <TextField required
                        id="outlined-required"
                        label="Quantidade aparrtamento por andar"
                        name={"qty_ap_andar"}
                        onChange={handleInputChange}
                        value={form.qty_ap_andar}
                    />

                    <TextField required
                        id="outlined-required"
                        label="Nome do cliente"
                        name={"responsavel"}
                        onChange={handleInputChange}
                        type={'text'}
                        value={form.responsavel}
                    />

                    <Button variant="contained" type="submit">Criar</Button>
                
            </ContainerCard>

        </ContainerGeral>

    )
};
