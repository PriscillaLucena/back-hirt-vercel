import styled from "styled-components";
import { device } from "../../Constants/Query";

export const ContainerGeral = styled.div`
  min-width: 100%;
  min-height: 96vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: 'Roboto';

  @media ${device.mobileM} {
        row-gap: 2rem;
        justify-content:  flex-start;
        padding: 1rem;
    }
`

export const ContainerCard = styled.form`
    width: 50%;
    display: flex;
    flex-direction: column;
    border: 0.2rem solid #1C284Fff;
    border-radius: 1rem;
    padding: 2.5rem;
    gap: 0.5rem;
    background: #F5FFFA;
    align-items: center;
    row-gap: 1rem;

    @media ${device.mobileM} {
        row-gap: 2rem;
        padding: 1rem;
    }
`