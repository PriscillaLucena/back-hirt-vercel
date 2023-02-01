import styled from "styled-components";
// import logo from "../images/logo.jpg";

const ContainerGeral = styled.div`
    display: flex;
    font-family: 'Roboto';
    width: 30%;
    height: auto;
`

// const Image = styled.img`
//     width: 100%;
//     height: auto;  
//     align-items: center;
// `

export const Header = (props) => {

    // const role = props.role

    return (
        <ContainerGeral>
            {/* <Image src={logo} alt="logo"/> */}
             {/* <p>Logado as: {role}</p>  */}
        </ContainerGeral>
    )
};