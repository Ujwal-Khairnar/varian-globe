import React, { useState } from "react";
import SolutionIcon from "./SolutionIcon";
import "./SolutionDetail.css";

/**
 * SolutionDetail — full-screen detail view for a single solution.
 *
 * Two layout types:
 *   1. Feature solutions (ARIA CORE, Eclipse, etc.):
 *      Left: scrollable feature list  |  Right: feature content card
 *      Bottom: dot-nav with ◀ ▶ arrows
 *
 *   2. AOS / Deliverables solutions (Database Consolidation, OARS, etc.):
 *      Left: Deliverables bullet list  |  Right: Common Use Cases panel
 */
function SolutionDetail({ solution, allSolutions, onClose, onPrev, onNext, currentIdx }) {
  const [activeFeature, setActiveFeature] = useState(0);
  const isFeatureSolution = Boolean(solution.features);

  return (
    <div className="sd-scene">

      {/* Close button */}
      <button className="sd-close" onClick={onClose}>✕</button>

      {/* Top: icon + title + subtitle */}
      <div className="sd-top">
        <div className="sd-icon-wrap">
          <SolutionIcon type={solution.icon} size={80} />
        </div>
        <h2 className="sd-name">{solution.name}</h2>
        {solution.subtitle && (
          <p className="sd-subtitle">{solution.subtitle}</p>
        )}
      </div>

      {/* Decorative horizontal lines flanking the title block */}
      <div className="sd-dividers">
        <div className="sd-divider-line" />
        <div className="sd-divider-line" />
      </div>

      {/* Main content area */}
      {isFeatureSolution ? (
        <FeatureLayout
          features={solution.features}
          activeFeature={activeFeature}
          onFeatureSelect={setActiveFeature}
        />
      ) : (
        <DeliverablesLayout solution={solution} />
      )}

      {/* Bottom dot-nav + arrows */}
      <div className="sd-bottom-nav">
        <button className="sd-nav-arrow" onClick={onPrev} aria-label="Previous solution">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9l5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="sd-dots">
          {allSolutions.map((_, i) => (
            <div key={i} className={`sd-dot${i === currentIdx ? " active" : ""}`} />
          ))}
        </div>

        <button className="sd-nav-arrow" onClick={onNext} aria-label="Next solution">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

    </div>
  );
}

/* ── Feature layout ─────────────────────────────────── */
function FeatureLayout({ features, activeFeature, onFeatureSelect }) {
  const feature = features[activeFeature];

  return (
    <div className="sd-content">

      {/* Left: scrollable feature list */}
      <div className="sd-feature-list">
        <div className="sd-feature-scroll">
          {features.map((f, i) => (
            <div
              key={i}
              className={`sd-feature-item${i === activeFeature ? " active" : ""}`}
              onClick={() => onFeatureSelect(i)}
            >
              <span>{f.label}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Visual scrollbar indicator */}
        <div className="sd-feature-scrollbar">
          <div
            className="sd-feature-scrollthumb"
            style={{
              // Move thumb proportionally to active feature position
              top: `${(activeFeature / Math.max(features.length - 1, 1)) * 70}%`,
            }}
          />
        </div>
      </div>

      {/* Right: feature content card */}
      <div className="sd-content-area">
        <div className="sd-content-card" key={activeFeature}>

          {/* Heading */}
          <h3 className="sd-feature-heading">{feature.heading}</h3>

          {/* Body paragraph */}
          <p className="sd-feature-body">{feature.body}</p>

          {/* Divider */}
          <div className="sd-feature-divider" />

          {/* Bullet points */}
          <ul className="sd-feature-bullets">
            {feature.bullets.map((bullet, i) => (
              <li key={i}>
                <span className="sd-bullet-dot" />
                {bullet}
              </li>
            ))}
          </ul>

        </div>
      </div>

    </div>
  );
}

/* ── Deliverables layout (AOS solutions) ─────────────── */
function DeliverablesLayout({ solution }) {
  const leftLabel  = solution.leftLabel  || "Deliverables";
  const rightLabel = solution.rightLabel || "Common Use Cases";

  return (
    <div className="sd-content sd-deliverables">

      {/* Left: deliverables / benefits */}
      <div className="sd-deliverables-left">
        <h3 className="sd-section-label">{leftLabel}</h3>
        <ul className="sd-bullet-list">
          {solution.deliverables.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Vertical divider */}
      <div className="sd-vertical-divider" />

      {/* Right: use cases panel */}
      <div className="sd-use-cases">
        <div className="sd-use-cases-box">
          <h3 className="sd-use-cases-title">{rightLabel}</h3>
          <ul className="sd-bullet-list">
            {solution.useCases.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}

export default SolutionDetail;