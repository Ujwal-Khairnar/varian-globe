// utils/globe.js

export const POV_OVERVIEW = { lat: 51, lng: 10, altitude: 1.8 };
export const POV_DETAIL   = { altitude: 0.8 };

/**
 * Returns the globe canvas size in px.
 */
export function getGlobeSize(isZoomed) {
  if (isZoomed) {
    return Math.max(900, Math.min(window.innerWidth, window.innerHeight) * 1.1);
  }
  return Math.min(750, Math.min(window.innerWidth, window.innerHeight) * 0.75);
}

export const GLOBE_SIZE = getGlobeSize(false);

const toRad = (d) => (d * Math.PI) / 180;

/**
 * Convert lat/lng to X/Y pixel position on the rendered globe canvas.
 *
 * Uses proper 3D spherical projection with a correct camera coordinate
 * system so pins stay LOCKED to their geographic coordinates as the
 * globe rotates — they do NOT drift or slide with the camera.
 *
 * Returns null if the point is on the far side (not visible).
 */
export function latLngToXY(lat, lng, pov, size) {
  const camLat = toRad(pov.lat ?? 0);
  const camLng = toRad(pov.lng ?? 0);
  const ptLat  = toRad(lat);
  const ptLng  = toRad(lng);

  // Pin as 3D unit vector
  const px = Math.cos(ptLat) * Math.cos(ptLng);
  const py = Math.sin(ptLat);
  const pz = Math.cos(ptLat) * Math.sin(ptLng);

  // Camera forward as 3D unit vector
  const cx = Math.cos(camLat) * Math.cos(camLng);
  const cy = Math.sin(camLat);
  const cz = Math.cos(camLat) * Math.sin(camLng);

  // Hide points on the back of the globe
  const dot = px * cx + py * cy + pz * cz;
  if (dot < 0.05) return null;

  // Right axis = cross(forward, worldUp=(0,1,0)), normalized
  // cross(c, (0,1,0)) = (cy*0 - cz*1, cz*0 - cx*0, cx*1 - cy*0) = (-cz, 0, cx)
  let rightX = -cz;
  let rightY = 0;
  let rightZ = cx;
  const rightLen = Math.sqrt(rightX * rightX + rightZ * rightZ);
  if (rightLen < 0.0001) return null; // degenerate at poles
  rightX /= rightLen;
  rightZ /= rightLen;

  // Up axis = cross(right, forward), normalized
  let upX = rightY * cz - rightZ * cy;
  let upY = rightZ * cx - rightX * cz;
  let upZ = rightX * cy - rightY * cx;
  const upLen = Math.sqrt(upX * upX + upY * upY + upZ * upZ);
  upX /= upLen;
  upY /= upLen;
  upZ /= upLen;

  // Project pin onto right and up axes
  const screenX = px * rightX + py * rightY + pz * rightZ;
  const screenY = px * upX    + py * upY    + pz * upZ;

  // Convert to pixel coordinates
  const scale = size / 2;
  const x = scale + screenX * scale;
  const y = scale - screenY * scale;

  return { x, y };
}