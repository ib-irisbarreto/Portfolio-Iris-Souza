import React from "react";

import { t } from "../translations";

import VideoPlayer from "../minor_components/Video_Player";

import "./styles/Project_Details_Header.css";


export default function ProjectDetailsHeader({
  project,
  carouselItems,
  index,
  slidesCount,
  carouselRef,
  prev,
  next,
  goTo,
  lang,
}) {
  return (
    <header className="project-details-hero carousel-hero" aria-roledescription="carousel">
      <div className="carousel-viewport" ref={carouselRef}>
        {carouselItems.length === 0 ? (
          <div className="carousel-empty">{t("projectsDetails_header_noMedia")}</div>
        ) : (
          (() => {
            const it = carouselItems[index];
            if (it.type === "video") {
              return (
                <div
                  className="carousel-slide active"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${slidesCount}`}
                >
                  <VideoPlayer src={it.src} controls />
                </div>
              );
            }
            // image
            return (
              <div
                className="carousel-slide active"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slidesCount}`}
              >
                <img src={it.src} alt="" />
              </div>
            );
          })()
        )}
      </div>
      {project.tags && project.tags[lang] && (
        <div className="project-details-tags">
          {project.tags[lang].map((tag, idx) => (
            <span className="project-details-tag" key={idx}>
              <div className="normal-text-small" style={{ color: "#fff" }}>{tag}</div>
            </span>
          ))}
        </div>
      )}
      <div className="project-details-hero-inner">
        <div className="project-details-type">
          <div className="normal-text" style={{ color: "#fff" }}>{project.type[lang]}</div>
        </div>
        <div className="project-details-title">
          <div className="section-subtitle" style={{ color: "#fff" }}>{project.title[lang]}</div>
        </div>
        <div className="project-date">
          <div className="normal-text-small" style={{ color: "#fff" }}>{t("projectsDetails_header_releaseDate")} {project.releaseDate}</div>
        </div>
        
      </div>
      {slidesCount > 1 && (
        <>
          <button className="carousel-btn prev" onClick={prev} aria-label="Previous media">‹</button>
          <button className="carousel-btn next" onClick={next} aria-label="Next media">›</button>
          <div className="carousel-indicators" role="tablist" aria-label="Select media">
            {carouselItems.map((_, i) => (
              <button
                key={i}
                className={`carousel-indicator ${i === index ? "active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to media ${i + 1}`}
                aria-current={i === index ? "true" : "false"}
              />
            ))}
          </div>
        </>
      )}
    </header>
  );
}
