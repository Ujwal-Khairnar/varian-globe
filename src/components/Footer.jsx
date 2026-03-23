import React from "react";
import "./Footer.css";

/**
 * Footer — bottom tab bar + rotate button
 *
 * Props:
 *   activeTab    {number}   - 0 = globe tab, 1 = challenges tab
 *   onTabChange  {function} - called with the new tab index
 *   isHidden     {boolean}  - hides footer when globe is zoomed in
 *   onRotate     {function} - called when rotate button is clicked
 */
function Footer({ activeTab, onTabChange, isHidden, onRotate }) {
  const tabs = ["What your peers have achieved", "What challenges are you facing"];

  return (
    <div className={`footer-ui${isHidden ? " hidden" : ""}`}>
      <div className="tab-group">
        {tabs.map((label, i) => (
          <div
            key={i}
            className={`tab${activeTab === i ? " active" : ""}`}
            onClick={() => onTabChange(i)}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="rotate-status" onClick={onRotate}>
        <span className="rotate-icon">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1.5A6.5 6.5 0 1 1 1.5 8"
              stroke="#00d4ff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M1.5 4V8H5.5"
              stroke="#00d4ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {activeTab === 0 ? "Rotate the globe" : "Rotate the challenges"}
      </div>
    </div>
  );
}

export default Footer;