import React, { useEffect } from "react";
import ProgressCom from "../../component/home/ProgressCom";
import SalesCharts from "../../component/home/SalesCharts";
import Layout from "../../component/home/Layout";
import BodyWrapper from "../../component/home/BodyWrapper";
import useMenu from "../../hooks/useMenu";
import RankingProdutos from "../../component/home/DolarChart";
import RankingMotoristas from "../../component/home/RankingMotorista";
import Cookies from 'js-cookie';

function Home() {
  useMenu();

  const transportadoraId = Cookies.get('transportadoraId');
  const StrickPosto = Cookies.get('__StrictModePosto');

  return (
    <Layout>
      <BodyWrapper>

        {/*         {
          transportadoraId == 0 ? null : <ProgressCom />
        }  */}

        { StrickPosto == 1 ? (
          <div style={{marginTop: '90px',}}>
            <h1 className="welcome-title">Bem-vindo, Posto!</h1>
            <p className="welcome-message">Estamos felizes em tê-lo aqui.</p>
          </div>
        ) : (
          <div>
            <SalesCharts />
            <RankingProdutos />
            <RankingMotoristas />
          </div>
        )}

      </BodyWrapper>
    </Layout>
  );
}

export default Home;
