import React from "react";
import Layout from "../../../component/home-two/Layout";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import useMenu from "../../../hooks/useMenu";
import EditarIntegrado from "../../../component/Abastecimentos/Integrados/EditarIntegrado";

export default function AbastecimentosIntegradosEdit() {
    useMenu();

    return (
        <Layout>
            <BreadCrumb title="Cadastro de Abastecimentos Integrados" link="" />
            <EditarIntegrado />
        </Layout>
    );
}