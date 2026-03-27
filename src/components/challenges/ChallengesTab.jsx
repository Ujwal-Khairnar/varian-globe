import React, { useEffect, useState } from "react";
import ChallengeCard from "./ChallengeCard";
import RootCausesPage from "./RootCausesPage";
import SolutionsGrid from "../solutions/SolutionsGrid";
import SolutionDetail from "../solutions/SolutionDetail";
import CHALLENGES from "../../data/challenges";
import SOLUTIONS, { ROOT_CAUSES } from "../../data/solutions";
import "./challenges.css";

function ChallengesTab({ registerRotate, onScreenChange }) {
  const [screen, setScreen] = useState("carousel");
  const [centerIndex, setCenterIndex] = useState(0);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(null);
  const [relevantSolutionIds, setRelevantSolutionIds] = useState(null);
  const [activeSolutionIdx, setActiveSolutionIdx] = useState(null);

  // Sync screen state with parent to hide global Footer/Branding
  useEffect(() => {
    if (onScreenChange) onScreenChange(screen);
  }, [screen, onScreenChange]);

  const displaySolutions = relevantSolutionIds
    ? SOLUTIONS.filter((s) => relevantSolutionIds.includes(s.id))
    : SOLUTIONS;

  // ── Auto-rotate carousel ──
  useEffect(() => {
    if (screen !== "carousel") return;
    const id = setInterval(() => {
      setCenterIndex((i) => (i + 1) % CHALLENGES.length);
    }, 3000);
    return () => clearInterval(id);
  }, [screen]);

  // ── Manual Rotate (via Footer button) ──
  useEffect(() => {
    if (registerRotate) {
      registerRotate(() => {
        if (screen === "carousel") {
          setCenterIndex((i) => (i + 1) % CHALLENGES.length);
        }
      });
    }
  }, [registerRotate, screen]);

  // ── 5-Position Logic (Do not reduce) ──
  const getPosition = (i) => {
    const total = CHALLENGES.length;
    let d = i - centerIndex;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;

    if (d === 0) return "center";
    if (d === 1) return "side1 right1";
    if (d === -1) return "side1 left1";
    if (d === 2) return "side2 right2"; // Far right
    if (d === -2) return "side2 left2"; // Far left
    return "hidden";
  };

  // ── Handlers ──
  const handleChallengeClick = (i, position) => {
    if (position === "center") {
      setCenterIndex(i);
      setActiveChallengeIdx(i);
      setScreen("rootCauses");
    } else {
      // Bring clicked card to center instead of navigating
      setCenterIndex(i);
    }
  };

  const handleShowSolutions = (selectedCauseIndices) => {
    const challenge = CHALLENGES[activeChallengeIdx];
    const rc = ROOT_CAUSES[challenge.icon];
    setRelevantSolutionIds(rc ? rc.solutions : null);
    setScreen("solutions");
  };

  const handleSelectSolution = (solution) => {
    const idx = displaySolutions.findIndex((s) => s.id === solution.id);
    setActiveSolutionIdx(idx >= 0 ? idx : 0);
    setScreen("detail");
  };

  const handleNextSolution = () => {
    setActiveSolutionIdx((i) => (i + 1) % displaySolutions.length);
  };
  const handlePrevSolution = () => {
    setActiveSolutionIdx((i) => (i - 1 + displaySolutions.length) % displaySolutions.length);
  };

  const handleCloseDetail = () => {
    setActiveSolutionIdx(null);
    setScreen("solutions");
  };

  const handleBackToRootCauses = () => setScreen("rootCauses");
  const handleBackToCarousel = () => setScreen("carousel");

  // ── Render States ──
  const activeChallenge = activeChallengeIdx !== null ? CHALLENGES[activeChallengeIdx] : null;
  const activeRootCause = activeChallenge ? ROOT_CAUSES[activeChallenge.icon] : null;
  const activeSolution  = activeSolutionIdx !== null ? displaySolutions[activeSolutionIdx] : null;

  return (
    <>
      {screen === "carousel" && (
        <div className="challenges-scene">
          <h1 className="challenge-title">Which pain points are you experiencing?</h1>
          <div className="ch-carousel">
            {CHALLENGES.map((challenge, i) => {
              const pos = getPosition(i);
              return (
                <ChallengeCard
                  key={i}
                  challenge={challenge}
                  position={pos}
                  onClick={() => handleChallengeClick(i, pos)}
                />
              );
            })}
          </div>
        </div>
      )}

      {screen === "rootCauses" && activeChallenge && activeRootCause && (
        <RootCausesPage
          challenge={activeChallenge}
          rootCause={activeRootCause}
          onBack={handleBackToCarousel}
          onShowSolutions={handleShowSolutions}
        />
      )}

      {screen === "solutions" && (
        <SolutionsGrid
          solutionIds={relevantSolutionIds}
          onSelect={handleSelectSolution}
          onBack={handleBackToRootCauses}
        />
      )}

      {screen === "detail" && activeSolution && (
        <SolutionDetail
          solution={activeSolution}
          allSolutions={displaySolutions}
          currentIdx={activeSolutionIdx}
          onClose={handleCloseDetail}
          onPrev={handlePrevSolution}
          onNext={handleNextSolution}
        />
      )}
    </>
  );
}

export default ChallengesTab;