import styled from 'styled-components';

const Maincard = styled.div`
    width: 100%;
    height: 40px;
    background-color: #df1515cf;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 0 0 13px 13px;

    & > p {
        color: #fff;
        font-size: 18px;
        margin-left: 10px;
    }
`

export default function CardHomologacao(){
    return (
        <Maincard>
            <p>Ambiente de homologação</p>
        </Maincard> 
    )
}