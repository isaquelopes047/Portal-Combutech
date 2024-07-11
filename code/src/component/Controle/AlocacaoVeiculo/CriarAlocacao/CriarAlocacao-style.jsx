import styled from 'styled-components';

export const MainCriarAlocacaoStyle = styled.div`
    height: 600px;
    display: flex;
    justify-content:space-around;

    & > div{
        width: 48%;
        height: 600px;
        display: flex;
        flex-direction: column;

        & > p {
            padding: 20px 0;
        }

        & > div {
            width: 100%;
            height: 500px;
            background-color: #ffffff;
            border: 1px solid #f1f1f1;
            border-radius: 8px;

            & > div {
                min-height: 50px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 10px 25px;

                
                & > p {
                    margin: 10px 0 0 0;
                }
            }
        }
    }
`;