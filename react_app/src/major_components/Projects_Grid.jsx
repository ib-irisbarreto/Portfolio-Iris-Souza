import React from "react";
import ProjectCard from "../minor_components/Project_Card";

import { t } from "../translations";

import "./styles/Projects_Grid.css";


export default function ProjectsGrid({ visible, lang }) {
  return (
    <section className="projects-grid-section">
      {visible.length === 0 ? (
        <div className="no-results">{t("projects_grid_noResults")}</div>
      ) : (
        <div className="projects-grid">
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} lang={lang}/>
          ))}
        </div>
      )}
    </section>
  );
}
