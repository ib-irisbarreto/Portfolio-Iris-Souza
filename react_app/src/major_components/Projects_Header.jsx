import React from "react";

import { t } from "../translations";

import "./styles/Projects_Header.css";
import "../App.css";


export default function ProjectsHeader() {
  return (
    <section className="projects-hero">
      <h1 className="page-title">{t("projects_header_title")}</h1>
      <p className="primary-text">{t("projects_header_description")}</p>
    </section>
  );
}