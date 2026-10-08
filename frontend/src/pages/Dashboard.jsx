import React, { useState } from 'react';
import CriticCard from '../components/CriticCard';
import AnalysisResult from '../components/AnalysisResult';
import { critiqueIdea, analyzeIdea } from '../services/api';

const BENCHMARK_IDEA = 'We want to create an app that helps college students find internships.';

export default function Dashboard() {
  const [idea, setIdea] = useState('');
  const [critics, setCritics] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  // Loading & error states
  const [isCritiquing, setIsCritiquing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeStep, setActiveStep] = useState(1); // 1: Input, 2: Critics, 3: Synthesis

  // Load benchmark idea directly
  const handleLoadBenchmark = () => {
    setIdea(BENCHMARK_IDEA);
    setErrorMessage('');
  };

  // Full Pipeline Execution: Frontend -> /api/critique -> 5 Critics -> /api/analyze -> Final Analysis
  const handleRunFullPipeline = async (e) => {
    if (e) e.preventDefault();
    if (!idea || idea.trim().length < 5) {
      setErrorMessage('Please enter a valid idea with at least 5 characters.');
      return;
    }

    setErrorMessage('');
    setCritics([]);
    setAnalysis(null);
    setIsCritiquing(true);
    setActiveStep(2);

    try {
      // Step 1: POST /api/critique
      const critiqueResult = await critiqueIdea(idea.trim());
      const fetchedCritics = critiqueResult.critics || [];
      setCritics(fetchedCritics);
      setIsCritiquing(false);

      // Step 2: POST /api/analyze
      setIsAnalyzing(true);
      setActiveStep(3);

      const analysisResult = await analyzeIdea(idea.trim(), fetchedCritics);
      setAnalysis(analysisResult);
      setIsAnalyzing(false);
    } catch (err) {
      setIsCritiquing(false);
      setIsAnalyzing(false);
      setErrorMessage(err.message || 'Pipeline execution failed. Please verify the backend is running.');
    }
  };

  // Reset to run another test
  const handleReset = () => {
    setIdea('');
    setCritics([]);
    setAnalysis(null);
    setErrorMessage('');
    setActiveStep(1);
  };

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">AI IDEA STRESS TESTER</div>
        <h1 className="hero-title">
          Brutally Stress-Test Your Startup Idea <span className="gradient-text">Before the Market Does.</span>
        </h1>
        <p className="hero-description">
          Submit your concept to 5 ruthless AI personas (Investor, Competitor, User, Engineer, Risk Officer), then synthesize weaknesses and actionable pivots with the Final AI Analyzer.
        </p>

        {/* Pipeline Step Tracker */}
        <div className="pipeline-tracker">
          <div className={`step-node ${activeStep >= 1 ? 'active' : ''} ${critics.length > 0 ? 'completed' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-name">Input Concept</span>
          </div>
          <div className="step-connector"></div>
          <div className={`step-node ${activeStep >= 2 ? 'active' : ''} ${critics.length > 0 ? 'completed' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-name">5 AI Critics (POST /api/critique)</span>
          </div>
          <div className="step-connector"></div>
          <div className={`step-node ${activeStep >= 3 ? 'active' : ''} ${analysis ? 'completed' : ''}`}>
            <span className="step-num">3</span>
            <span className="step-name">Final Analyzer (POST /api/analyze)</span>
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="input-card">
        <form onSubmit={handleRunFullPipeline}>
          <div className="input-header">
            <label htmlFor="idea-input">Describe Your Startup or Product Idea</label>
            <button
              type="button"
              className="benchmark-btn"
              onClick={handleLoadBenchmark}
            >
              ⚡ Load Benchmark Idea
            </button>
          </div>

          <textarea
            id="idea-input"
            rows="4"
            placeholder="e.g. We want to create an app that helps college students find internships."
            value={idea}
            onChange={(e) => {
              setIdea(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            disabled={isCritiquing || isAnalyzing}
          ></textarea>

          {errorMessage && (
            <div className="error-alert">
              <span>⚠️</span> {errorMessage}
            </div>
          )}

          <div className="input-actions">
            <button
              type="submit"
              className="primary-btn"
              disabled={isCritiquing || isAnalyzing || !idea.trim()}
            >
              {isCritiquing
                ? '⚡ Calling 5 Critics (/api/critique)...'
                : isAnalyzing
                ? '🧠 Synthesizing Analysis (/api/analyze)...'
                : '🚀 Run Complete Stress Test Pipeline'}
            </button>

            {(critics.length > 0 || analysis) && (
              <button
                type="button"
                className="secondary-btn"
                onClick={handleReset}
                disabled={isCritiquing || isAnalyzing}
              >
                🔄 Test New Idea
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Loading Indicator */}
      {(isCritiquing || isAnalyzing) && (
        <div className="loading-card">
          <div className="spinner"></div>
          <h3>
            {isCritiquing
              ? 'Evaluating across 5 AI Critic personas...'
              : 'Synthesizing fatal flaws & generating improved idea pitch...'}
          </h3>
          <p>
            {isCritiquing
              ? 'Communicating with POST /api/critique'
              : 'Communicating with POST /api/analyze'}
          </p>
        </div>
      )}

      {/* Critics Section */}
      {critics.length > 0 && (
        <section className="critics-section">
          <div className="section-header">
            <div>
              <span className="badge-tag">STEP 2 COMPLETE</span>
              <h2>The 5 Ruthless Critics (POST /api/critique)</h2>
            </div>
            <span className="critics-count">5 Personas Evaluated</span>
          </div>

          <div className="critics-grid">
            {critics.map((critic, index) => (
              <CriticCard key={critic.id || index} critic={critic} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Analysis Section */}
      {analysis && (
        <section className="analysis-section">
          <AnalysisResult analysis={analysis} originalIdea={idea} />
        </section>
      )}
    </div>
  );
}
