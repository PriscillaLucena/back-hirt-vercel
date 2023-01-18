import { useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { Login } from "../../Hooks/useRequestLogin";
import styled from "styled-components";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';


const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 15rem;
`

const ContainerCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 0.2rem solid #1C284Fff;
    border-radius: 1rem;
    padding: 2.5rem;
    gap: 0.5rem;
    background: white;
    align-items: center;
`

const ContainerButton = styled.div`
  display:flex;
`

export default function LoginForm(props) {
  const [form, handleInputChange] = useForm({ email: "", password: "", role: props.role });
  const navigate = useNavigate();
console.log(form.role)
  const sendForm = (event) => {
    event.preventDefault();
    Login(form, navigate);
  };

  return (

    <ContainerForm onSubmit={sendForm}>
      <ContainerCard>
        <TextField required
          id="outlined-required"
          label="E-mail"
          type={"email"}
          name={"email"}
          value={form.email}
          onChange={handleInputChange}
        />

        <TextField required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name={"password"}
          value={form.password}
          onChange={handleInputChange}
        />
        <ContainerButton>
          <Button variant="contained" type={"submit"}>Entrar</Button>
        </ContainerButton>
      </ContainerCard>
    </ContainerForm>

  )
}