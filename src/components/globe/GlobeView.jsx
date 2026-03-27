import React from "react";
import Globe from "react-globe.gl";
import { latLngToXY, getGlobeSize } from "../../utils/globe";
import "./globe.css";

/**
 * GlobeView — renders the Globe canvas + React pin overlay
 *
 * Props:
 *   globeRef     {ref}      - forwarded ref so parent can call globe methods
 *   pov          {object}   - current { lat, lng, altitude } from rAF poll
 *   activeIndex  {number}   - index of the selected pin (or null)
 *   isZoomed     {boolean}  - true when a pin is active (changes globe size/position)
 *   locations    {array}    - LOCATIONS data array
 *   onPinClick   {function} - called with pin index when a pin is clicked
 */
function GlobeView({ globeRef, pov, activeIndex, isZoomed, locations, onPinClick }) {
  const globeSize = getGlobeSize(isZoomed);

  const pinPositions = locations.map((loc) =>
    latLngToXY(loc.lat, loc.lng, pov, globeSize)
  );

  return (
    <div className={`globe-viewport${isZoomed ? "" : " overview"}`}>
      <div className="ambient-glow" />

      <Globe
        ref={globeRef}
        width={globeSize}
        height={globeSize}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="https://unpkg.com/three-globe@2.30.0/example/img/earth-blue-marble.jpg"
        showAtmosphere={true}
        atmosphereColor="#00c8ff"
        atmosphereAltitude={0.25}
      />

      {/* Transparent React overlay */}
      <div className="pin-overlay">
        {locations.map((loc, i) => {
          const pos = pinPositions[i];
          if (!pos) return null;

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