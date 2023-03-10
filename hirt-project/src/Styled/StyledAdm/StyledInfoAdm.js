import styled from "styled-components";
import { device } from "../../Constants/Query";

export const ContainerGeral = styled.div`
  width: 100%;
  min-height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto';
  row-gap: 1rem;
  `
export const CardObras = styled.div`
    display: flex;
    flex-direction: column;
    border: 0.1rem solid #A0a1A4;
    border-top: hidden;
    border-left: hidden;
    border-right: hidden;
    padding: 2rem;
    background: #F5FFFA;
    column-gap: 0.3rem;
    align-items: center;

    @media ${device.mobileS} {
        width: 90%;
        padding: 0.5rem;
        margin-left: 0.5rem;
        margin-top: 1rem;
    }

    @media ${device.mobileM} {
        width: 70%;
        padding: 1rem;
        column-gap: 2rem;
        row-gap: 0.7rem;
        margin: 0;
    }

    @media ${device.tablet} {
        width: 75%;
        margin-left: 2rem;
    } 

    @media ${device.laptop} {
        width: 100%;
        margin-top: 5%;
    }

    @media ${device.laptopL} {
        width: 100%;
        margin-top: 5%;
    }
`

export const CardApsgeral = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    row-gap: 1rem;
    column-gap: 1rem;
    align-items: center;
    border: 0.1rem solid #A0a1A4;
    border-top: hidden;
    border-right: hidden;
    border-left: hidden;
    padding: 2rem;
    background: #F5FFFA;
`

export const CardAps = styled.div`
    width: 30%;
    row-gap: 1rem;
    align-items: center;
  

    @media ${device.mobileS} {
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.2rem;
        column-gap: 0.5rem;
    }

    @media ${device.mobileM} {
        width: 80%;
    }


    @media ${device.tablet} {
        width: 100%;
        padding: 2rem;
        column-gap: 2rem; 
    } 
`

export const CardCentraliza = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Linha = styled.hr`
    width: 100%;
`

export const ContainerPorcentagem = styled.div`
    display: flex;
    column-gap: 2rem;
`