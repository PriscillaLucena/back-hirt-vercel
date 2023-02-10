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

`
export const ContainerGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5rem;

  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 5%;
    } 

  @media ${device.laptop} {
        width: 60%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        margin-top: 5%;
    }
`

export const CardObras = styled.div`
    width: 90%;
    margin-top: 0.85rem;
    display: flex;
    flex-direction: column;
    border: 0.1rem solid #c1c1c3 ;
    border-bottom: hidden;
    border-left: hidden;
    border-top: hidden;
    padding: 2rem;
    background: #F5FFFA;
    column-gap: 0.1rem;
    justify-content: space-around;
`

export const ContainerText = styled.div`
    display: flex;
    justify-content: center;
`

export const ContainerButton = styled.div`
    display: flex;
    justify-content: space-around;
`