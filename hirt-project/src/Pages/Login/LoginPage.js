import { useNavigate, useParams } from "react-router-dom";
import LoginForm from "./LoginForm";
// import { goToSignUpPage } from "../../Routes/RouteFunctions";

export default function LoginPage (){
    const {type} = useParams()
    const navigate = useNavigate();


    return(
        <div>
            <p>Login Page</p>
            <LoginForm />    

            <p>{type}</p>

            {/* <button onClick={()=>goToSignUpPage(navigate, type)}>Registrar-se</button> */}
        </div>
    )
}