import React, { useState, useRef } from "react";
import Branding from "./components/Branding";
import Footer from "./components/Footer";
import GlobeTab from "./components/globe/GlobeTab";
import ChallengesTab from "./components/challenges/ChallengesTab";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [isGlobeZoomed, setIsGlobeZoomed] = useState(false);
  // NEW: Track if we are in Root Causes or deeper to hide Footer/Branding
  const [isChallengeDetailOpen, setIsChallengeDetailOpen] = useState(false);
  const rotateRef = useRef(null);

  const handleTabChange = (index) => {
    setActiveTab(index);
    setIsGlobeZoomed(false);
    setIsChallengeDetailOpen(false);
    rotateRef.current = null;
  };

  const handleRotate = () => {
    if (activeTab === 0) {
      if (window.__globeRotateToggle) window.__globeRotateToggle();
    } else {
      if (rotateRef.current) rotateRef.current();
    }
  };

  // Hide UI if Globe is zoomed OR if Challenges is past the carousel screen
  const shouldHideGlobalUI = (activeTab === 0 && isGlobeZoomed) || (activeTab === 1 && isChallengeDetailOpen);

  return (
    <div className="app-container">
      {/* Conditionally render Global Branding */}
      {!shouldHideGlobalUI && <Branding />}

      {activeTab === 0 && (
        <GlobeTab isActive={true} onZoomChange={setIsGlobeZoomed} />
      )}

      {activeTab === 1 && (
        <ChallengesTab
          registerRotate={(fn) => { rotateRef.current = fn; }}
          // Sync internal screen state to hide footer
          onScreenChange={(screen) => setIsChallengeDetailOpen(screen !== "carousel")}
        />
      )}

      {/* Footer hides when shouldHideGlobalUI is true */}
      <Footer
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isHidden={shouldHideGlobalUI}
        onRotate={handleRotate}
      />
    </div>
  );
}

export default App;