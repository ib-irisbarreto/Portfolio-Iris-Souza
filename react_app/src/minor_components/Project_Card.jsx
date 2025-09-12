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
          <div className="project-type">
            <div className="normal-text" style={{ color: "#fff" }}>{project.type[lang]}</div>
          </div>
        </div>
        <h3 className="project-title">
          <div className="section-subtitle" style={{ color: "#fff", paddingBottom: "0rem" }}>{project.title[lang]}</div>
        </h3>
        <div className="project-short">
          <div className="normal-text" style={{ color: "#fff", lineHeight: "16px" }}>{project.short[lang]}</div>
        </div>
      </div>
      {project.tags && project.tags[lang] && (
        <div className="project-tags">
          {project.tags[lang].map((tag, idx) => (
            <span className="project-tag" key={idx}>
              <div className="normal-text-small" style={{ color: "#fff" }}>{tag}</div>
            </span>
          ))}
        </div>
      )}
    </article>
  );
}