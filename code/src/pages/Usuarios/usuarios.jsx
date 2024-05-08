import React from "react";
import Layout from "../../component/home-two/Layout";
import BreadCrumb from "../../component/home-two/BreadCrumb";
import useMenu from "../../hooks/useMenu";
import ListaUsuarios from "../../component/Usuarios/ListaUsuarios/ListaUsuarios";

export default function MainUsuarios() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Lista de usuarios" link="" />
            <ListaUsuarios />
        </Layout>
    );
}