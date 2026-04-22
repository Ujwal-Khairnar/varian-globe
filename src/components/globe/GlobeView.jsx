// import React from "react";
// import Globe from "react-globe.gl";
// import { getGlobeSize } from "../../utils/globe";
// import "./globe.css";

// /**
//  * GlobeView — renders the Globe canvas + React pin overlay
//  *
//  * Uses the globe library's own getScreenCoords() method to project
//  * lat/lng to screen pixels — this perfectly matches the internal
//  * Three.js camera so pins never drift as the globe rotates.
//  */
// function GlobeView({ globeRef, pov, activeIndex, isZoomed, locations, onPinClick }) {
//   const globeSize = getGlobeSize(isZoomed);

//   // Use the globe's own projection method if available
//   const getPinPosition = (lat, lng) => {
//     if (globeRef.current && globeRef.current.getScreenCoords) {
//       try {
//         const coords = globeRef.current.getScreenCoords(lat, lng, 0.015);
//         if (coords && coords.x !== undefined) {
//           return { x: coords.x, y: coords.y, visible: true };
//         }
//       } catch (e) {
//         // fall through to null
//       }
//     }
//     return null;
//   };

//   return (
//     <div className={`globe-viewport${isZoomed ? "" : " overview"}`}>
//       <div className="ambient-glow" />

//       <Globe
//         ref={globeRef}
//         width={globeSize}
//         height={globeSize}
//         backgroundColor="rgba(0,0,0,0)"
//         globeImageUrl="https://unpkg.com/three-globe@2.30.0/example/img/earth-blue-marble.jpg"
//         showAtmosphere={true}
//         atmosphereColor="#00c8ff"
//         atmosphereAltitude={0.25}
//       />

//       {/* Transparent React overlay */}
//       <div className="pin-overlay">
//         {locations.map((loc, i) => {
//           const pos = getPinPosition(loc.lat, loc.lng);
//           if (!pos) return null;

//           return (
//             <div
//               key={i}
//               className={`react-pin${activeIndex === i ? " active" : ""}`}
//               style={{ left: pos.x, top: pos.y }}
//               onClick={() => onPinClick(i)}
//               title={loc.name}
//             >
//               <div className="pin-pulse" />
//               <svg width="28" height="36" viewBox="0 0 28 36">
//                 <path
//                   d="M14 0C7.373 0 2 5.373 2 12c0 9 12 24 12 24S26 21 26 12C26 5.373 20.627 0 14 0z"
//                   fill={activeIndex === i ? "#00c8ff" : "#1a2f6e"}
//                   stroke="#4facfe"
//                   strokeWidth="2"
//                 />
//                 <circle cx="14" cy="12" r="5" fill="white" fillOpacity="0.85" />
//               </svg>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default GlobeView;

import React from "react";
import Globe from "react-globe.gl";
import { getGlobeSize } from "../../utils/globe";
import "./globe.css";

const toRad = (d) => (d * Math.PI) / 180;

/**
 * Returns true if the lat/lng point is on the VISIBLE side of the globe
 * given the current camera pov. Uses dot product between the point's
 * surface normal and the camera direction vector.
 */
function isPointVisible(lat, lng, pov) {
  const camLat = toRad(pov.lat ?? 0);
  const camLng = toRad(pov.lng ?? 0);
  const ptLat  = toRad(lat);
  const ptLng  = toRad(lng);

  // Camera direction unit vector
  const cx = Math.cos(camLat) * Math.cos(camLng);
  const cy = Math.sin(camLat);
  const cz = Math.cos(camLat) * Math.sin(camLng);

  // Pin surface normal unit vector
  const px = Math.cos(ptLat) * Math.cos(ptLng);
  const py = Math.sin(ptLat);
  const pz = Math.cos(ptLat) * Math.sin(ptLng);

  // If dot product > 0 the point faces the camera — it's visible
  const dot = px * cx + py * cy + pz * cz;
  return dot > 0.1;
}

/**
 * GlobeView — renders the Globe canvas + React pin overlay.
 *
 * Uses the globe library's own getScreenCoords() for pixel-perfect
 * pin placement, combined with a dot-product visibility check to
 * hide pins that are on the back side of the globe.
 */
function GlobeView({ globeRef, pov, activeIndex, isZoomed, locations, onPinClick }) {
  const globeSize = getGlobeSize(isZoomed);

  const getPinPosition = (lat, lng) => {
    // First check if point is on the visible hemisphere
    if (!isPointVisible(lat, lng, pov)) return null;

    // Then get the screen coordinates from the globe library
    if (globeRef.current && globeRef.current.getScreenCoords) {
      try {
        const coords = globeRef.current.getScreenCoords(lat, lng, 0.015);
        if (coords && coords.x !== undefined) {
          return { x: coords.x, y: coords.y };
        }
      } catch (e) {
        // fall through
      }
    }
    return null;
  };

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
          const pos = getPinPosition(loc.lat, loc.lng);
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