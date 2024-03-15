import React from "react";
import { Link, useLocation } from "react-router-dom";

function Dropdown({ name, options, dropdown, setDropdown, img }) {
  const location = useLocation();

  return (
    <li
      style={{ width: "100%" }}
      className={
        Array.isArray(options) &&
          options.filter((option) => "/" + option.link === location.pathname)
            .length > 0
          ? "active"
          : ""
      }
    >
      <span style={{ width: "100%" }}>
        <Link
          to="#!"
          className={dropdown === name ? "" : "collapsed"}
          data-bs-toggle="collapse"
          data-bs-target="#menu-item__apps"
          onClick={() => setDropdown(name)}
        >
          <span className="menu-bar__text">
            <span className="crancy-menu-icon crancy-svg-icon__v1">{img}</span>
            <span className="menu-bar__name">{name}</span>
          </span>
          <span className="crancy__toggle"></span>
        </Link>
      </span>
      {/* <!-- Dropdown Menu --> */}
      <div
        className={` crancy__dropdown ${
          dropdown === name ? "show" : "collapse"
        }`}
      >
        <ul className="menu-bar__one-dropdown">
          {Array.isArray(options) && options.map((option) => (
            <li key={option.title} onClick={() => setDropdown(name)}>
              <Link to={`/${option.link}`}>
                <span className="menu-bar__text">
                  <span className="menu-bar__name ">{option.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default Dropdown;
