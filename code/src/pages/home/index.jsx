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

  return (
    <Layout>
      <BodyWrapper>

        {
          transportadoraId == 0 ? null : <ProgressCom />
        } 

        <SalesCharts />
        <RankingProdutos />
        <RankingMotoristas />
      </BodyWrapper>
    </Layout>
  );
}

export default Home;
