import styled from "styled-components";
import { device } from "../../Constants/Query";

export const ContainerGeral = styled.div`
  min-width: 100%;
  min-height: 96vh;
  background-size: cover;
  display: flex;
  align-items: center;
  background: white;
  justify-content: space-around;
  
`

export const Image = styled.img`
    width: 70%;
    height: auto;  
`

export const ContainerCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 0.2rem solid #1C284Fff;
    border-radius: 1rem;
    padding: 2.5rem;
    gap: 0.5rem;
    background: white;
    align-items: center;

    @media ${device.mobileS} {
        width: 70%;
    }

    @media ${device.tablet} {
        width: 70%;
    }

    @media ${device.laptop} {
        width: 40%;
    }
`
export const ContainerButton = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
    align-items: center;

    @media ${device.mobileS} {
        flex-direction: row;
    }

`