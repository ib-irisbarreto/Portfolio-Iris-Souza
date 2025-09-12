import React from "react";

import { t } from "../translations";

import "./styles/Projects_Footer.css";


export default function ProjectsFooter({ count }) {
  return (
    <section className="projects-footer">
        <div className="normal-text-small" style={{ textAlign: "right" }}>{count} {t("projects_footer_projectsShown")}</div>
    </section>
  );
}