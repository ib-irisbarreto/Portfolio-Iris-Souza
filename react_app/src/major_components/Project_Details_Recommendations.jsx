import React from "react";

import { t } from "../translations";

import ProjectCard from "../minor_components/Project_Card";

import "./styles/Project_Details_Recommendations.css";


export default function ProjectDetailsRecommendations({
  recommendedAll,
  recommendedPages,
  recPage,
  setRecPage,
  recPrev,
  recNext,
  lang
}) {
  if (recommendedAll.length === 0) return null;
  return (
    <section className="project-recommended">
      <div className="recommended-header">
        <div>
          <div className="section-title" style={{ margin: 0 }}>{t("projectsDetails_rec_title")}</div>
          <div className="normal-text-bold">{t("projectsDetails_rec_subtitle")}</div>
        </div>
        {recommendedPages.length > 1 && (
          <div className="recommended-controls">
            <button onClick={recPrev} aria-label="Previous recommendations" className="rec-btn" disabled={recPage === 0}>‹</button>
            <div className="rec-dots">
              {recommendedPages.map((_, i) => (
                <button
                  key={i}
                  className={`rec-dot ${recPage === i ? "active" : ""}`}
                  onClick={() => setRecPage(i)}
                  aria-label={`Go to recommendations page ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={recNext} aria-label="Next recommendations" className="rec-btn" disabled={recPage === recommendedPages.length - 1}>›</button>
          </div>
        )}
      </div>
      <div className="recommended-slider-viewport">
        <div
          className="recommended-slider"
          style={{ width: `${recommendedPages.length * 100}%`, transform: `translateX(-${recPage * (100 / recommendedPages.length)}%)` }}
        >
          {recommendedPages.map((page, pi) => (
            <div key={pi} className="recommended-page" style={{ width: `${100 / recommendedPages.length}%` }}>
              <div className="recommended-grid">
                {page.map((p) => (
                  <div key={p.id} className="recommended-card-wrapper">
                    <ProjectCard project={p} lang={lang} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}