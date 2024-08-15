import styled from 'styled-components';

export const DefaultCabecalho = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`

export const RowForm = styled.div`
    width: 100%;
    height: auto;
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 606px) {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin: 0;
        padding: 0;

        & > * {
            width: 100%;
            padding-left: 0 !important;
            padding-right: 0 !important;
        }
    }

    & > p {
        font-size: 14px;
        margin: 0;
        padding: 0;
    }
`