import React, { useEffect, useRef, useState, useCallback } from "react";
import GlobeView from "./GlobeView";
import LocationCard from "./LocationCard";
import LocationDetail from "./LocationDetail";
import DetailNav from "./DetailNav";
import LOCATIONS from "../../data/locations";
import { POV_OVERVIEW, POV_DETAIL } from "../../utils/globe";

/**
 * GlobeTab — container for the entire "What your peers have achieved" tab.
 *
 * Props:
 *   isActive      {boolean}   - true when this tab is shown
 *   onZoomChange  {function}  - called with (isZoomed) so App.js can hide Footer
 */
function GlobeTab({ isActive, onZoomChange }) {
  const globeRef       = useRef();
  const animRef        = useRef();
  const activeIndexRef = useRef(null);

  const [pov,           setPov]           = useState(POV_OVERVIEW);
  const [activeIndex,   setActiveIndex]   = useState(null);
  const [cardVisible,   setCardVisible]   = useState(false);
  const [isZoomed,      setIsZoomed]      = useState(false);
  const [detailLocation, setDetailLocation] = useState(null); // NEW

  activeIndexRef.current = activeIndex;

  // ── Initialise globe on mount ─────────────────────
  useEffect(() => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();
    controls.autoRotate      = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom      = false;
    controls.enablePan       = false;
    globeRef.current.pointOfView(POV_OVERVIEW, 0);

    const tick = () => {
      if (globeRef.current) setPov({ ...globeRef.current.pointOfView() });
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    if (onZoomChange) onZoomChange(isZoomed);
  }, [isZoomed, onZoomChange]);

  useEffect(() => {
    if (isActive) {
      window.__globeRotateToggle = () => {
        if (!globeRef.current) return;
        const c = globeRef.current.controls();
        c.autoRotate = !c.autoRotate;
      };
    }
  }, [isActive]);

  // ── Zoom into a pin ───────────────────────────────
  const zoomToPin = useCallback((index) => {
    if (!globeRef.current) return;
    const loc = LOCATIONS[index];

    globeRef.current.controls().autoRotate = false;
    globeRef.current.pointOfView(
      { lat: loc.lat, lng: loc.lng, altitude: POV_DETAIL.altitude },
      1200
    );

    setActiveIndex(index);
    setIsZoomed(true);
    setCardVisible(false);

    setTimeout(() => setCardVisible(true), 1100);
  }, []);

  // ── Back to overview ──────────────────────────────
  const backToOverview = useCallback(() => {
    setCardVisible(false);

    setTimeout(() => {
      setActiveIndex(null);
      setIsZoomed(false);
      if (globeRef.current) {
        globeRef.current.pointOfView(POV_OVERVIEW, 1200);
        setTimeout(() => {
          if (globeRef.current)
            globeRef.current.controls().autoRotate = true;
        }, 1200);
      }
    }, 280);
  }, []);

  // ── Navigate between pins ─────────────────────────
  const goNext = useCallback(() => {
    const current = activeIndexRef.current;
    if (current === null) return;
    const next = (current + 1) % LOCATIONS.length;
    setCardVisible(false);
    setTimeout(() => zoomToPin(next), 280);
  }, [zoomToPin]);

  const goPrev = useCallback(() => {
    const current = activeIndexRef.current;
    if (current === null) return;
    const prev = (current - 1 + LOCATIONS.length) % LOCATIONS.length;
    setCardVisible(false);
    setTimeout(() => zoomToPin(prev), 280);
  }, [zoomToPin]);

  // ── Show details ──────────────────────────────────
  const handleShowDetails = useCallback(() => {
    const current = activeIndexRef.current;
    if (current === null) return;
    setDetailLocation(LOCATIONS[current]);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailLocation(null);
  }, []);

  const activeLocation = activeIndex !== null ? LOCATIONS[activeIndex] : null;

  return (
    <>
      <h1 className={`hero-title${isZoomed ? " hidden" : ""}`}>
        What your <br />
        peers have <br />
        achieved
      </h1>

      {/* Pass isZoomed so GlobeView can resize + reposition */}
      <GlobeView
        globeRef={globeRef}
        pov={pov}
        activeIndex={activeIndex}
        isZoomed={isZoomed}
        locations={LOCATIONS}
        onPinClick={zoomToPin}
      />

      <LocationCard
        location={activeLocation}
        visible={cardVisible}
        onClose={backToOverview}
        onShowDetails={handleShowDetails}
      />

      {isZoomed && (
        <DetailNav
          onBack={backToOverview}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}

      {/* Full-screen detail modal */}
      {detailLocation && (
        <LocationDetail
          location={detailLocation}
          onClose={handleCloseDetail}
        />
      )}
    </>
  );
}

export default GlobeTab;