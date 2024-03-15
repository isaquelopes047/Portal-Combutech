import React from "react";
import Layout from "../../../component/home-two/Layout";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import useMenu from "../../../hooks/useMenu";
import MainAbastecimentoNaoIntegrado from "../../../component/Abastecimentos/NaoIntegrados/naointegrados";


export default function AbastecimentosNaoIntegrados() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Seleção de Abastecimentos não integrados" link="" />
            <MainAbastecimentoNaoIntegrado />
        </Layout>
    );
}