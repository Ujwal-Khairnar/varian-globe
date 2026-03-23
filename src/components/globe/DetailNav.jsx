import React from "react";
import "./globe.css";

/**
 * DetailNav — bottom-left navigation shown while a pin is zoomed in
 *
 * Props:
 *   onBack  {function} - go back to globe overview
 *   onPrev  {function} - zoom to previous pin
 *   onNext  {function} - zoom to next pin
 */
function DetailNav({ onBack, onPrev, onNext }) {
  return (
    <div className="detail-nav">

      {/* Back to overview */}
      <button className="back-btn" onClick={onBack}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M9 2L4 7l5 5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to overview
      </button>

      {/* Previous pin */}
      <button className="nav-arrow" onClick={onPrev} title="Previous location">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M9 2L4 7l5 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Next pin */}
      <button className="nav-arrow" onClick={onNext} title="Next location">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M5 2l5 5-5 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

    </div>
  );
}

export default DetailNav;