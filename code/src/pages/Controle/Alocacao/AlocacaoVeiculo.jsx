import React from "react";
import Layout from "../../../component/home-two/Layout";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import useMenu from "../../../hooks/useMenu";
import MainAlocacaoVeiculo from "../../../component/Controle/AlocacaoVeiculo/AlocacaoViculo";

export default function AlocacaoVeiculo() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Alocação de veiculo" link="" />
            <MainAlocacaoVeiculo />
        </Layout>
    );
}