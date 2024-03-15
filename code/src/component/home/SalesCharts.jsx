import React from "react";
import GraficoCombustivel from "../../assets/img/combustivel_1.svg";
import GraficoCombustivel2 from '../../assets/img/combustivel_2.svg'

const styleDash = {
  width: 'auto',
  minHeigh: '600px',
  height: 'auto',
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '30px',
  borderRadius: '10px'
}

const containerDash = {
  width: '450px',
}

const dadosDash = {
  display: 'flex',
}

function SalesCharts() {
  return (
    <div style={{ ...styleDash }}>

      {/* Dashboard de galão */}
      <div style={{ ...containerDash }}>
        <div>
          <p style={{ paddingTop: '20px', }}> Abastecimento Externo </p>
        </div>
        <div style={{ ...dadosDash }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'column', width: '100px' }}>
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
          </div>
          <div>
            <div>
              <img src={GraficoCombustivel} alt="Teste SVG" />
            </div>
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'column', width: '100px' }}>
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
          </div>
          <div>
            <div>
              <img src={GraficoCombustivel2} alt="Teste SVG" />
            </div>
            <div>
              <p style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', }}> 2.458.100,25 ltrs </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SalesCharts;
