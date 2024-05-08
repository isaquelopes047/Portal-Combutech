import React from "react";
import Layout from "../../../component/home-two/Layout";
import useMenu from "../../../hooks/useMenu";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import MainListaDeMotoristas from "../../../component/cadastros/Motoristas/ListaMotoristas";


export default function CadastroMotoristas() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Seleção de Motoristas" link="" />
            <MainListaDeMotoristas />
        </Layout>
    );
}