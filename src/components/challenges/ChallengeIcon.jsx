import React from "react";

/**
 * ChallengeIcon — renders the correct SVG icon for each challenge type.
 *
 * Props:
 *   type  {string}  - one of: data | capacity | continuity | growth | pathway | quality | reporting
 */
function ChallengeIcon({ type }) {
  const props = { width: 56, height: 56, viewBox: "0 0 56 56", fill: "none" };

  switch (type) {
    case "data":
      return (
        <svg {...props}>
          <rect x="8" y="10" width="40" height="30" rx="3" stroke="#00c8ff" strokeWidth="2.2" />
          <path d="M14 18h6M14 24h10M14 30h8M26 18h16M26 24h12" stroke="#00c8ff" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M28 40v6M20 46h16" stroke="#00c8ff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "capacity":
      return (
        <svg {...props}>
          <circle cx="28" cy="18" r="8" stroke="#00c8ff" strokeWidth="2.2" />
          <circle cx="12" cy="22" r="6" stroke="#00c8ff" strokeWidth="2" />
          <circle cx="44" cy="22" r="6" stroke="#00c8ff" strokeWidth="2" />
          <path d="M4 44c0-8 5-12 12-12M40 32c7 0 12 4 12 12M16 44c0-7 5-11 12-11s12 4 12 11" stroke="#00c8ff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "continuity":
      return (
        <svg {...props}>
          <path d="M10 28c0-10 8-18 18-18s18 8 18 18" stroke="#00c8ff" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M10 28c0 10 8 18 18 18" stroke="#00c8ff" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 3" />
          <circle cx="28" cy="28" r="5" fill="#00c8ff" fillOpacity="0.2" stroke="#00c8ff" strokeWidth="2" />
          <path d="M44 20l4-4M44 36l4 4" stroke="#00c8ff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "growth":
      return (
        <svg {...props}>
          <polyline points="8,42 18,28 26,34 36,16 48,20" stroke="#00c8ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="40,14 48,14 48,22" stroke="#00c8ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="8" y1="46" x2="48" y2="46" stroke="#00c8ff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case "pathway":
      return (
        <svg {...props}>
          <circle cx="10" cy="28" r="5" stroke="#00c8ff" strokeWidth="2" />
          <circle cx="28" cy="12" r="5" stroke="#00c8ff" strokeWidth="2" />
          <circle cx="46" cy="28" r="5" stroke="#00c8ff" strokeWidth="2" />
          <circle cx="28" cy="44" r="5" stroke="#00c8ff" strokeWidth="2" />
          <path d="M15 28h8M23 12h10M41 28h-8M33 44h-10M28 17v8M28 39v-8" stroke="#00c8ff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case "quality":
      return (
        <svg {...props}>
          <path d="M28 6l5.5 11 12.5 1.8-9 8.8 2.1 12.4L28 34.5l-11.1 5.5 2.1-12.4-9-8.8 12.5-1.8z" stroke="#00c8ff" strokeWidth="2" strokeLinejoin="round" />
          <path d="M20 28l5 5 10-10" stroke="#00c8ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "reporting":
      return (
        <svg {...props}>
          <rect x="12" y="8" width="32" height="40" rx="3" stroke="#00c8ff" strokeWidth="2.2" />
          <path d="M20 20h16M20 27h16M20 34h10" stroke="#00c8ff" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="38" cy="40" r="6" fill="#001a2e" stroke="#00c8ff" strokeWidth="1.8" />
          <path d="M36 40l1.5 1.5L40 38" stroke="#00c8ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return null;
  }
}

export default ChallengeIcon;