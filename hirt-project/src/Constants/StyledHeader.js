import styled from "styled-components";
import { device } from "./Query";

export const ContainerGeral = styled.div`
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

export const Image = styled.img`
    
    /* top: 5%; */
    margin-left: 25%;
    position: absolute;

    @media ${device.mobileS} {
        margin-left: 1%;
        width: 5%;
        height: auto; 
    }

    @media ${device.tablet} {
        top: 5%;
        width: 7%;
        height: auto; 
    }

    @media ${device.mobileM} {
        top: 7%;
        width: 5%;
        height: auto; 
    }

    @media ${device.laptop} {
        margin-left: 25%;
        top: 5%;
        width: 7%;
        height: auto;    
    }
`

export const Linha = styled.hr`
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
