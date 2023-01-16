import { useNavigate } from "react-router-dom";
import useForm from "../Hooks/useForm";
import { NewBuild } from "../Hooks/UseRequestNewBuild";
import { goToAdminPage } from "../Routes/RouteFunctions";
import styled from "styled-components";

const ContainerGeral = styled.div`
    display: flex;
    flex-direction: column;
`

export const NewProject = () => {

    const navigate = useNavigate();
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

            <button onClick={() => goToAdminPage(navigate)}>Voltar</button>

            <ContainerGeral onSubmit={sendForm}>


                <input id="standard-basic" label="Standard"
                    type={'text'}
                    name={"nome_obra"}
                    onChange={handleInputChange}
                    value={form.nome_obra}
                    placeholder={"Nome da obra"}
                    required />

                <input id="standard-basic" label="Standard"
                    name={"qty_andares"}
                    onChange={handleInputChange}
                    value={form.qty_andares}
                    placeholder={"Quantidade de andares"}
                    required />

                <input id="standard-basic" label="Standard"
                    name={"qty_total_ap"}
                    onChange={handleInputChange}
                    value={form.qty_total_ap}
                    required
                    placeholder={"Quantidade total de apartamentos"}
                />
                <input id="standard-basic" label="Standard"
                    name={"qty_ap_andar"}
                    onChange={handleInputChange}
                    value={form.qty_ap_andar}
                    required
                    placeholder={"Quantidade aparrtamento por andar"}
                />
                <input id="standard-basic" label="Standard"
                    name={"responsavel"}
                    onChange={handleInputChange}
                    type={'text'}
                    value={form.responsavel}
                    required
                    pçaceholder={"Nome do cliente"}
                />

                <button type="submit">Criar</button>
            </ContainerGeral>



        </div>
    )
}