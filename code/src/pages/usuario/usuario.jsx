import React from "react";
import Layout from "../../component/home-two/Layout";
import BreadCrumb from "../../component/home-two/BreadCrumb";
import useMenu from "../../hooks/useMenu";
import InfosUsuario from "../../component/usuario";

export default function Usuario() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Informações do usuario" link="" />
            <InfosUsuario />
        </Layout>
    );
}