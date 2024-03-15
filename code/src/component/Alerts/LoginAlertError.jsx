import styled from 'styled-components';

const MainErroAlert = styled.div`
    width: 100%;
    height: 100%;
    background-color: #df0a0a50;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;

    & > p {
        color: #fff;
    }
`

export default function AlertLoginError(){
    return (
        <MainErroAlert> 
            <p>Email ou senha incorreto</p>
            <p>Por favor tentar novamente ou verificar</p>
        </MainErroAlert>
    )
}