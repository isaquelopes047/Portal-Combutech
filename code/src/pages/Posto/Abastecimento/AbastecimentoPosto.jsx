import React from "react";
import Layout from "../../../component/home-two/Layout";
import BreadCrumb from "../../../component/home-two/BreadCrumb";
import useMenu from "../../../hooks/useMenu";
import AutorizacaoPosto from "../../../component/Posto/AbastecimentoPosto";


export default function AbastecimentoPosto() {
    useMenu();
    return (
        <Layout>
            <BreadCrumb title="Autorização de abastecimento" link="" />
            <AutorizacaoPosto />
        </Layout>
    );
}