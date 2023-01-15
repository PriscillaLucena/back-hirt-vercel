import useForm from "../Hooks/useForm";
import { NewBuild } from "../Hooks/UseRequestNewBuild";

export const NewProject = () => {


    // const [loading, setLoading] = useState();
    // const [erro, setErro] = useState('')
    const [form, handleInputChange] = useForm({
        nome_obra: "", qty_andares: "", qty_ap_andar: "", qty_total_ap: "", responsavel: ""
    });

    const sendForm = (event) => {
        event.preventDefault();
        NewBuild(form);
    };

    return (
        <div>
            <h3>Inclusão de novos Projetos</h3>
            <form onSubmit={sendForm}>

                <input type={'text'}
                    name={"nome_obra"}
                    onChange={handleInputChange}
                    value={form.nome_obra} 
                    placeholder ={"Nome da obra"}
                    required />
                    
                <input name={"qty_andares"}
                    onChange={handleInputChange}
                    value={form.qty_andares}
                    placeholder={"Quantidade de andares"}
                    required />
                            
                <input name={"qty_total_ap"}
                    onChange={handleInputChange}
                    value={form.qty_total_ap}
                    required 
                    placeholder={"Quantidade total de apartamentos"}
                />
                <input
                    name={"qty_ap_andar"}
                    onChange={handleInputChange}
                    value={form.qty_ap_andar}
                    required 
                    placeholder={"Quantidade aparrtamento por andar"}
                />
                <input name={"responsavel"}
                    onChange={handleInputChange}
                    type={'text'}
                    value={form.responsavel}
                    required
                    pçaceholder={"Nome do cliente"}
                />

                <button type="submit">Criar</button>
            </form>



        </div>
    )
}