import React from 'react';
import { NavLink } from 'react-router-dom';

import { t } from "../translations";
import logo from '/photos/logo.png';
import cvFile from '/files/CV_IRIS_BARRETO_DE_SOUZA.pdf';

import './styles/Navbar.css';


function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </NavLink>
      <div className="navbar-inner">
        <ul className="navbar-menu">
          <li>
            <a
              href={cvFile}
              download
              className="nav-link"
            >
              {t("nav_cv")}
            </a>
          </li>
          {/* <li>
            <NavLink to="/cv" className={({ isActive }) => (isActive ? "active" : "")}>
              {t("nav_cv")}
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              {t("nav_home")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
              {t("nav_projects")}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;