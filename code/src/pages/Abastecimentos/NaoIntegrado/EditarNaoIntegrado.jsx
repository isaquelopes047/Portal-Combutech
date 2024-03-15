import React from "react";
import Layout from "../../../component/home-two/Layout";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import useMenu from "../../../hooks/useMenu";
import EditarNaoIntegrado from "../../../component/Abastecimentos/NaoIntegrados/EditarNaoIntegrado";

export default function AbastecimentosNaoIntegradosEdit() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Seleção de Abastecimentos Não Integrados" link="" />
            <EditarNaoIntegrado />
        </Layout>
    );
}