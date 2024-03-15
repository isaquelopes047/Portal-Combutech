import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoWhite from "../../assets/img/logo-white.png";
import logo from "../../assets/img/logo.png";
import logoIcon from "../../assets/img/logo-icon.png";
import arrowIcon from "../../assets/img/arrow-icon.svg";
import Dropdown from "./Dropdown";

/* icons menus lateral */
import { IoDocumentTextOutline } from "react-icons/io5";

function Menu({ toggleMenu, menu }) {
  const location = useLocation();
  const [dropdown, setDropdown] = useState(false);
  const [menuOptions, setMenuOptions] = useState(() => {
    const modulosRecuperados = JSON.parse(localStorage.getItem('optionsMenu'));
    return modulosRecuperados;
  });

  useEffect(() => {
    const handleGetMenu = () => {
      const modulosRecuperados = JSON.parse(localStorage.getItem('optionsMenu'));
      if (modulosRecuperados) {
        setMenuOptions(modulosRecuperados);
      }
    }
    handleGetMenu();
  }, []);

  const handleDropdown = (name) => {
    setDropdown(name === dropdown ? "" : name);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('emailUsuario');
  }

  /* Recuperar o login do usario salvo no localstorage*/
  const user = localStorage.getItem('emailUsuario')

  return (
    <div className={`crancy-smenu ${menu && "crancy-close"}`} id="CrancyMenu">
      {/* <!-- Admin Menu --> */}
      <div className={`admin-menu ${dropdown ? "no-overflow" : ""}`}>
        {/* <!-- Logo --> */}
        <div className="logo crancy-sidebar-padding pd-right-0">
          <Link className="crancy-logo" to="/">
            {/* <!-- Logo for Default --> */}
            <img className="crancy-logo__main" src={logo} alt="#" />
            <img className="crancy-logo__main--dark" src={logoWhite} alt="#" />
            {/* <!-- Logo for Dark Version --> */}
            <img className="crancy-logo__main--small" src={logoIcon} alt="#" />
            <img
              className="crancy-logo__main--small--dark"
              src={logoIcon}
              alt="#"
            />
          </Link>
          <div
            id="crancy__sicon"
            className="crancy__sicon close-icon"
            onClick={toggleMenu}
          >
            <img src={arrowIcon} />
          </div>
        </div>

        {/* <!-- Main Menu --> */}
        <div className="admin-menu__one crancy-sidebar-padding mg-top-20">
          <h4 className="admin-menu__title">
            {user}
          </h4>
          {/* <!-- Nav Menu --> */}
          <div className="menu-bar">
            <ul id="CrancyMenu" className="menu-bar__one crancy-dashboard-menu">

              {/* Menu lateral opção Dashboard */}
              <Dropdown
                name="Dashboards"
                dropdown={dropdown}
                setDropdown={handleDropdown}
                options={[
                  { link: "./auth", title: "Dashboard" },
                ]}
                img={
                  <svg
                    className="crancy-svg-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 4C2 2.89543 2.89543 2 4 2H8C9.10457 2 10 2.89543 10 4V8C10 9.10457 9.10457 10 8 10H4C2.89543 10 2 9.10457 2 8V4Z"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M22 6C22 8.20914 20.2091 10 18 10C15.7909 10 14 8.20914 14 6C14 3.79086 15.7909 2 18 2C20.2091 2 22 3.79086 22 6Z"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10 18C10 20.2091 8.20914 22 6 22C3.79086 22 2 20.2091 2 18C2 15.7909 3.79086 14 6 14C8.20914 14 10 15.7909 10 18Z"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M14 16C14 14.8954 14.8954 14 16 14H20C21.1046 14 22 14.8954 22 16V20C22 21.1046 21.1046 22 20 22H16C14.8954 22 14 21.1046 14 20V16Z"
                      strokeWidth="1.5"
                    />
                  </svg>
                }
              />

              {menuOptions && menuOptions.map((modulo) => {
                return (
                  <Dropdown
                    key={modulo.id}
                    name={modulo.nome}
                    dropdown={dropdown}
                    setDropdown={handleDropdown}
                    img={<IoDocumentTextOutline />}
                    options={modulo.items.length > 0 && modulo.items[0].menu.map((menuItem) => ({
                      link: `${menuItem.url}`,
                      title: menuItem.nome.trim(),
                    }))}
                  />
                );
              })}

            </ul>
          </div>
          {/* <!-- End Nav Menu --> */}
        </div>

        <div className="crancy-sidebar-padding pd-btm-40">
          <h4 className="admin-menu__title">Outras opções</h4>
          {/* <!-- Nav Menu --> */}
          <div className="menu-bar">
            <ul className="menu-bar__one crancy-dashboard-menu" id="CrancyMenu">
              <li>
                <Link to="/" className="collapsed">
                  <span className="menu-bar__text">
                    <span className="crancy-menu-icon crancy-svg-icon__v1">
                      <svg
                        className="crancy-svg-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="20"
                        viewBox="0 0 24 20"
                        fill="none"
                      >
                        <path
                          d="M20.7998 12L22.2927 10.5071C22.6832 10.1166 22.6832 9.48342 22.2927 9.09289L20.7998 7.6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.9 9.8H13.1M5.4 18.6C2.96995 18.6 1 16.6301 1 14.2V5.4C1 2.96995 2.96995 1 5.4 1M5.4 18.6C7.83005 18.6 9.8 16.6301 9.8 14.2V5.4C9.8 2.96995 7.83005 1 5.4 1M5.4 18.6H14.2C16.6301 18.6 18.6 16.6301 18.6 14.2M5.4 1H14.2C16.6301 1 18.6 2.96995 18.6 5.4"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span className="menu-bar__name" onClick={logout}>Sair</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
