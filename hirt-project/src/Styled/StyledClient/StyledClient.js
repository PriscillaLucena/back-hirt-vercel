import styled from "styled-components";
import { device } from "../../Constants/Query";

export const ContainerGeral = styled.div`
  width: 100%;
  min-height: auto;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: 'Roboto';
  position: absolute;
  `

export const ContainerGrid = styled.div`
    margin: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rem;

    @media ${device.mobileS} {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin: 0rem;
    }

    @media ${device.tablet} {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    @media ${device.laptop} {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
`

export const CardObras = styled.div`
    width: 90%;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    border: 0.1rem solid #c1c1c3 ;
    border-bottom: hidden;
    border-left: hidden;
    border-top: hidden;
    padding: 2rem;
    background: #F5FFFA;

    @media ${device.mobileS} {
        padding: 1rem;
    }

    @media ${device.laptop} {
       width: 80%;
    }
`

export const ContainerText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ButtonsInCard = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
`