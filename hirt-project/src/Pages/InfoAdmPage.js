import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Constants/url";
import { EditConstruc, useRequestData, UseRequestData5, useRequestObra } from "../Hooks/UseRequestData";
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import { goToAdminPage, goToInfoAdmPage } from "../Routes/RouteFunctions";
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Header } from "../Constants/Header";
import { CardAps, CardApsgeral, CardCentraliza, CardObras, ContainerGeral, ContainerPorcentagem, Linha } from "../Styled/StyledAdm/StyledInfoAdm";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { useProtectedPage } from "../Hooks/useProtetedPage";
import useForm from "../Hooks/useForm";
import { EditConstruction } from "../Hooks/useEditConstruction";
import axios from "axios";

export const InfoAdmPage = () => {

    useProtectedPage();
    const navigate = useNavigate();
    const { type, obra_id } = useParams();
    const [toggleNomeObra, setToggleNomeObra] = useState(false);
    const [toggleAndar, setToggleAndar] = useState(false);
    const [toggleApAndar, setToggleApAndar] = useState(false);
    const [toggleResponsavel, setToggleResponsavel] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [erroEdit, setErroEdit] = useState(false);
    const [data5, setData5] = useState(undefined)
    const [data2, setData2] = useState(false)
    const [form, handleInputChange, clear] = useForm({
        nome_obra: "", qty_andares: "", qty_ap_andar: "", responsavel: ""
    });
 
    let total = '';
    let apLimpGrossa = [];
    let apLimpFina = [];
    let apConcluded = [];
    let apConcluded2 = [];
    let apLimpFina2 = [];
    let apLimpGrossa2 = [];


    const GetInfo = () => {
       
        const token = localStorage.getItem("token");
        console.log(token)
        
            
            axios.get(`${BASE_URL}/construction/info/${obra_id}`, {
                headers: {
                    authorization: token
                }
            }).then((response) => {
               
                setData5(response.data.apartments)
        
            }).catch((error) => {
                console.log(error.response);
               
            });

    }

    useEffect(()=>{
        GetInfo()
    }, [data2])

    const inf = !!data5 ? data5 : []
    const info = inf
 
    const funcLimpeza = (limpeza_completa) => {
        if (limpeza_completa === 1) {
            apLimpGrossa2 = [...apLimpGrossa, limpeza_completa]
            apLimpGrossa = apLimpGrossa2
            return "Limpeza Grossa"
        } else if (limpeza_completa === 2) {
            apLimpFina2 = [...apLimpFina, limpeza_completa]
            apLimpFina = apLimpFina2
            return "Limpeza Fina"
        } else if (limpeza_completa === 3) {
            apConcluded2 = [...apConcluded, limpeza_completa]
            apConcluded = apConcluded2
            return "Pronto para Entrega"
        }
    };

    const editInput = (nome) => {
        console.log('nome', nome)
        return <TextField fullWidth required
            id="outlined-required"
            type={'text'}
            name={nome}
            value={form.nome}
            onChange={handleInputChange}
        />
    }



    const sendForm = () => {
        // setLoadingEdit(true)
        const token = localStorage.getItem("token");

        axios.put(`${BASE_URL}/construction/editConstruction/${obra_id}`, form, {
            headers: {
                authorization: token
            }
        }).then(() => {
            // setLoadingEdit(false);
            alert("Obra Editada")
            setToggleAndar(false)
            setToggleApAndar(false)
            setToggleNomeObra(false)
            setToggleResponsavel(false)
            setData2(!data2)
        }).catch((error) => {
            setErroEdit(error.response);
            alert("Obra não pode ser Editada!")
            setLoadingEdit(false);
        });
    };

    


    const setaNomeobra = () => {
        setToggleNomeObra(!toggleNomeObra)
    };

    const setaAndar = () => {
        setToggleAndar(!toggleAndar)
    };

    const setaApAndar = () => {
        setToggleApAndar(!toggleApAndar)
    };

    const setaResponsavel = () => {
        setToggleResponsavel(!toggleResponsavel)
    }

    const listaObra = () => {
        return <CardCentraliza>
            <CardObras>
                <h3>{info.nome_obra} <span>
                    <EditIcon fontSize="small" sx={{ color: '#1D2854ff' }} onClick={() => setaNomeobra()} />
                    {toggleNomeObra ? editInput("nome_obra") : ""}</span>
                </h3>
                <h4><strong>Total de andares:</strong> {info.qty_andares}<span>
                    <EditIcon fontSize="small" sx={{ color: '#1D2854ff' }} onClick={() => setaAndar()} />
                    {toggleAndar ? editInput("qty_andares") : ""}</span>
                </h4>
                <h4><strong>Apartamentos por andar:</strong> {info.qty_ap_andar} <span>
                    <EditIcon fontSize="small" sx={{ color: '#1D2854ff' }} onClick={() => setaApAndar()} />
                    {toggleApAndar ? editInput("qty_ap_andar") : ""}</span>
                </h4>
                <h4><strong>Total de apartamentos:</strong> {total = info.qty_ap_andar * info.qty_andares}</h4>
                <h4><strong>Responsavel:</strong> {info.responsavel}<span>
                    <EditIcon fontSize="small" sx={{ color: '#1D2854ff' }} onClick={() => setaResponsavel()} />
                    {toggleResponsavel ? editInput("responsavel") : ""}</span></h4>

                <Button type={"submit"} variant="contained" size="small" sx={{ height: 20 }}
                    onClick={() => sendForm()} >salvar</Button>
            </CardObras>
        </CardCentraliza>
    };


    const ListInfos = !!data5 && data5.apartamentos.map((info) => {
        return <CardApsgeral key={info.id}>
            <h4>Apartamento: {info.numero_ap}</h4>
            <p>Andar: {info.andar}</p>
            <p>Limpeza: {funcLimpeza(info.limpeza_completa)} </p>
            <p>Data da limpeza: {info.data}</p>
            {/* <DeleteRoundedIcon fontSize="medium" sx={{ color: '#1D2854ff' }} onClick={() => goToDeleteApPage(navigate, info.id)} /> */}
        </CardApsgeral>
    });

    return (
        <ContainerGeral>
            <Header />
            <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => goToAdminPage(navigate, type)}>Voltar</Button>

            {listaObra()}
            <CardCentraliza>
                <p><strong>Faltam {total - apConcluded.length} apartamentos para concluir a obra</strong></p>
                {ListInfos}
                <ContainerPorcentagem>
                    <p><strong>Limpeza fina:</strong> {((apLimpFina.length / total) * 100).toFixed(1)}%</p>
                    <p><strong>Limpeza Grossa:</strong> {((apLimpGrossa.length / total) * 100).toFixed(1)}%</p>
                    <p><strong>Entrega:</strong> {((apConcluded.length / total) * 100).toFixed(1)}%</p>
                </ContainerPorcentagem>
                <Linha></Linha>
                <ContainerPorcentagem>
                    <p><strong>Média de aproveitamento semanal:</strong> {((apConcluded.length / total) / 7 * 100).toFixed(1)}%</p>
                    <p><strong>Média de aproveitamento mensal:</strong> {((apConcluded.length / total) / 30 * 100).toFixed(1)}%</p>
                </ContainerPorcentagem>
                <Linha></Linha>
            </CardCentraliza>

            {/* {!loading && erro && <p>Deu ruim!</p>}
            {loading && loading &&
                <CircularProgress sx={{ color: '#4498C6ff' }} spacing={2} />} */}
        </ContainerGeral>
    )
};
