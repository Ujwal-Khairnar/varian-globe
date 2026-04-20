import React, { useEffect, useState, useCallback } from "react";
import ChallengeCard from "./ChallengeCard";
import RootCausesPage from "./RootCausesPage";
import SolutionsGrid from "../solutions/SolutionsGrid";
import SolutionDetail from "../solutions/SolutionDetail";
import { api } from "../../services/api";
import "./challenges.css";

function ChallengesTab({ registerRotate, onScreenChange }) {
  const [screen, setScreen]                     = useState("carousel");
  const [centerIndex, setCenterIndex]           = useState(0);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(null);
  const [relevantSolutionIds, setRelevantSolutionIds] = useState(null);
  const [activeSolutionIdx, setActiveSolutionIdx] = useState(null);

  // ── API state ──
  const [challenges, setChallenges]   = useState([]);
  const [solutions, setSolutions]     = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [sessionId, setSessionId]     = useState(null);

  // ── Fetch challenges on mount ──
  useEffect(() => {
    api.getChallenges()
      .then((data) => {
        setChallenges(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load challenges:', err);
        setError('Failed to load challenges');
        setLoading(false);
      });
  }, []);

  // ── Fetch all solutions on mount ──
  useEffect(() => {
    api.getSolutions()
      .then((data) => setSolutions(data))
      .catch((err) => console.error('Failed to load solutions:', err));
  }, []);

  // ── Create session on mount ──
  useEffect(() => {
    api.createSession({})
      .then((data) => setSessionId(data.id))
      .catch((err) => console.error('Failed to create session:', err));
  }, []);

  // ── Sync screen with parent ──
  useEffect(() => {
    if (onScreenChange) onScreenChange(screen);
  }, [screen, onScreenChange]);

  // ── Display solutions (filtered or all) ──
  const displaySolutions = relevantSolutionIds
    ? solutions.filter((s) => relevantSolutionIds.includes(s.id))
    : solutions;

  // ── Auto-rotate carousel ──
  useEffect(() => {
    if (screen !== "carousel" || challenges.length === 0) return;
    const id = setInterval(() => {
      setCenterIndex((i) => (i + 1) % challenges.length);
    }, 3000);
    return () => clearInterval(id);
  }, [screen, challenges.length]);

  // ── Manual rotate ──
  useEffect(() => {
    if (registerRotate) {
      registerRotate(() => {
        if (screen === "carousel") {
          setCenterIndex((i) => (i + 1) % challenges.length);
        }
      });
    }
  }, [registerRotate, screen, challenges.length]);

  // ── 5-position carousel logic ──
  const getPosition = (i) => {
    const total = challenges.length;
    if (total === 0) return "hidden";
    let d = i - centerIndex;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;

    if (d === 0)  return "center";
    if (d === 1)  return "side1 right1";
    if (d === -1) return "side1 left1";
    if (d === 2)  return "side2 right2";
    if (d === -2) return "side2 left2";
    return "hidden";
  };

  // ── Challenge click handler ──
  const handleChallengeClick = (i, position) => {
    if (position === "center") {
      setCenterIndex(i);
      setActiveChallengeIdx(i);
      setScreen("rootCauses");
    } else {
      setCenterIndex(i);
    }
  };

  // ── Show solutions after root cause selection ──
  const handleShowSolutions = useCallback((selectedCauseIndices) => {
    const challenge = challenges[activeChallengeIdx];
    if (!challenge) return;

    // Get solution IDs from challenge's mapped solutions
    const solutionIds = challenge.solutions
      ? challenge.solutions.map((s) => s.id)
      : null;

    setRelevantSolutionIds(solutionIds);

    // Update session with selected challenge
    if (sessionId) {
      const selectedCauses = selectedCauseIndices.map(
        (idx) => challenge.root_causes[idx]?.text || ''
      );
      api.updateSession(sessionId, {
        challenge_id: challenge.id,
        selected_causes: selectedCauses,
      }).catch((err) => console.error('Failed to update session:', err));
    }

    setScreen("solutions");
  }, [challenges, activeChallengeIdx, sessionId]);

  // ── Solution select handler ──
  const handleSelectSolution = useCallback((solution) => {
    const idx = displaySolutions.findIndex((s) => s.id === solution.id);
    setActiveSolutionIdx(idx >= 0 ? idx : 0);

    // Log solution view
    if (sessionId) {
      api.logSolutionView(solution.id, sessionId)
        .catch((err) => console.error('Failed to log view:', err));
    }

    setScreen("detail");
  }, [displaySolutions, sessionId]);

  const handleNextSolution = () =>
    setActiveSolutionIdx((i) => (i + 1) % displaySolutions.length);

  const handlePrevSolution = () =>
    setActiveSolutionIdx((i) => (i - 1 + displaySolutions.length) % displaySolutions.length);

  const handleCloseDetail    = () => { setActiveSolutionIdx(null); setScreen("solutions"); };
  const handleBackToRootCauses = () => setScreen("rootCauses");
  const handleBackToCarousel   = () => setScreen("carousel");

  // ── Derived state ──
  const activeChallenge = activeChallengeIdx !== null ? challenges[activeChallengeIdx] : null;

  // Build rootCause object from API data to match RootCausesPage props
  const activeRootCause = activeChallenge
    ? {
        title:   activeChallenge.text,
        causes:  activeChallenge.root_causes
                   ? activeChallenge.root_causes.map((rc) => rc.text)
                   : [],
        solutions: activeChallenge.solutions
                   ? activeChallenge.solutions.map((s) => s.id)
                   : [],
      }
    : null;

  const activeSolution = activeSolutionIdx !== null
    ? displaySolutions[activeSolutionIdx]
    : null;

  // ── Loading state ──
  if (loading) {
    return (
      <div className="challenges-scene" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: 'white', fontSize: '1.5rem' }}>Loading challenges...</div>
      </div>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <div className="challenges-scene" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: '#ff4444', fontSize: '1.2rem' }}>{error}</div>
        <button
          onClick={() => window.location.reload()}
          style={{ marginTop: 16, padding: '8px 24px', cursor: 'pointer' }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {screen === "carousel" && (
        <div className="challenges-scene">
          <h1 className="challenge-title">Which pain points are you experiencing?</h1>
          <div className="ch-carousel">
            {challenges.map((challenge, i) => {
              const pos = getPosition(i);
              return (
                <ChallengeCard
                  key={challenge.id}
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