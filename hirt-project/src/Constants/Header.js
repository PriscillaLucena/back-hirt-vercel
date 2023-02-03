import styled from "styled-components";
import logo from "../images/logo-sem fachadas.jpg";
import { device } from "../Query";

const ContainerGeral = styled.div`
    display: flex;
    font-family: 'Roboto';
    width: auto;
    max-height: 40%;
    margin-top: 0px;
    position: relative;

    @media ${device.mobileS} {
       align-items: center;
       justify-content: center;
    }

    @media ${device.laptop} {
       align-items: flex-start;
       justify-content: flex-start;
    }
`

const Image = styled.img`
    /* margin-top: 0px; */
    margin-left: 25%;
    position: absolute;

    @media ${device.mobileS} {
        width: 35%;
        height: 45%; 
    }

    @media ${device.tablet} {
        width: 30%;
        height: 55%; 
    }

    @media ${device.laptop} {
        width: 10%;
        height: 43%;    
    }
`

const Linha = styled.hr`
    margin-top: 6rem;
    color: #f00;
    background-color: #747C94ff;
    width: 150rem;

    @media ${device.mobileS} {
        height: 2rem; 
    }

    @media ${device.tablet} {
        height: 5rem; 
    }
`


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