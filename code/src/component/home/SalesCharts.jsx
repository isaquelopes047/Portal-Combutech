import React from "react";
import GraficoCombustivel from "../../assets/img/combustivel_1.svg";
import GraficoCombustivel2 from '../../assets/img/combustivel_2.svg';
import styled from 'styled-components';

const StyleDash = styled.div`
  width: auto;
  min-height: auto;
  height: auto;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  border-radius: 10px;

    @media (max-width: 606px) {
      width: 100vw;
      flex-direction: column;
    }
`;

const ContagenTanque = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   width: 100px;

    @media (max-width: 606px) {
      display: none;
    }
`

const StyleImg = styled.div`
  @media (max-width: 606px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    background-color: red;
  }

  & > img {
    @media (max-width: 606px) {
      width: 300px;
    }
  }
`

const containerDash = {
  width: '450px',
}

const dadosDash = {
  display: 'flex',
}

function SalesCharts() {
  return (
    <StyleDash data-aos="fade-left">

      {/* Dashboard de galão */}
      <div style={{ ...containerDash }}>
        <div>
          <p style={{ paddingTop: '20px', }}> Abastecimento Externo </p>
        </div>
        <div style={{ ...dadosDash }}>
          <ContagenTanque>
            <p>Cheio -</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>Vazio -</p>
          </ContagenTanque>
          <div>
            <StyleImg>
              <img src={GraficoCombustivel} alt="Teste SVG" />
            </StyleImg>
            <div>
              <p style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', }}> 2.458.100,25 ltrs </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard de galão */}
      <div style={{ ...containerDash }}>
        <div>
          <p style={{ paddingTop: '20px', }}> Abastecimento Interno </p>
        </div>
        <div style={{ ...dadosDash }}>
          <ContagenTanque>
            <p>Cheio -</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>Vazio -</p>
          </ContagenTanque>
          <div>
            <StyleImg>
              <img src={GraficoCombustivel2} alt="Teste SVG" />
            </StyleImg>
            <div>
              <p style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', }}> 2.458.100,25 ltrs </p>
            </div>
          </div>
        </div>
      </div>

    </StyleDash>
  );
}

export default SalesCharts;
