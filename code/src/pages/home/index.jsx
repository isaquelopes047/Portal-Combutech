import React, { useState, useEffect } from 'react';
import ProgressCom from "../../component/home/ProgressCom";
import SalesCharts from "../../component/home/SalesCharts";
import Layout from "../../component/home/Layout";
import BodyWrapper from "../../component/home/BodyWrapper";
import useMenu from "../../hooks/useMenu";
import RankingProdutos from "../../component/home/DolarChart";
import RankingMotoristas from "../../component/home/RankingMotorista";
import Cookies from 'js-cookie';
import MapCombutech from "../../component/home/MapCombutech";
import MenuDateGraf from "../../component/menu/MenuDatesGraf";
import RankingPostos from '../../component/home/RankingPostos';

function Home() {
  useMenu();

  const transportadoraId = String(Cookies.get('transportadoraId'));
  const StrickPosto = Cookies.get('__StrictModePosto');
  const [amountAdriver, setAmountAdriver] = useState(localStorage.getItem('amountDriverRanking'));
  const [nomeRazao, setNomeRazao] = useState(localStorage.getItem('razaoNome'))
  const [startDate, setStartDate] = useState(localStorage.getItem('startDate'));
  const [endDate, setEndDate] = useState(localStorage.getItem('endDate'));

  useEffect(() => {
    const updateDates = () => {
      const savedStartDate = localStorage.getItem('startDate');
      const savedEndDate = localStorage.getItem('endDate');
      const savedAmountAdriver = localStorage.getItem('amountDriverRanking');

      setStartDate(savedStartDate);
      setEndDate(savedEndDate);
      setAmountAdriver(savedAmountAdriver);
    };

    updateDates();
    const interval = setInterval(updateDates, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Layout>
      <BodyWrapper>
        {StrickPosto == 1 ? (
          <div style={{ marginTop: '70px', padding: '30px', }}>
            <h1 className="welcome-title">Bem vindo, {nomeRazao}</h1>

            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
              <p className="welcome-message">Estamos felizes em tê-lo aqui.</p>
              <p className="welcome-message">Duvidas sobre algum procedimento? entre em contato com a Combutech em nosso canais de atendimento</p>
            </div>

            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
              <p className="welcome-message" style={{fontSize: '13px',}}>Ultima atualização 28/01/2025 - 13:53</p>
              <p className="welcome-message" style={{fontSize: '13px',}}>V 7.12.3</p>
            </div>
          </div>
        ) : (
          <div>

            <MenuDateGraf />

            <SalesCharts />

            {/* Grafico de ranking de produtos */}
            <RankingProdutos
              transportadoraId={transportadoraId}
              dataInicial={startDate}
              dataFinal={endDate}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
              <RankingMotoristas
                transportadoraId={transportadoraId}
                dataInicial={startDate}
                dataFinal={endDate}
                quantidadeRegistro={amountAdriver}
              />

              <RankingPostos
                transportadoraId={transportadoraId}
                dataInicial={startDate}
                dataFinal={endDate}
                quantidadeRegistro={amountAdriver}
              />
            </div>

            <MapCombutech />
          </div>
        )}

      </BodyWrapper>
    </Layout>
  );
}

export default Home;
