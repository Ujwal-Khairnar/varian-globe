import React, { useState } from "react";
import "./LocationDetail.css";

/**
 * LocationDetail — full-screen detail modal shown when "Show details" is clicked.
 *
 * Props:
 *   location  {object}   - the active LOCATIONS entry
 *   onClose   {function} - called when ✕ is clicked
 */
function LocationDetail({ location, onClose }) {
  const [activeTab, setActiveTab] = useState("challenges");

  if (!location) return null;

  const tabs = [
    { id: "challenges", label: "Key Challenges" },
    { id: "valueAdds",  label: "Key Value Adds" },
    { id: "testimonial",label: "Testimonial" },
  ];

  return (
    <div className="ld-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ld-modal">

        {/* ── Header bar ── */}
        <div className="ld-header">
          <span className="ld-header-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#00c8ff" strokeWidth="1.8" />
              <path d="M9 9h6M9 13h6M9 17h4" stroke="#00c8ff" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M7 3v18" stroke="#00c8ff" strokeWidth="1.5" />
            </svg>
          </span>
          <span className="ld-header-title">{location.name}</span>
          <button className="ld-close" onClick={onClose}>✕</button>
        </div>

        {/* ── Hero image with story title overlay ── */}
        <div className="ld-hero">
          <img
            src={location.hero_image_url || location.image}
            alt={location.name}
            className="ld-hero-img"
          />
          <div className="ld-hero-overlay">
            <h1 className="ld-hero-title">
              {location.story_title || location.statDesc || location.stat}
            </h1>
          </div>
        </div>

        {/* ── Tab navigation ── */}
        <div className="ld-tabs">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              className={`ld-tab${activeTab === tab.id ? " active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 6 }}>
                  <path d="M2 4l4 4 4-4" stroke="#00c8ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 6 }}>
                  <path d="M4 2l4 4-4 4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        <div className="ld-content">

          {activeTab === "challenges" && (
            <ul className="ld-bullet-list">
              {(location.key_challenges || location.challenges || []).map((item, i) => (
                <li key={i} className="ld-bullet-item">
                  <span className="ld-bullet-dot" />
                  <span>{item}</span>
                </li>
              ))}
              {/* Fallback if no challenges data */}
              {!(location.key_challenges || location.challenges || []).length && (
                <li className="ld-bullet-item">
                  <span className="ld-bullet-dot" />
                  <span>Challenge data not available for this location.</span>
                </li>
              )}
            </ul>
          )}

          {activeTab === "valueAdds" && (
            <ul className="ld-bullet-list">
              {(location.key_value_adds || location.valueAdds || []).map((item, i) => (
                <li key={i} className="ld-bullet-item">
                  <span className="ld-bullet-dot" />
                  <span>{item}</span>
                </li>
              ))}
              {!(location.key_value_adds || location.valueAdds || []).length && (
                <li className="ld-bullet-item">
                  <span className="ld-bullet-dot" />
                  <span>Value add data not available for this location.</span>
                </li>
              )}
            </ul>
          )}

          {activeTab === "testimonial" && (
            <div className="ld-testimonial">
              {(location.testimonial) ? (
                <>
                  <blockquote className="ld-quote">
                    "{location.testimonial.quote}"
                  </blockquote>
                  {(location.testimonial.person_name || location.testimonial.person_role) && (
                    <div className="ld-quote-author">
                      <span className="ld-quote-name">{location.testimonial.person_name}</span>
                      {location.testimonial.person_role && (
                        <span className="ld-quote-role">{location.testimonial.person_role}</span>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <p style={{ color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>
                  No testimonial available for this location.
                </p>
              )}
            </div>
          )}

        </div>

        {/* ── Legal footer ── */}
        <div className="ld-legal">
          The statement by Varian's customer described here is based on results achieved in the customer's unique clinical setting.
          Because there is no "typical" clinical setting and many variables exist, there is no guarantee that other customers will achieve the same results.
        </div>

      </div>
    </div>
  );
}

export default LocationDetail;