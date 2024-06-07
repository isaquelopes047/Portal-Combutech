import React from "react";
import Layout from "../../../component/home-two/Layout";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import useMenu from "../../../hooks/useMenu";
import MainControleFrotas from "../../../component/Controle/ControleFrotas/ControleFrotas";


export default function ControleFrotas() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Preferencias de Frotas" link="" />
            <MainControleFrotas />
        </Layout>
    );
}