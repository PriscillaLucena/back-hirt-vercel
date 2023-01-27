import { useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { Login } from "../../Hooks/useRequestLogin";
import styled from "styled-components";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import SendIcon from '@mui/icons-material/Send';

const ContainerForm = styled.form`
  width: 100%
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 15rem;
  font-family: 'Roboto';
`

const ContainerCard = styled.div`
    display: flex;
    width: 90%;
    flex-direction: column;
    border: 0.2rem solid #1C284Fff;
    border-radius: 1rem;
    padding: 2.5rem;
    background: #F5FFFA;
    align-items: center;
    row-gap: 2rem;
`

const ContainerButton = styled.div`
  display:flex;
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
      <ContainerCard>
        <TextField fullWidth required
          id="outlined-required"
          label="E-mail"
          type={"email"}
          name={"email"}
          value={form.email}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        <TextField fullWidth required
          id="demo-helper-text-misaligned"
          label="Password"
          type="password"
          autoComplete="current-password"
          name={"password"}
          value={form.password}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
        />
        <ContainerButton>
          <Button variant="contained" endIcon={<SendIcon />} type={"submit"}>Entrar</Button>
        </ContainerButton>
      </ContainerCard>
    </ContainerForm>

  )
}