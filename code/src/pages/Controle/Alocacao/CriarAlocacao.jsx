import React from "react";
import Layout from "../../../component/home-two/Layout";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import useMenu from "../../../hooks/useMenu";
import MainCriarAlocacao from "../../../component/Controle/AlocacaoVeiculo/CriarAlocacao/CriarAlocacao";

export default function CriarAlocacao() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Criar alocação de veículo" link="" />
            <MainCriarAlocacao />
        </Layout>
    );
}