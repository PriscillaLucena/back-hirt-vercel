import styled from "styled-components";
import { device } from "../../Constants/Query";


export const ContainerForm = styled.form`
  width: 100%
  height: auto;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto';
  align-items: center;

  @media ${device.tablet} {
      width: 65%;
    }

    @media ${device.laptopL} {
      width: 50%;
    }
`

export const ContainerCard = styled.div`
    display: flex;
    width: 90%;
    flex-direction: column;
    border: 0.2rem solid #1C284Fff;
    border-radius: 1rem;
    background: #F5FFFA;
    align-items: center;
    row-gap: 2rem;
    margin-top: 40%;

    @media ${device.mobileS} {
        width: 80%;
        margin-top: 5%;
        padding: 1.5rem;
    }

    @media ${device.mobileM} {
        width: 90%;
        margin-top: 5%;
        padding: 1.5rem;
    }

    @media ${device.tablet} {
        width: 100%;
    }

    @media ${device.laptop} {
        width: 50%;
        margin-top: 2%;
        padding: 2.5rem;
    }
`

export const ContainerButton = styled.div`
  display:flex;
`