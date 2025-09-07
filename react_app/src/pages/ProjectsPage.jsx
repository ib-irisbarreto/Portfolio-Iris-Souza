import React, { useMemo, useState, useEffect, useRef } from "react";

import { t, getSystemLanguage } from "../translations";

import projectsData from "../projectsData";
import ProjectsHeader from "../major_components/Projects_Header";
import ProjectsFilters from "../major_components/Projects_Filters";
import ProjectsGrid from "../major_components/Projects_Grid";
import ProjectsFooter from "../major_components/Projects_Footer";

import "./styles/ProjectsPage.css";

const STORAGE_KEY = "projects_filters";
const EXPIRY_DAYS = 30; // saved filters expire after 30 days; set to null to never expire

function loadSavedFilters() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed) return null;

    if (EXPIRY_DAYS && parsed.timestamp) {
      const ageMs = Date.now() - parsed.timestamp;
      const expiryMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      if (ageMs > expiryMs) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
    }

    return {
      query: parsed.query ?? "",
      typeFilter: parsed.typeFilter ?? "All",
      sortOption: parsed.sortOption ?? "date:desc",
    };
  } catch (err) {
    console.warn("Could not load saved filters:", err);
    return null;
  }
}

function saveFiltersToStorage(filters) {
  try {
    const payload = { ...filters, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn("Could not save filters to storage:", err);
  }
}

export default function ProjectsPage() {
  const lang = getSystemLanguage();

  // try load saved filters on first render
  const saved = typeof window !== "undefined" ? loadSavedFilters() : null;

  // Filter / sort state (defaults, possibly overridden by saved)
  const [query, setQuery] = useState(saved?.query ?? "");
  const [typeFilter, setTypeFilter] = useState(saved?.typeFilter ?? "All");
  const [sortOption, setSortOption] = useState(saved?.sortOption ?? "date:desc");

  // derive types for the select
  const typesAndTags = useMemo(() => {
    const typeSet = new Set(projectsData.map((p) => p.type[lang]));
    const tagSet = new Set();
    projectsData.forEach((p) => {
    if (p.tags && p.tags[lang]) {
      p.tags[lang].forEach((tag) => tagSet.add(tag));
    }
  });
    return [t("projects_filter_all"), ...Array.from(typeSet), ...Array.from(tagSet)]; // "All" + unique types + unique tags
  }, [lang]);

  // Debounce saving to storage so we don't write on every keystroke too aggressively
  const saveTimer = useRef(null);
  useEffect(() => {
    // schedule save after 350ms of idle
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveFiltersToStorage({ query, typeFilter, sortOption });
      saveTimer.current = null;
    }, 350);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [query, typeFilter, sortOption]);

  // filtered + sorted list
  const visible = useMemo(() => {
    let arr = projectsData.slice();

    // name/title query
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter((p) => p.title[lang].toLowerCase().includes(q));
    }

    // type or tag filter
    if (typeFilter !== t("projects_filter_all")) {
      arr = arr.filter(
        (p) =>
          p.type[lang] === typeFilter ||
          (p.tags && p.tags[lang] && p.tags[lang].includes(typeFilter))
      );
    }

    // parse merged sortOption
    const [field, order] = (sortOption || "date:desc").split(":"); // field = "alpha"|"date", order = "asc"|"desc"

    // sorting
    if (field === "alpha") {
      arr.sort((a, b) => a.title[lang].localeCompare(b.title[lang], undefined, { sensitivity: "base" }));
    } else if (field === "date") {
      arr.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }

    // apply order (desc means reversed)
    if (order === "desc") arr = arr.reverse();

    return arr;
  }, [query, typeFilter, sortOption]);

  return (
    <main className="projects-page">
      <ProjectsHeader />
      <ProjectsFilters
        query={query}
        setQuery={setQuery}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        types={typesAndTags}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <ProjectsGrid visible={visible} lang={lang}/>
      <ProjectsFooter count={visible.length} />
    </main>
  );
}
