import styled from "styled-components";

const ContainerGeral = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    width: 20%;
    height: auto;
`

export const Header = (props) => {

    const role = props.role

    return (
        <ContainerGeral>
             {/* <p>Logado as: {role}</p>  */}
        </ContainerGeral>
    )
};