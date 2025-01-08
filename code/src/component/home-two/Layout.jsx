import React from "react";
import CardHomologacao from "../cards/homologacoa";

function Layout({ children }) {
  return (
    <section className="crancy-adashboard crancy-show ">
      <div>
        {/* <CardHomologacao /> */}
      </div>
      <div className="container">{children}</div>
    </section>
  );
}

export default Layout;
