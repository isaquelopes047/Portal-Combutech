import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "../menu";
import Header from "../header";

function Layout({ children }) {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };
  useEffect(() => {
    const crancyAdashboard = document.getElementsByClassName("crancy-adashboard")[0];
    if (crancyAdashboard) {
      if (menu) {
        crancyAdashboard.classList.add("crancy-close");
      } else {
        crancyAdashboard.classList.remove("crancy-close");
      }
    }
  }, [menu]);

  return (
    <div id="crancy-dark-light">
      <div className="crancy-body-area ">
        <Menu toggleMenu={toggleMenu} menu={menu} />
        <Header toggleMenu={toggleMenu} menu={menu} />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
