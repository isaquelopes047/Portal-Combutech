import styled from 'styled-components';

export const MainCardTrava = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;

    & > div:nth-child(1){
        width: 100%;
        height: 20%;
        box-shadow: inset 0 -10px 10px rgba(240, 240, 240, 0.3);

        & > div:nth-child(1){

            width: 100px;
            height: 40px;
            background-color: #ffffff;
            margin-top: 1px;
            border-radius: 5px 5px 0 0;
            z-index: 9999;

            border-top: 3px solid #748fc3;
            border-left: 1px solid #e9e9e9;
            border-right: 1px solid #e9e9e9;

            display: flex;
            justify-content: center;
            align-items: center;
            
            & > h4 {
                color: #748fc3;
                font-weight: 400;
                margin: 0;
            }
        }

    }

    & > div:nth-child(2){
        width: 100%;
        height: 80%;
        border: 1px solid #e9e9e9;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        @media (max-width: 785px) {
            flex-direction: column;
        }
    }
`;

export const CardTravaSubMenu = styled.div`
    width: 32%;
    height: 200px;
    margin-left: 15px;
    padding: 15px 0;

    @media (max-width: 785px) {
        width: 90%;
        margin-left: 0px;
    }

    & > div:nth-child(1){
        width: 100%;
        height: 30%;
        background-color: #f8f8f8;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid #e9e9e9;

        & > h4 {
            margin: 0;
            margin-left: 10px;
            font-weight: 400;
            font-size: 13px;
        }
    }

    & > div:nth-child(2){
        width: 100%;
        height: 70%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column ;
        border: 1px solid #e9e9e9;

        & > div{
            width: 100%;
            height: 50%;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            & > p {
                margin: 0;
                margin-left: 20px;
            }
        }
    }
`

export const InputEnvio = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & > button{
        width: 200px;
        height: 40px;
        background-color: #1e56c0;
        color: #fff;
        font-weight: 200;
    }
`

export const MainContainer = styled.div`
    width: 100%;
    height: auto;
    margin-top: 20px;

    @media (max-width: 606px) {
        
    }
`