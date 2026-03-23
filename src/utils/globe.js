/**
 * Converts a lat/lng coordinate to an x/y pixel position
 * on the globe canvas, given the current camera point-of-view.
 *
 * @param {number} lat       - Latitude of the point
 * @param {number} lng       - Longitude of the point
 * @param {object} pov       - Camera POV: { lat, lng, altitude }
 * @param {number} size      - Width/height of the globe canvas in px
 * @returns {{ x, y } | null} - Pixel position, or null if behind the globe
 */
export function latLngToXY(lat, lng, pov, size) {
  const R = size / 2;
  const dLng = (lng - pov.lng) * Math.PI / 180;
  const latR = lat * Math.PI / 180;
  const povLatR = pov.lat * Math.PI / 180;

  const x = Math.cos(latR) * Math.sin(dLng);
  const y =
    Math.sin(latR) * Math.cos(povLatR) -
    Math.cos(latR) * Math.cos(dLng) * Math.sin(povLatR);
  const z =
    Math.sin(latR) * Math.sin(povLatR) +
    Math.cos(latR) * Math.cos(dLng) * Math.cos(povLatR);

  // z < 0 means the point is on the far side of the globe — hide it
  if (z < 0) return null;

  return {
    x: R + x * R * 0.92,
    y: R - y * R * 0.92,
  };
}

// Globe camera constants — shared across components
export const GLOBE_SIZE   = 750;
export const POV_OVERVIEW = { lat: 50, lng: 5, altitude: 2.1 };
export const POV_DETAIL   = { altitude: 1.2 };