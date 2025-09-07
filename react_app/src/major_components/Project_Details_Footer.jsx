import React from "react";
import { Link } from "react-router-dom";

import { t } from "../translations";
import "./styles/Project_Details_Footer.css";


export default function ProjectDetailsFooter() {
  return (
    <section className="project-details-back">
      <Link to="/projects" className="btn-link">{t("projectsDetails_footer_backToProjects")}</Link>
    </section>
  );
}
