import React from "react";
import Layout from "../../../component/home-two/Layout";
import useMenu from "../../../hooks/useMenu";
import MainPostos from "../../../component/cadastros/Postos/postos";
import BreadCrumb from "../../../component/home-two/BreadCrumb";


export default function CadastrosPostos() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Seleção de Postos" link="" />
            <MainPostos />
        </Layout>
    );
}