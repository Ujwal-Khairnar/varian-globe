import React, { useState, useRef } from "react";
import Branding from "./components/Branding";
import Footer from "./components/Footer";
import GlobeTab from "./components/globe/GlobeTab";
import ChallengesTab from "./components/challenges/ChallengesTab";
import "./App.css";

/**
 * App — root component.
 *
 * Responsibilities:
 *   1. Track which tab is active (0 = Globe, 1 = Challenges)
 *   2. Track isZoomed from GlobeTab so Footer can hide/show
 *   3. Render shared components: Branding + Footer
 *   4. Render the correct tab component
 *   5. Wire the Footer rotate button to the active tab
 */
function App() {
  const [activeTab, setActiveTab] = useState(0);

  // Lifted from GlobeTab so Footer knows when to hide
  const [isGlobeZoomed, setIsGlobeZoomed] = useState(false);

  // ChallengesTab registers its rotate fn here
  const rotateRef = useRef(null);

  const handleTabChange = (index) => {
    setActiveTab(index);
    setIsGlobeZoomed(false);   // reset zoom when switching tabs
    rotateRef.current = null;
  };

  const handleRotate = () => {
    if (activeTab === 0) {
      // Globe rotate toggle
      if (window.__globeRotateToggle) window.__globeRotateToggle();
    } else {
      // Challenges rotate
      if (rotateRef.current) rotateRef.current();
    }
  };

  return (
    <div className="app-container">

      {/* Always visible: top-right logo */}
      <Branding />

      {/* Tab 0: Globe */}
      {activeTab === 0 && (
        <GlobeTab
          isActive={true}
          onZoomChange={setIsGlobeZoomed}
        />
      )}

      {/* Tab 1: Challenges carousel */}
      {activeTab === 1 && (
        <ChallengesTab
          registerRotate={(fn) => { rotateRef.current = fn; }}
        />
      )}

      {/* Footer hides when globe is zoomed in */}
      <Footer
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isHidden={activeTab === 0 && isGlobeZoomed}
        onRotate={handleRotate}
      />

    </div>
  );
}

export default App;