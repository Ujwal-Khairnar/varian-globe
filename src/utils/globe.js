// utils/globe.js

export const POV_OVERVIEW = { lat: 51, lng: 10, altitude: 1.8 };
export const POV_DETAIL   = { altitude: 0.8 };

/**
 * Returns the globe canvas size in px.
 * - Overview: fits neatly in the viewport (square, centered)
 * - Zoomed:   large so the sphere fills the left half; square corners
 *             are clipped by border-radius:50% on the container
 */
export function getGlobeSize(isZoomed) {
  if (isZoomed) {
    return Math.max(900, Math.min(window.innerWidth, window.innerHeight) * 1.1);
  }
  return Math.min(750, Math.min(window.innerWidth, window.innerHeight) * 0.75);
}

// Backwards-compatible for any existing import of GLOBE_SIZE
export const GLOBE_SIZE = getGlobeSize(false);

/**
 * Convert lat/lng to X/Y pixel position on the rendered globe canvas.
 * Returns null if the point is on the far side (not visible).
 */
export function latLngToXY(lat, lng, pov, size) {
  const toRad = (d) => (d * Math.PI) / 180;

  const camLat = toRad(pov.lat ?? 0);
  const camLng = toRad(pov.lng ?? 0);
  const ptLat  = toRad(lat);
  const ptLng  = toRad(lng);

  const dot =
    Math.sin(camLat) * Math.sin(ptLat) +
    Math.cos(camLat) * Math.cos(ptLat) * Math.cos(ptLng - camLng);

  if (dot < 0.1) return null;

  const scale = size / 2;
  const x = scale + scale * Math.cos(ptLat) * Math.sin(ptLng - camLng);
  const y = scale - scale * (
    Math.cos(camLat) * Math.sin(ptLat) -
    Math.sin(camLat) * Math.cos(ptLat) * Math.cos(ptLng - camLng)
  );

  return { x, y };
}