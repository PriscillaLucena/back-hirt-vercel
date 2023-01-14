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

    const newBuild = (e) => {
        e.preventDefault();

        axios.post(`${BASE_URL}/nova-obra`, form, {
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
            <form {newBuild()}>

<input value={form.nome_obra}></input>
<input value={form.qty_andares}></input>
<input value={form.qty_ap_andar}></input>
<input value={form.qty_total_ap}></input>
<input value={form.responsavel}></input>

<button>Criar</button>
</form>



        </div>
    )
}