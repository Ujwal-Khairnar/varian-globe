import React, { useEffect, useRef, useState, useCallback } from "react";
import GlobeView from "./GlobeView";
import LocationCard from "./LocationCard";
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

  // KEY FIX: keep activeIndex in a ref so goNext/goPrev
  // callbacks always read the latest value without needing re-creation.
  const activeIndexRef = useRef(null);

  const [pov,         setPov]         = useState(POV_OVERVIEW);
  const [activeIndex, setActiveIndex] = useState(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [isZoomed,    setIsZoomed]    = useState(false);

  // Keep ref in sync with state on every render
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

  // ── Notify App.js whenever zoom state changes ─────
  useEffect(() => {
    if (onZoomChange) onZoomChange(isZoomed);
  }, [isZoomed, onZoomChange]);

  // ── Register rotate toggle for Footer ─────────────
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
  }, []); // no deps — reads fresh values via globeRef + LOCATIONS constant

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
  // KEY FIX: read from activeIndexRef.current (always fresh)
  // instead of activeIndex (stale closure).
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

  const activeLocation = activeIndex !== null ? LOCATIONS[activeIndex] : null;

  return (
    <>
      {/* Hero headline */}
      <h1 className={`hero-title${isZoomed ? " hidden" : ""}`}>
        What your <br />
        peers have <br />
        achieved
      </h1>

      {/* Globe canvas + pin overlay */}
      <GlobeView
        globeRef={globeRef}
        pov={pov}
        activeIndex={activeIndex}
        locations={LOCATIONS}
        onPinClick={zoomToPin}
      />

      {/* Slide-in card */}
      <LocationCard
        location={activeLocation}
        visible={cardVisible}
        onClose={backToOverview}
      />

      {/* Back / prev / next — only when zoomed */}
      {isZoomed && (
        <DetailNav
          onBack={backToOverview}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}

export default GlobeTab;