import { useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { Login } from "../../Hooks/useRequestLogin";

export default function LoginForm(){
    const [form, handleInputChange] = useForm({ email: "", password: "" });
    const navigate = useNavigate();
    
    const sendForm = (event) => {
      event.preventDefault();
      Login(form, navigate);
    };
    return(
        <form onSubmit={sendForm}>
        <input 
        placeholder={"email@email.com"}
        type={"email"}
        name={"email"}
        value={form.email}
        onChange={handleInputChange}
        required
        />

        <input 
        placeholder={"Mínimo 6 caracteres"}
        type={"password"}
        name={"password"}
        value={form.password}
        onChange={handleInputChange}
        required
        />

        <button type={"submit"}>Entrar</button>
    </form>

    )
}