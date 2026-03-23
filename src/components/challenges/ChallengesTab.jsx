import React, { useEffect, useState } from "react";
import ChallengeCard from "./ChallengeCard";
import CHALLENGES from "../../data/challenges";
import "./challenges.css";

/**
 * ChallengesTab — "What challenges are you facing" tab.
 *
 * Renders a 3D fan carousel of 7 challenge cards.
 * The center card is highlighted; cards to either side are scaled/rotated away.
 * Auto-advances every 3 seconds.
 *
 * Props:
 *   onRotate  {function} - called from Footer's "Rotate the challenges" button
 *                          Parent passes this down so Footer can trigger it.
 *                          We expose a rotate fn via the onRotate prop setter.
 */
function ChallengesTab({ registerRotate }) {
  const [centerIndex, setCenterIndex] = useState(0);

  // Auto-advance every 3 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setCenterIndex((i) => (i + 1) % CHALLENGES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Let the parent (App.js) call rotate() via the Footer button
  useEffect(() => {
    if (registerRotate) {
      registerRotate(() => {
        setCenterIndex((i) => (i + 1) % CHALLENGES.length);
      });
    }
  }, [registerRotate]);

  /**
   * Returns the CSS position class for card at index i,
   * relative to the current centerIndex.
   */
  const getPosition = (i) => {
    const total = CHALLENGES.length;
    let d = i - centerIndex;
    if (d >  total / 2) d -= total;
    if (d < -total / 2) d += total;

    if (d === 0)  return "center";
    if (d === 1)  return "right1";
    if (d === -1) return "left1";
    if (d === 2)  return "right2";
    if (d === -2) return "left2";
    return "hidden";
  };

  return (
    <div className="challenges-scene">

      {/* Page title */}
      <h1 className="challenge-title">Which pain points are you experiencing?</h1>

      {/* 3D fan carousel */}
      <div className="ch-carousel">
        {CHALLENGES.map((challenge, i) => (
          <ChallengeCard
            key={i}
            challenge={challenge}
            position={getPosition(i)}
            onClick={() => setCenterIndex(i)}
          />
        ))}
      </div>

    </div>
  );
}

export default ChallengesTab;