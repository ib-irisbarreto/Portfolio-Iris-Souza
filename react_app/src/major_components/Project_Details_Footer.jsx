import React from "react";
import { Link } from "react-router-dom";

import { t } from "../translations";
import "./styles/Project_Details_Footer.css";


export default function ProjectDetailsFooter() {
  return (
    <section className="project-details-back">
      <Link to="/projects" className="btn-link">
        <div className="normal-text-bold" style={{ color: "#fff" }}>{t("projectsDetails_footer_backToProjects")}</div>
      </Link>
    </section>
  );
}
