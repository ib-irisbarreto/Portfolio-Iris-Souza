import React from "react";

import { t } from "../translations";

import "./styles/Project_Details_Content.css";


export default function ProjectDetailsContent({ project, lang }) {
  return (
    <section className="project-details-content">
      <div className="section-title">{t("projectsDetails_content_title")}</div>
      <div className="normal-text-bigger">
        {project.description[lang]
        .split(/\n\n/)
        .map((paragraph, idx) => (
          <p className="normal-text-bigger" key={idx}>
            {paragraph.split('\n').reduce((acc, line, i) =>
              i === 0 ? [line] : [...acc, <br key={i} />, line], []
            )}
          </p>
        ))}
      </div>
    </section>
  );
}
