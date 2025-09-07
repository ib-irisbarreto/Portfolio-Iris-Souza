import React from "react";
import { useNavigate } from "react-router-dom";

import "./styles/Project_Card.css";


export default function ProjectCard({ project, lang }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <article
      className="project-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      aria-label={`Open project ${project.title[lang]}`}
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.18), rgba(0,0,0,0.18)), url('${project.image}')` }}
    >
      <div className="project-card-inner">
        <div className="project-meta">
          <div className="project-type">{project.type[lang]}</div>
        </div>
        <h3 className="project-title">{project.title[lang]}</h3>
        <div className="project-short">{project.short[lang]}</div>
      </div>
      {project.tags && project.tags[lang] && (
        <div className="project-tags">
          {project.tags[lang].map((tag, idx) => (
            <span className="project-tag" key={idx}>{tag}</span>
          ))}
        </div>
      )}
    </article>
  );
}