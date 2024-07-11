import React from "react";
import Layout from "../../component/home-two/Layout";
import BreadCrumb from "../../component/home-two/BreadCrumb";
import useMenu from "../../hooks/useMenu";
import CriarUsuario from "../../component/Usuarios/CriarUsuario/CriarUsuario";


export default function MainCriarUsuario() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Criar usuario" link="" />
            <CriarUsuario />
        </Layout>
    );
}