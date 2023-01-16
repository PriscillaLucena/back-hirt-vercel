import { useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { Login } from "../../Hooks/useRequestLogin";
import styled from "styled-components";

const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 15rem;
`

export default function LoginForm(props) {
  const [form, handleInputChange] = useForm({ email: "", password: "", role: props.role });
  const navigate = useNavigate();

  const sendForm = (event) => {
    event.preventDefault();
    Login(form, navigate);
  };

  return (

    <ContainerForm onSubmit={sendForm}>

      <input
        required
        placeholder={"email@email.com"}
        type={"email"}
        name={"email"}
        value={form.email}
        onChange={handleInputChange}
      />

      <input
        required 
        placeholder={"Mínimo 6 caracteres"}
        type={"password"}
        name={"password"}
        value={form.password}
        onChange={handleInputChange}
      />

      <button type={"submit"}>Entrar</button>
    </ContainerForm>

  )
}