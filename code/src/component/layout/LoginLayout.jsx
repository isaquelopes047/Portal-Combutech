import React from "react";
import { Outlet } from "react-router-dom";
import bg from "../../assets/img/credential-bg.svg";
import logoIcon2 from '../../assets/img/logo-icon2.png';
import CardHomologacao from "../cards/homologacoa";

function LoginLayout({ children }) {
  return (
    <div className="body-bg">
      <CardHomologacao />
      <section
        className="crancy-wc crancy-wc__full crancy-bg-cover"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="crancy-wc__form">
                {/* <!-- Welcome Banner --> */}
                <div className="crancy-wc__form--middle">
                  <div className="crancy-wc__banner">
                    <div style={{
                      width: '500px', 
                      height: '600px', 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <img src={logoIcon2} alt="#" style={{width: '350px', height: '180px',}} />
                    </div>
                  </div>
                  <div style={{
                    width: '600px',
                    height: '600px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <div className="crancy-wc__form-inner">
                      {/* <!-- Sign in Form --> */}
                      {children}
                      <Outlet />
                      {/* <!-- End Sign in Form --> */}
                    </div>
                  </div>
                </div>
                {/* <!-- End Welcome Banner --> */}
                {/* <!-- Footer Top --> */}
                <div className="crancy-wc__footer--top">
                  <div className="crancy-wc__footer">

                  </div>
                  <p className="crancy-wc__footer--copyright">
                    @ 2025 <a href="https://www.combutech.com.br">Combutech.</a> Todos os direitos reservados.{" "}
                  </p>
                </div>
                {/* <!-- End Footer Top --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginLayout;
