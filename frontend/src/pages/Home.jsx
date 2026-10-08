import React, { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import IdeaInput from '../components/IdeaInput.jsx';
import ThreatMetrics from '../components/ThreatMetrics.jsx';
import LoadingSequence from '../components/LoadingSequence.jsx';
import CriticGrid from '../components/CriticGrid.jsx';
import FinalAnalysis from '../components/FinalAnalysis.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';
import {
  getCritiques,
  getAnalysis,
  getMockCritiques,
  getMockAnalysis
} from '../services/api.js';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [idea, setIdea] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [critics, setCritics] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const resultsRef = useRef(null);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleStressTest = async (overrideDemoMode = isDemoMode) => {
    if (!idea.trim()) return;

    setError(null);
    setIsLoading(true);
    setLoadingStepIndex(0);
    setCritics([]);
    setAnalysis(null);

    const fullIdeaPayload = problemStatement.trim()
      ? `${idea.trim()}\n\nTarget Problem: ${problemStatement.trim()}`
      : idea.trim();

    try {
      // Step 0: "Calling Investor..."
      setLoadingStepIndex(0);
      await sleep(500);

      // Step 1: "Calling Customer..."
      setLoadingStepIndex(1);
      await sleep(500);

      // Step 2: "Calling Regulator..."
      setLoadingStepIndex(2);
      await sleep(500);

      // Step 3: "Calling Security Expert..."
      setLoadingStepIndex(3);
      await sleep(500);

      // Step 4: "Calling Competitor..."
      setLoadingStepIndex(4);

      let critiqueResponse;
      if (overrideDemoMode) {
        critiqueResponse = await getMockCritiques(fullIdeaPayload);
      } else {
        critiqueResponse = await getCritiques(fullIdeaPayload);
      }

      await sleep(500);

      // Step 5: "AI is analyzing the attacks..."
      setLoadingStepIndex(5);
      await sleep(600);

      // Step 6: "Building improved idea..."
      setLoadingStepIndex(6);

      let analysisResponse;
      if (overrideDemoMode) {
        analysisResponse = await getMockAnalysis(fullIdeaPayload, critiqueResponse.critics);
      } else {
        analysisResponse = await getAnalysis(fullIdeaPayload, critiqueResponse.critics);
      }

      await sleep(500);

      setCritics(critiqueResponse.critics || []);
      setAnalysis(analysisResponse);
      setIsLoading(false);

      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err) {
      console.error('Stress test pipeline error:', err);
      setIsLoading(false);
      setError(err);
    }
  };

  const handleRetry = () => {
    handleStressTest(isDemoMode);
  };

  const handleSwitchToDemo = () => {
    setIsDemoMode(true);
    handleStressTest(true);
  };

  const handleReset = () => {
    setIdea('');
    setProblemStatement('');
    setCritics([]);
    setAnalysis(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isDemoMode={isDemoMode}
        onToggleDemo={() => setIsDemoMode((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="dashboard-main">
        <Header
          isDemoMode={isDemoMode}
          onToggleDemoMode={() => setIsDemoMode((prev) => !prev)}
        />

        {/* Top Hero Grid: Featured Session Input + Threat Metrics */}
        <div className="dashboard-hero-grid">
          <IdeaInput
            idea={idea}
            setIdea={setIdea}
            problemStatement={problemStatement}
            setProblemStatement={setProblemStatement}
            onSubmit={() => handleStressTest(isDemoMode)}
            isLoading={isLoading}
            critics={critics}
          />

          <ThreatMetrics critics={critics} />
        </div>

        {/* Error Handling */}
        {error && (
          <ErrorBanner
            error={error}
            onRetry={handleRetry}
            onSwitchToDemo={handleSwitchToDemo}
          />
        )}

        {/* 7-Step Loading Sequence */}
        {isLoading && (
          <LoadingSequence currentStepIndex={loadingStepIndex} />
        )}

        {/* Results Section */}
        <div ref={resultsRef}>
          {critics.length > 0 && (
            <CriticGrid critics={critics} />
          )}

          {analysis && (
            <FinalAnalysis
              analysis={analysis}
              critics={critics}
              onReset={handleReset}
            />
          )}
        </div>
      </main>
    </div>
  );
}
