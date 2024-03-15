import React from "react";
import Layout from "../../../component/home-two/Layout";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import useMenu from "../../../hooks/useMenu";
import CriarAbastecimentoIntegrado from "../../../component/Abastecimentos/Integrados/CriarAbastecimento";


export default function CriarAbastecimento() {
    useMenu();

    return (
        <Layout>
            <BreadCrumb title="Cadastro de Abastecimentos Integrados" link="" />
            <CriarAbastecimentoIntegrado />
        </Layout>
    );
}