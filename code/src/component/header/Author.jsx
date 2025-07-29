import React, { useState } from "react";
import profile from "../../assets/img/profile-pic.png";
import { Link } from "react-router-dom";
import { handleUnauthorized } from '../../hooks/LogOut';
import logopng from '../../assets/img/logo.png'

function Author({ subNav, setSubNav, title }) {

  const [storedImage, setStoredImage] = useState(localStorage.getItem('img') || logopng);

  return (
    <div className="crancy-header__author" onMouseOver={() => setSubNav(title)}>
      <Link to="postos/usuario" className="crancy-header__author" onMouseOver={() => setSubNav(title)}>
        <svg
          className="crancy-header__svg--icon"
          width="200"
          height="auto"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '200px', height: '200px' }}
        >
          <image
            href={storedImage}
            width="200"
            height="auto"
            style={{ width: '100%', height: '100%' }}
          />
        </svg>
      </Link>

      
      {/* <!-- crancy Profile Hover --> */}
      <div
        className="crancy-balance crancy-profile__hover fm-hover-animation"
        style={{ display: subNav === title ? "block" : "none", marginTop: '80px', }}
      >
        <h3 className="crancy-balance__title">Meu perfil</h3>
        {/* <!-- crancy Balance List --> */}
        <ul className="crancy-balance_list">
          <li>
            <div className="crancy-balance-info">
              <div className="crancy-balance__img crancy-sbcolor">
                <svg
                  width="14"
                  height="20"
                  viewBox="0 0 14 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.1446 11.7104H3.85544C2.8333 11.7117 1.85337 12.1161 1.1306 12.8351C0.407829 13.5541 0.00123498 14.5288 0 15.5456V19.4473H14V15.5456C13.9988 14.5288 13.5922 13.5541 12.8694 12.8351C12.1466 12.1161 11.1667 11.7117 10.1446 11.7104V11.7104Z"
                    fill="white"
                  />
                  <path
                    d="M7.00041 9.86824C9.64556 9.86824 11.7899 7.80639 11.7899 5.26298C11.7899 2.71956 9.64556 0.657715 7.00041 0.657715C4.35526 0.657715 2.21094 2.71956 2.21094 5.26298C2.21094 7.80639 4.35526 9.86824 7.00041 9.86824Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h4 className="crancy-balance-name">
                <Link to="postos/usuario">Meus dados</Link>
              </h4>
            </div>
          </li>
          <li>
            <div className="crancy-balance-info">
              <div className="crancy-balance__img crancy-color8__bg">
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0478 3.23096L9.75947 8.42357C8.53184 9.62616 6.54449 9.62616 5.31687 8.42357L0.0288576 3.23096C0.0200236 3.3284 0 3.41659 0 3.51346V10.9158C0.00206126 12.6183 1.40725 13.9982 3.14106 14.0002H11.9359C13.6697 13.9982 15.0749 12.6183 15.0769 10.9158V3.51346C15.0766 3.41659 15.0566 3.3284 15.0478 3.23096Z"
                    fill="white"
                  />
                  <path
                    d="M8.95951 7.00639L15.0769 1.46295C14.4742 0.55753 13.3936 0.00284454 12.2264 0H2.85025C1.68334 0.00284454 0.602449 0.55753 0 1.46295L6.11742 7.00639C6.90289 7.71582 8.17372 7.71582 8.95951 7.00639Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h4 className="crancy-balance-name ">
                <Link to="/ajuda">Ajuda</Link>
              </h4>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Author;
