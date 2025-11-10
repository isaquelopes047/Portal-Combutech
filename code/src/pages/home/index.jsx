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
import img from '../../assets/img/YulogLogo.png'

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

<div
  className="crancy-page-inner mg-top-30 partnership-section row"
  style={{ zIndex: 0, maxWidth: '100vw' }}
>
  {/* TEXTO */}
  <div className="col-lg-6 col-md-12 partnership-text">
    <span className="partnership-badge">Parceria Combutech + Yulog</span>

    <h2 className="partnership-title">
      Pagamentos mais simples e seguros para os seus abastecimentos
    </h2>

    <p className="partnership-subtitle">
      A Combutech integra sua operação com a <strong>Yulog</strong>, que facilita o meio de
      pagamento dos clientes, trazendo mais controle e praticidade.
    </p>

    <p className="partnership-description">
      Com essa parceria, você conta com:
    </p>

    <ul className="partnership-list">
      <li>Centralização dos pagamentos de abastecimento.</li>
      <li>Mais visibilidade dos custos e consumo.</li>
      <li>Menos burocracia no dia a dia da operação.</li>
    </ul>

    <p className="partnership-help">
      Em caso de dúvidas sobre o uso da Yulog com a Combutech,
      entre em contato com nossos canais de atendimento.
    </p>
  </div>

  {/* IMAGEM */}
  <div className="col-lg-6 col-md-12 partnership-image-wrapper">
    <div className="partnership-image-card">
      <img
        src={img} // já usando o seu import img
        alt="Parceria entre Combutech e Yulog"
        className="partnership-image"
      />

      <div className="partnership-logos">
        <div>
          <strong>Combutech</strong> • Gestão e tecnologia
        </div>
        <div>
          <strong>Yulog</strong> • Meio de pagamento
        </div>
      </div>

      <p className="partnership-highlight">
        Uma solução integrada para tornar o abastecimento mais simples, seguro e inteligente.
      </p>
    </div>
  </div>
</div>

            <div className="crancy-teams crancy-page-inner mg-top-30 row" style={{ zIndex: '0', maxWidth: '100vw', height: 'auto' }}>
              <p className="welcome-message" style={{ fontSize: '13px', }}>Ultima atualização 10/11/2025</p>
              <p className="welcome-message" style={{ fontSize: '13px', }}>V 1.16.0</p>
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
