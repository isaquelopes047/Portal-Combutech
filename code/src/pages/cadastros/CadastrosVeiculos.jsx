import React from "react";
import Layout from "../../component/home-two/Layout";
import BreadCrumb from "../../component/home-two/BreadCrumb";
import useMenu from "../../hooks/useMenu";
import MainCadastroVeiculo from "../../component/cadastros/CadastrosVeiculos/CadastroVeiculos";

export default function CadastrosVeiculos(){
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Seleção de Veículos" link="" />
            <MainCadastroVeiculo />
        </Layout>
    );
}