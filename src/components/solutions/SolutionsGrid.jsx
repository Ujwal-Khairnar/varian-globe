import React from "react";
import SOLUTIONS from "../../data/solutions";
import SolutionIcon from "./SolutionIcon";
import "./SolutionsGrid.css";

/**
 * SolutionsGrid — the Solutions page showing all relevant solution cards
 *
 * Props:
 *   solutionIds  {string[]}  - which solution IDs to show (filtered by root cause)
 *   onSelect     {function}  - called with solution object when a card is clicked
 *   onBack       {function}  - go back to root causes
 */
function SolutionsGrid({ solutionIds, onSelect, onBack }) {
  // Filter to only solutions relevant to this challenge, maintain order
  const filtered = solutionIds
    ? SOLUTIONS.filter((s) => solutionIds.includes(s.id))
    : SOLUTIONS;

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

        {/* Scroll track indicator */}
        <div className="sg-scroll-track">
          <div className="sg-scroll-thumb" />
        </div>
      </div>

      {/* Legal footer */}
      <div className="sg-legal">
        <div className="sg-legal-nav">
          <button className="sg-icon-btn" onClick={onBack} title="Back">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2L3 10h2.5v10h6v-6h3v6h6V10H23L11 2z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
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