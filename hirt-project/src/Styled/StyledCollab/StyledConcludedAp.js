import styled from "styled-components";
import { device } from "../../Constants/Query";

export const ContainerGeral = styled.div`
  min-width: 100%;
  min-height: 96vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto';

  @media ${device.mobileS}{
        margin-top: 2rem;
 }

  @media ${device.laptop}{
        margin-top: 2rem;
 }

  @media ${device.laptopL}{
    justify-content: space-around;
}
`

export const ContainerCard = styled.div`
    margin-top: 0.75rem;
    width: 50%;
    display: flex;
    flex-direction: column;
    border: 0.2rem solid #1C284Fff;
    border-radius: 1rem;
    padding: 2.5rem;
    gap: 0.5rem;
    background: #F5FFFA;
    align-items: center;

    @media ${device.mobileS}{
        margin-top: 2rem;
        padding: 1rem;
        width: 70%;
    }

    @media ${device.laptop}{
        margin-top: 2rem;
        width: 60%;
        padding: 2.5rem;
    }
`

export const ContainerUpload = styled.div`
    display: flex;
`