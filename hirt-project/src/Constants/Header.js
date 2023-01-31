import styled from "styled-components";
import logo from "../images/logo.jpg";

const ContainerGeral = styled.div`
    display: flex;
    font-family: 'Roboto';
    width: 10%;
    height: auto;
    /* position: relative;
    justify-content: flex-start; */
`

export const Header = (props) => {

    const role = props.role

    return (
        <ContainerGeral>
            <img src={logo} alt="logo" width={200} heigth={250} />
             {/* <p>Logado as: {role}</p>  */}
        </ContainerGeral>
    )
};