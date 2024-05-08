import React from "react";
import Layout from "../../component/home-two/Layout";
import BreadCrumb from "../../component/home-two/BreadCrumb";
import useMenu from "../../hooks/useMenu";
import DetalhesUsuarios from "../../component/Usuarios/DetalhesUsusario/DetalheUsuario";

export default function MainDetalheUsuario() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Detalhes de usuario" link="" />
            <DetalhesUsuarios />
        </Layout>
    );
}