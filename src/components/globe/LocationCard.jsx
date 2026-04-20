import React from "react";
import "./globe.css";

/**
 * LocationCard — slide-in popup card shown after zooming into a pin
 *
 * Props:
 *   location        {object}   - the active LOCATIONS entry (name, image, stat, statDesc)
 *   visible         {boolean}  - controls the CSS transition (false = off-screen, true = visible)
 *   onClose         {function} - called when ✕ is clicked
 *   onShowDetails   {function} - called when "Show details" is clicked
 */
function LocationCard({ location, visible, onClose, onShowDetails }) {
  if (!location) return null;

  return (
    <div className={`info-card${visible ? " visible" : ""}`}>

      {/* Header row: icon + hospital name + close button */}
      <div className="card-header">
        <span className="card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#00c8ff" strokeWidth="1.8" />
            <path d="M9 9h6M9 13h6M9 17h4" stroke="#00c8ff" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 3v18" stroke="#00c8ff" strokeWidth="1.5" />
          </svg>
        </span>
        <span className="card-title">{location.name}</span>
        <button className="card-close" onClick={onClose}>✕</button>
      </div>

      {/* Hospital photo */}
      <div className="card-image">
        <img src={location.image_url || location.image} alt={location.name} />
      </div>

      {/* Stat + description + CTA */}
      <div className="card-body">
        <div className="card-stat">{location.stat}</div>
        <div className="card-stat-desc">{location.statDesc || location.stat_desc}</div>
        <button className="card-cta" onClick={onShowDetails}>
          <span>›</span> Show details
        </button>
      </div>

    </div>
  );
}

export default LocationCard;