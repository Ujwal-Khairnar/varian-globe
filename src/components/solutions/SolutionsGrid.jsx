import React from "react";
import SOLUTIONS from "../../data/solutions";
import SolutionIcon from "./SolutionIcon";
import "./SolutionsGrid.css";

function SolutionsGrid({ solutionIds, onSelect, onBack, onGoHome }) {
  return (
    <div className="sg-scene">

      {/* Header */}
      <div className="sg-header">
        <h1 className="sg-title">Solutions</h1>
        <div className="sg-varian">
          <div className="sg-logo">varian</div>
          <div className="sg-logo-sub">A Siemens Healthineers Company</div>
        </div>
      </div>

      {/* Scrollable grid */}
      <div className="sg-scroll-area">
        <div className="sg-grid">
          {SOLUTIONS.map((solution) => (
            <div
              key={solution.id}
              className={`sg-card${solutionIds && !solutionIds.includes(solution.id) ? " dimmed" : ""}`}
              onClick={() => onSelect(solution)}
            >
              {solution.isAOS && <div className="sg-aos-badge">AOS</div>}
              <div className="sg-card-icon">
                <SolutionIcon type={solution.icon} />
              </div>
              <div className="sg-card-name">{solution.name}</div>
            </div>
          ))}
        </div>

        <div className="sg-scroll-track">
          <div className="sg-scroll-thumb" />
        </div>
      </div>

      {/* Legal footer */}
      <div className="sg-legal">
        <div className="sg-legal-nav">

          {/* HOME button → goes to globe */}
          <button className="sg-icon-btn" onClick={onGoHome} title="Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          </button>

          {/* BACK button → goes back to root causes */}
          <button className="sg-icon-btn" onClick={onBack} title="Back" style={{ marginLeft: '12px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

        </div>
        <p className="sg-legal-text">
          Varian/Siemens Healthineers Int. AG as a medical device manufacturer cannot and does not recommend specific treatment approaches.
          Individual treatment results may vary. Not all products or features available for sale in all markets. VARIAN, ARIA, ARIA CORE,
          NOONA, ECLIPSE, RAPIDARC, RAPIDPLAN, ETHOS, HALCYON, HYPERARC, and TRUEBEAM are trademarks of Varian Medical Systems, Inc.,
          pending or registered U.S. Pat. &amp; Tm. Off. All other trademarks are property of their respective owners.
        </p>
      </div>

    </div>
  );
}

export default SolutionsGrid;