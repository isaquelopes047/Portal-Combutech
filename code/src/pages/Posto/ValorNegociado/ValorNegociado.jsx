import React from "react";
import Layout from "../../../component/home-two/Layout";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import useMenu from "../../../hooks/useMenu";
import ValoresNegociados from "../../../component/Posto/ValoresNegociados/ValoresNegociados";


export default function ValorNegociado() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Valores negociados" link="" />
            <ValoresNegociados />
        </Layout>
    );
}