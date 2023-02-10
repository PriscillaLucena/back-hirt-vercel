import { useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { Login } from "../../Hooks/useRequestLogin";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import SendIcon from '@mui/icons-material/Send';
import { ContainerButton, ContainerCard, ContainerForm } from "../../Styled/StyledLogin/StyledLoginForm";

export default function LoginForm() {
  const [form, handleInputChange] = useForm({ email: "", password: "" });
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