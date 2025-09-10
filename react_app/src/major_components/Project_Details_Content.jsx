import React from "react";

import { t } from "../translations";

import "./styles/Project_Details_Content.css";


export default function ProjectDetailsContent({ project, lang }) {
  return (
    <section className="project-details-content">
      <div className="section-title">{t("projectsDetails_content_title")}</div>
      <div className="normal-text-bigger">{project.description[lang]}</div>
    </section>
  );
}
