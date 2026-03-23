import React from "react";
import ChallengeIcon from "./ChallengeIcon";
import "./challenges.css";

/**
 * ChallengeCard — a single card in the carousel fan.
 *
 * Props:
 *   challenge  {object}   - { icon, label, text }
 *   position   {string}   - CSS class suffix: "center" | "left1" | "right1" | "left2" | "right2" | "hidden"
 *   onClick    {function} - makes this card the center when clicked
 */
function ChallengeCard({ challenge, position, onClick }) {
  // Build the full className
  const isCenter = position === "center";
  const sideClass = position.startsWith("left") || position.startsWith("right")
    ? `side${position.slice(-1)} ${position}`
    : position;

  const className = `ch-card ${isCenter ? "center" : sideClass}`;

  return (
    <div className={className} onClick={onClick}>

      {/* Circular icon */}
      <div className="ch-icon-wrap">
        <ChallengeIcon type={challenge.icon} />
      </div>

      {/* "— CHALLENGE —" label */}
      <div className="ch-label">— {challenge.label} —</div>

      {/* Challenge description */}
      <div className="ch-text">{challenge.text}</div>

    </div>
  );
}

export default ChallengeCard;