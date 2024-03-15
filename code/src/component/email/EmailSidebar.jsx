import React from "react";
import SearchInputV3 from "../form/SearchInputV3";
import toggleIcon from "../../assets/img/toggle-icon2.svg";
import { Link } from "react-router-dom";
import { emails } from "../../data/email";

function EmailSidebar() {
  return (
    <div className="col-lg-4 col-md-4 col-12 crancy-email__one">
      <div className="crancy-chatbox__sidebar crancy-chatbox__sidebar--inbox">
        <div className="crancy-chatbox__message--header">
          {/* <!-- Title --> */}
          <h4 className="crancy-chatbox__title">Recent Email</h4>
          {/* <!-- Element Search Form --> */}
          <div className="crancy-element__form mg-top-20">
            <SearchInputV3 />
            <div className="crancy-todolist__button">
              <Link
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#email_modal"
                className="crancy-btn crancy-sbcolor"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.09063 9.90925C7.91001 9.90925 7.77156 9.90925 7.63381 9.90925C5.46709 9.90925 3.30036 9.90995 1.13292 9.90784C0.993067 9.90784 0.849695 9.90854 0.714055 9.87903C0.284645 9.78556 -0.00209685 9.42435 1.15494e-05 8.99849C0.00211995 8.57334 0.292376 8.21424 0.722489 8.12428C0.858129 8.09618 1.0015 8.09828 1.14136 8.09828C3.30809 8.09688 5.47482 8.09758 7.64225 8.09758C7.78 8.09758 7.91775 8.09758 8.09063 8.09758C8.09063 7.924 8.09063 7.78697 8.09063 7.64993C8.09063 5.4363 8.08712 3.22267 8.09274 1.00903C8.09485 0.247964 8.77235 -0.218656 9.39784 0.1032C9.78719 0.303481 9.90596 0.650635 9.90456 1.07017C9.89964 3.26061 9.90245 5.45106 9.90245 7.6408C9.90245 7.77924 9.90245 7.91698 9.90245 8.09828C10.069 8.09828 10.2054 8.09828 10.341 8.09828C12.5548 8.09828 14.7686 8.09547 16.9824 8.10039C17.7478 8.1018 18.2159 8.76729 17.9003 9.39695C17.7042 9.78908 17.3591 9.91276 16.9396 9.91206C14.749 9.90784 12.559 9.90995 10.3684 9.90995C10.23 9.90995 10.0908 9.90995 9.90245 9.90995C9.90245 10.0695 9.90245 10.2051 9.90245 10.34C9.90245 12.4953 9.90245 14.6506 9.90245 16.8052C9.90245 16.9107 9.90737 17.0168 9.89894 17.1215C9.85958 17.6387 9.47444 18.0069 8.98389 17.9999C8.5081 17.9929 8.13491 17.6296 8.09485 17.1306C8.08642 17.0259 8.09134 16.9198 8.09134 16.8144C8.09134 14.671 8.09134 12.5277 8.09134 10.3843C8.09063 10.2438 8.09063 10.1046 8.09063 9.90925Z"
                    fill="white"
                  />
                </svg>
                Compose
              </Link>
            </div>
          </div>
          {/* <!-- End Element Search Form --> */}
        </div>

        {/* <!-- Chatbox List --> */}
        <ul className="crancy-chatbox__list">
         
        </ul>
      </div>
    </div>
  );
}

export default EmailSidebar;
