import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../Constants/url";

export const NewProject = () => {


    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('')
    const [form, setForm] = useState({
        nome_obra: "",
        qty_andares: "",
        qty_ap_andar: "",
        qty_total_ap: "",
        responsavel: ""
    });

    const newBuild = (e)=> {
        e.preventDefault();
        setLoading(true);

        axios.post(`${BASE_URL}/nova-obra`, form, {
            // headers: {
            //     auth: token,
            //     contentType: "application/json"
            // }

        }).then(() => {
            setLoading(false);
            setForm()
            alert("Informações Salvas, Apartamento Concluído!")
        }).catch(error => {
            setLoading(false)
            setErro(error.response)
            console.log("deu erro!", error.response)
        });
    }

    // const formulary = () => {
    //     return <form {NewBuild}>

    //         <input value={form.nome_obra}></input>
    //         <input value={form.qty_andares}></input>
    //         <input value={form.qty_ap_andar}></input>
    //         <input value={form.qty_total_ap}></input>
    //         <input value={form.responsavel}></input>

    //         <button>Criar</button>
    //     </form>
    // }


    return (
        <div>
            <h3>Inclusão de novos Projetos</h3>
            <form onSubmit={newBuild}>

                <input value={form.nome_obra}>Nome da obra</input>
                <input value={form.qty_andares}>Quantidade Andares</input>
                <input value={form.qty_ap_andar}>Quantidade apartamento por andar</input>
                <input value={form.qty_total_ap}>Quantidade total de apartamentos</input>
                <input value={form.responsavel}>Nome do cliente</input>

                <button type="submit">Criar</button>
            </form>



        </div>
    )
}