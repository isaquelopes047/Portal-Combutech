import React from "react";
import Layout from "../../../component/home-two/Layout";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import useMenu from "../../../hooks/useMenu";
import ValoresAprovar from "../../../component/Posto/ValoresAprovar/ValoresAprovar";

export default function ValoresAprovarMain() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Negociação de valores" link="" />
            <ValoresAprovar />
        </Layout>
    );
}