import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import ProjectDetailsHeader from "../major_components/Project_Details_Header";
import ProjectDetailsContent from "../major_components/Project_Details_Content";
import ProjectDetailsRecommendations from "../major_components/Project_Details_Recommendations";
import ProjectDetailsFooter from "../major_components/Project_Details_Footer";

import projectsData from "../projectsData";

import "./styles/ProjectDetailsPage.css";
import { t, getSystemLanguage } from "../translations";


function inferItem(item) {
  // Accept either a string or an object {type, src}
  if (!item) return null;
  if (typeof item === "string") {
    const lower = item.toLowerCase();
    if (/\.(mp4|webm|ogg)$/.test(lower)) return { type: "video", src: item };
    return { type: "image", src: item };
  }
  if (item.type && item.src) return item;
  // fallback try to infer from src
  return inferItem(item.src);
}

export default function ProjectDetailsPage() {
  const lang = getSystemLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="project-details">
        <h2>{t("projectsDetails_notFound")}</h2>
        <p>{t("projectsDetails_tryReturn")} <Link to="/projects">{t("projectsDetails_projectsList")}</Link>.</p>
      </main>
    );
  }

  // Build normalized carousel items (array of {type, src})
  const itemsRaw = project.carouselItems ?? (project.images ?? (project.image ? [project.image] : []));
  const carouselItems = (itemsRaw || []).map(inferItem).filter(Boolean);

  // carousel state
  const [index, setIndex] = useState(0);
  const slidesCount = carouselItems.length;
  const carouselRef = useRef(null);

  // reset index when project changes (so new project always starts at first media)
  useEffect(() => {
    setIndex(0);
  }, [id]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") navigate('/projects');
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, slidesCount]);

  const prev = () => {
    if (slidesCount <= 0) return;
    setIndex((i) => (i - 1 + slidesCount) % slidesCount);
  };
  const next = () => {
    if (slidesCount <= 0) return;
    setIndex((i) => (i + 1) % slidesCount);
  };
  const goTo = (i) => {
    if (slidesCount <= 0) return;
    setIndex(i % slidesCount);
  };

  // ---------------- Recommendations selection logic ----------------
  // 1) same-type projects (exclude current)
  const sameType = projectsData
    .filter((p) => p.id !== project.id && p.type[lang] === project.type[lang])
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)); // newest first

  // 2) other projects sorted by absolute date difference (closest first)
  const others = projectsData
    .filter((p) => p.id !== project.id && p.type[lang] !== project.type[lang])
    .map((p) => ({ ...p, dateDiff: Math.abs(new Date(p.releaseDate) - new Date(project.releaseDate)) }))
    .sort((a, b) => a.dateDiff - b.dateDiff)
    .map((p) => {
      const { dateDiff, ...rest } = p;
      return rest;
    });

  // combine and dedupe, keeping sameType first
  const combined = [];
  const seen = new Set();
  for (const p of sameType) {
    if (!seen.has(p.id)) {
      combined.push(p);
      seen.add(p.id);
    }
  }
  for (const p of others) {
    if (!seen.has(p.id)) {
      combined.push(p);
      seen.add(p.id);
    }
  }

  const recommendedAll = combined.slice(0, 6); // up to 6

  // split into pages of 3 cards each (1 or 2 pages)
  const recommendedPages = [];
  for (let i = 0; i < recommendedAll.length; i += 3) recommendedPages.push(recommendedAll.slice(i, i + 3));
  // ensure at least one page exists
  if (recommendedPages.length === 0) recommendedPages.push([]);
  const [recPage, setRecPage] = useState(0);

  const recPrev = () => setRecPage((p) => Math.max(0, p - 1));
  const recNext = () => setRecPage((p) => Math.min(recommendedPages.length - 1, p + 1));

  useEffect(() => {
    // reset rec page when project changes
    setRecPage(0);
  }, [id]);

  return (
    <main className="project-details">
      <ProjectDetailsHeader
        project={project}
        carouselItems={carouselItems}
        index={index}
        slidesCount={slidesCount}
        carouselRef={carouselRef}
        prev={prev}
        next={next}
        goTo={goTo}
        lang={lang}
      />
      <ProjectDetailsContent project={project} lang={lang} />
      <ProjectDetailsRecommendations
        recommendedAll={recommendedAll}
        recommendedPages={recommendedPages}
        recPage={recPage}
        setRecPage={setRecPage}
        recPrev={recPrev}
        recNext={recNext}
        lang={lang}
      />
      <ProjectDetailsFooter />
    </main>
  );
}