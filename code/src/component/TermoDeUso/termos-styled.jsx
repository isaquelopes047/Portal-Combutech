import styled from 'styled-components';

export const MainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`

export const HeaderPage = styled.div`
    width: 30vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;

    & > img {
        width: 200px;
    }

    & > div{
        width: 90%;
        height: auto;
    }

    & > div:nth-child(3){
        padding: 10px;
        background-color: #ebebeb;
        border-radius: 10px;

        & > p {
            font-size: 15px;
        }
    }

    @media (max-width: 660px) {
        display: none;
    }
`

export const BodyPage = styled.div`
    width: 70vw;
    height: 100vh;
    background-color: #01395e;
    padding: 30px;
    
    @media (max-width: 660px) {
        width: 100vw;
        height: 100vh;
    }

    & > div {
        width: 100%;
        height: 100%;
        background-color: #fff;
        overflow: scroll;

        & > div:nth-child(1){
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 30px;

            & > p {
                font-size: 20px;
                margin-left: 10px;
            }
        }

        & > div:nth-child(2){
            padding: 30px;

            & > section {
                background-color: #f7f7f7;
                margin: 10px 0;
                padding: 10px;
                border-radius: 10px;
            }
        }
    }

`