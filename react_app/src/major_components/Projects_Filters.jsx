import React from "react";
import "./styles/Projects_Filters.css";

import { t } from "../translations";


export default function ProjectsFilters({
  query,
  setQuery,
  typeFilter,
  setTypeFilter,
  types,
  sortOption,
  setSortOption,
}) {
  return (
    <section className="projects-controls">
      <div className="controls-left">
        <label className="control">
          <span className="filters-name">{t("projects_filters_search")}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("projects_filters_searchPlaceholder")}
          />
        </label>

        <label className="control">
          <span className="filters-name">{t("projects_filters_type")}</span>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="controls-right">
        <label className="control">
          <span className="filters-name">{t("projects_filters_sort")}</span>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} aria-label="Sort projects">
            <option value="date:desc">{t("projects_filters_sortDateDesc")}</option>
            <option value="date:asc">{t("projects_filters_sortDateAsc")}</option>
            <option value="alpha:desc">{t("projects_filters_sortAlphaDesc")}</option>
            <option value="alpha:asc">{t("projects_filters_sortAlphaAsc")}</option>
          </select>
        </label>
      </div>
    </section>
  );
}