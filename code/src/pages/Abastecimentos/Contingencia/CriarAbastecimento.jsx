import React from "react";
import Layout from "../../../component/home-two/Layout";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import useMenu from "../../../hooks/useMenu";
import CriarAbastecimentoContingencia from "../../../component/Abastecimentos/Contingencia/CriarAbastecimento";


export default function CriarAbastecimentoContingenciaMain() {
    useMenu();

    return (
        <Layout>
            <BreadCrumb title="Cadastro de Abastecimentos em Contingência" link="" />
            <CriarAbastecimentoContingencia />
        </Layout>
    );
}