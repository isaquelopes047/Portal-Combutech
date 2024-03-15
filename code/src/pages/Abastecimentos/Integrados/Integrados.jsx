import React from "react";
import Layout from "../../../component/home-two/Layout";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import useMenu from "../../../hooks/useMenu";
import MainAbastecimentoIntegrado from "../../../component/Abastecimentos/Integrados/integrados";

export default function AbastecimentosIntegrados() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Seleção de Abastecimentos Integrados" link="" />
            <MainAbastecimentoIntegrado />
        </Layout>
    );
}