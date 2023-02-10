import logo from "../images/logo-sem fachadas.jpg";
import { ContainerGeral, Image, Linha } from "./StyledHeader";

export const Header = (props) => {

    // const role = props.role

    return (
        <ContainerGeral>
            <Image src={logo} alt="logo" />
            {/* <p>Logado as: {role}</p>  */}
            <Linha size="10" width="50%"></Linha>
            
        </ContainerGeral>
    )
};