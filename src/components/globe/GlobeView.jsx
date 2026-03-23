import React from "react";
import Globe from "react-globe.gl";
import { latLngToXY, GLOBE_SIZE } from "../../utils/globe";
import "./globe.css";

/**
 * GlobeView — renders the Globe canvas + React pin overlay
 *
 * Props:
 *   globeRef     {ref}      - forwarded ref so parent can call globe methods
 *   pov          {object}   - current { lat, lng, altitude } from rAF poll
 *   activeIndex  {number}   - index of the selected pin (or null)
 *   locations    {array}    - LOCATIONS data array
 *   onPinClick   {function} - called with pin index when a pin is clicked
 */
function GlobeView({ globeRef, pov, activeIndex, locations, onPinClick }) {
  const pinPositions = locations.map((loc) =>
    latLngToXY(loc.lat, loc.lng, pov, GLOBE_SIZE)
  );

  return (
    <div className="globe-viewport">
      <div className="ambient-glow" />

      {/* react-globe.gl canvas — no htmlElementsData, we use React pins instead */}
      <Globe
        ref={globeRef}
        width={GLOBE_SIZE}
        height={GLOBE_SIZE}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="https://unpkg.com/three-globe@2.30.0/example/img/earth-blue-marble.jpg"
        showAtmosphere={true}
        atmosphereColor="#00c8ff"
        atmosphereAltitude={0.25}
      />

      {/* Transparent React overlay — sits above the canvas for reliable click handling */}
      <div className="pin-overlay">
        {locations.map((loc, i) => {
          const pos = pinPositions[i];
          if (!pos) return null; // pin is on the far side of the globe

          return (
            <div
              key={i}
              className={`react-pin${activeIndex === i ? " active" : ""}`}
              style={{ left: pos.x, top: pos.y }}
              onClick={() => onPinClick(i)}
              title={loc.name}
            >
              <div className="pin-pulse" />
              <svg width="28" height="36" viewBox="0 0 28 36">
                <path
                  d="M14 0C7.373 0 2 5.373 2 12c0 9 12 24 12 24S26 21 26 12C26 5.373 20.627 0 14 0z"
                  fill={activeIndex === i ? "#00c8ff" : "#1a2f6e"}
                  stroke="#4facfe"
                  strokeWidth="2"
                />
                <circle cx="14" cy="12" r="5" fill="white" fillOpacity="0.85" />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GlobeView;