import React, { useState } from "react";
import "./RootCausesPage.css";

function RootCausesPage({ challenge, rootCause, onBack, onShowSolutions }) {
  const [selected, setSelected] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleCause = (i) => {
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  return (
    <div className="rcp-scene">
      {/* Sidebar Overlay (Preserved) */}
      <div className={`rcp-overlay-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-inner-content">
          <div className="sidebar-header-branding">
            <div className="sidebar-icon-circle-large">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" stroke="#00c8ff" />
                <path d="M12 8v4l3 2" stroke="#00c8ff" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="white" />
              </svg>
            </div>
            <h3 className="sidebar-main-title">My challenge</h3>
          </div>
          
          <div className="sidebar-body-text">
            <span className="blue-dot">•</span>
            <p>{challenge.text}</p>
          </div>
          
          <button className="change-challenge-btn-final" onClick={onBack}>
             <span className="arrow-back">←</span> Change challenge
          </button>
        </div>

        <div className="sidebar-close-trigger-circle" onClick={() => setSidebarOpen(false)}>
           <span>❮</span>
        </div>
      </div>

      {/* LEFT PARTITION */}
      <div className="rcp-left-content">
        <div className="rcp-breadcrumb">{challenge.text} —</div>
        <h1 className="rcp-title">What is causing your pain point?</h1>

        <div className="rcp-grid">
          {rootCause.causes.map((cause, i) => (
            <div
              key={i}
              className={`rcp-cause-card ${selected.includes(i) ? "selected" : ""}`}
              onClick={() => toggleCause(i)}
            >
              {cause}
            </div>
          ))}
        </div>

        <div className="rcp-sidebar-triggers">
          <button className="rcp-menu-hamburger" onClick={() => setSidebarOpen(true)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
          <button className="rcp-home-trigger" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          </button>
        </div>

        <div className="rcp-floating-select">
           <button 
             className="select-causes-btn" 
             disabled={selected.length === 0}
             onClick={() => {
                // If you want clicking this to trigger the next step:
                if(selected.length > 0) onShowSolutions(selected);
             }}
           >
             Select your causes <span className="arrow-circle">→</span>
           </button>
        </div>
      </div>

      {/* RIGHT PARTITION */}
      <div className="rcp-right-panel">
        <div className="varian-logo-top">
          <h2>varian</h2>
          <small>A Siemens Healthineers Company</small>
        </div>

        <h2 className="rcp-panel-title">My root causes</h2>

        <div className="rcp-panel-slots-container">
          {selected.length === 0 ? (
            <div className="rcp-panel-empty-box">
              <span className="plus-symbol">+</span>
            </div>
          ) : (
            <div className="rcp-selected-list">
              {selected.map((i) => (
                <div key={i} className="rcp-selected-card">
                  <div className="card-text">{rootCause.causes[i]}</div>
                  <button className="remove-btn" onClick={() => toggleCause(i)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* The Action Button is now explicitly inside this footer div */}
        <div className="rcp-bottom-actions">
           <button 
             className={`rcp-show-btn-v2-final ${selected.length > 0 ? "active" : ""}`}
             disabled={selected.length === 0}
             onClick={() => onShowSolutions(selected)}
           >
             Show solutions →
           </button>
        </div>
      </div>
    </div>
  );
}

export default RootCausesPage;