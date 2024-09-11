import React from "react";
import Layout from "../../../component/home-two/Layout";
import useMenu from "../../../hooks/useMenu";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import PrevisaoRoteiro from "../../../component/roteiro/PrevisaoRoteiro";

export default function MainPrevisaoRoteiro() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Previsao de roteiro" link="" />
            <PrevisaoRoteiro />
        </Layout>
    );
}