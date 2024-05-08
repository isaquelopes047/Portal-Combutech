import styled from 'styled-components';

export const ButtonAccept = styled.div`
    width: 50px;
    height: 50px;
    background-color: #0a82fd;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: #3772ad
    }
`;

export const ModalMain = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    background-color: #fff;
    box-shadow: 24;
    padding: 25px;

    @media (max-width: 620px) {
        width: 80vw;
    }
`