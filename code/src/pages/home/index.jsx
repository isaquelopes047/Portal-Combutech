import React, { useEffect } from "react";
import ProgressCom from "../../component/home/ProgressCom";
import SalesCharts from "../../component/home/SalesCharts";
import Layout from "../../component/home/Layout";
import BodyWrapper from "../../component/home/BodyWrapper";
import useMenu from "../../hooks/useMenu";
import ChartDolar from "../../component/home/DolarChart";

function Home() {
  useMenu();
  return (
    <Layout>
      <BodyWrapper>
        <ProgressCom />
        <SalesCharts />
        <ChartDolar />
      </BodyWrapper>
    </Layout>
  );
}

export default Home;
