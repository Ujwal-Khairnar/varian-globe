import React from "react";

/**
 * SolutionIcon — renders the correct icon for each solution card.
 * All icons are white on a circular teal background, matching screenshots.
 *
 * Props:
 *   type  {string}  - aria-core | aria-core-mobile | eclipse | insightive | noona | aos
 */
function SolutionIcon({ type, size = 64 }) {
  const circle = { width: size, height: size };

  const wrapStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: "rgba(0,120,180,0.6)",
    border: "2px solid rgba(0,200,255,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconSize = Math.round(size * 0.5);
  const s = { width: iconSize, height: iconSize };

  const icons = {
    "aria-core": (
      // Concentric circles (ARIA logo style)
      <svg {...s} viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="2"/>
        <circle cx="16" cy="16" r="9" stroke="white" strokeWidth="2"/>
        <circle cx="16" cy="16" r="4" fill="white"/>
      </svg>
    ),
    "aria-core-mobile": (
      // Mobile phone with checkmark
      <svg {...s} viewBox="0 0 32 32" fill="none">
        <rect x="8" y="2" width="16" height="28" rx="3" stroke="white" strokeWidth="2"/>
        <path d="M13 6h6M16 26v.1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M11 15l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    "eclipse": (
      // Monitor/screen
      <svg {...s} viewBox="0 0 32 32" fill="none">
        <rect x="2" y="4" width="28" height="20" rx="2" stroke="white" strokeWidth="2"/>
        <path d="M10 30h12M16 24v6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 13l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    "insightive": (
      // Bar chart / analytics
      <svg {...s} viewBox="0 0 32 32" fill="none">
        <rect x="4" y="18" width="5" height="10" rx="1" fill="white"/>
        <rect x="12" y="12" width="5" height="16" rx="1" fill="white"/>
        <rect x="20" y="6" width="5" height="22" rx="1" fill="white"/>
        <circle cx="26" cy="8" r="3" stroke="white" strokeWidth="2"/>
        <path d="M22 5l-6 4-8-2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    "noona": (
      // Mobile app
      <svg {...s} viewBox="0 0 32 32" fill="none">
        <rect x="7" y="2" width="18" height="28" rx="3" stroke="white" strokeWidth="2"/>
        <line x1="7" y1="8" x2="25" y2="8" stroke="white" strokeWidth="1.5"/>
        <line x1="7" y1="24" x2="25" y2="24" stroke="white" strokeWidth="1.5"/>
        <circle cx="16" cy="27" r="1.5" fill="white"/>
        <path d="M11 14h10M11 18h7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    "aos": (
      // People / services icon (AOS badge solutions)
      <svg {...s} viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="9" r="5" stroke="white" strokeWidth="2"/>
        <circle cx="6" cy="12" r="3.5" stroke="white" strokeWidth="1.5"/>
        <circle cx="26" cy="12" r="3.5" stroke="white" strokeWidth="1.5"/>
        <path d="M2 28c0-5 3-8 8-8M22 20c5 0 8 3 8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 28c0-5 3.5-9 8-9s8 4 8 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  };

  return (
    <div style={wrapStyle}>
      {icons[type] || icons["aos"]}
    </div>
  );
}

export default SolutionIcon;