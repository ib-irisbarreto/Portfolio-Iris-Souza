import React from "react";

import { t } from "../translations";

import "./styles/Project_Details_Content.css";


export default function ProjectDetailsContent({ project, lang }) {
  return (
    <section className="project-details-content">
      <h2>{t("projectsDetails_content_title")}</h2>
      <p>{project.description[lang]}</p>
    </section>
  );
}
