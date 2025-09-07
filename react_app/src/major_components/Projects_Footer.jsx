import React from "react";

import { t } from "../translations";

import "./styles/Projects_Footer.css";


export default function ProjectsFooter({ count }) {
  return (
    <section className="projects-footer">
      <small>{count} {t("projects_footer_projectsShown")}</small>
    </section>
  );
}