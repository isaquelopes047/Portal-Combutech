import React from "react";
import Layout from "../../component/home-two/Layout";
import BreadCrumb from "../../component/home-two/BreadCrumb";
import useMenu from "../../hooks/useMenu";

export default function EditarVeiculo() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Edição de Veículos" link="" />
            
        </Layout>
    );
}