import React, { useState, useRef, useEffect } from "react";
import Branding from "./components/Branding";
import Footer from "./components/Footer";
import GlobeTab from "./components/globe/GlobeTab";
import ChallengesTab from "./components/challenges/ChallengesTab";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [isGlobeZoomed, setIsGlobeZoomed] = useState(false);
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

  // Register global go-to-globe function
  useEffect(() => {
    window.__goToGlobe = () => {
      setActiveTab(0);
      setIsGlobeZoomed(false);
      setIsChallengeDetailOpen(false);
    };
  }, []);

  const shouldHideGlobalUI = (activeTab === 0 && isGlobeZoomed) || (activeTab === 1 && isChallengeDetailOpen);

  return (
    <div className="app-container">
      {!shouldHideGlobalUI && <Branding />}

      {activeTab === 0 && (
        <GlobeTab isActive={true} onZoomChange={setIsGlobeZoomed} />
      )}

      {activeTab === 1 && (
        <ChallengesTab
          registerRotate={(fn) => { rotateRef.current = fn; }}
          onScreenChange={(screen) => setIsChallengeDetailOpen(screen !== "carousel")}
        />
      )}

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