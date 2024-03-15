import React, { useState, useEffect } from "react";
import ProgressCard from "../cards/ProgressCard";

function ProgressCom() {
  const [dolarValue, setDolarValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
        const jsonData = await response.json();
        const highValue = jsonData.USDBRL.high;
        setDolarValue(highValue);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="row">
      <ProgressCard
        count="Diesel S10"
        name="Total Negociado"
        totalSale="R$ 5.42"
        color="#0A82FD"
      />
      <ProgressCard
        count="Diesel S50"
        name="Total Negociado"
        totalSale="R$ 5.70"
        color="#a81d35"
      />
      <ProgressCard
        count="Arla 32"
        name="Total Negociado"
        totalSale="R$ 4.00"
        color="#139675"
      />
      <ProgressCard
        count="Dolar hoje"
        name=""
        totalSale={`R$ ${dolarValue}`}
        color="#0f6d85"
      />
    </div>
  );
}

export default ProgressCom;
