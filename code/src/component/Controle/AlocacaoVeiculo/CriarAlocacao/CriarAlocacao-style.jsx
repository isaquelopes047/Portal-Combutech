import styled from 'styled-components';

export const MainCriarAlocacaoStyle = styled.div`
    height: auto;
    display: flex;
    justify-content:space-around;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    & > div{
        width: 48%;
        height: auto;
        display: flex;
        flex-direction: column;

        @media (max-width: 768px) {
            width: 100%;
            margin-top: 20px;
        }

        & > span {

            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 0;
            padding: 0;

            & > p {
                margin-left: 10px;
                padding: 20px 0;
            }
        }

        & > div {
            width: 100%;
            height: auto;
            background-color: #ffffff;
            border: 1px solid #f1f1f1;
            border-radius: 8px;

            & > div:nth-child(1){
                padding: 20px 20px 0px 20px;
            }

            & > div {
                height: auto;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 20px;

                & > p {
                    margin: 0px 0 0 0;
                }
            }
        }
    }
`;

export const ContainerButtonSend = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    width: auto;
    height: 70px;
    margin-left: 30px;

    @media (max-width: 768px) {
        width: 100%;
    }

    & > button:nth-child(1) {
        margin-left: -10px;
        height: 40px;
        width: 200px;

        @media (max-width: 768px) {
            margin-left: -30px;
        }
    }

    & > button:nth-child(2) {
        height: 40px;
        width: 100px;
        margin-left: 10px;
        background-color: #c4c41b;

        @media (max-width: 768px) {
            margin-left: -30px;
        }
    }
`

export const ContainerInfo = styled.div`
    width: 90%;
    margin-top: 20px;
    padding-left: 30px;
`