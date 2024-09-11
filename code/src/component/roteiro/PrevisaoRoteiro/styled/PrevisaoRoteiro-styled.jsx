import styled from 'styled-components';

export const MainContainer = styled.div`
    width: auto;
    height: auto;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-wrap: wrap;

    & > ul {
        width: auto;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 20px;
    }
`

export const ShareButton = styled.a`
    width: 180px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #585858;
    margin-top: 20px;
    gap: 5px;

    & > p {
        color: black;
        font-size: 13px;
    }
`
