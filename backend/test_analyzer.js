import { analyzeIdea } from './services/analyzer.js';

async function runTest() {
  const idea = "An app that helps college students find internships.";
  const critics = [
    {
      role: "Investor",
      criticism: "There are already too many job boards, the market is saturated.",
      concern: "Low ROI, high customer acquisition cost.",
      severity: "High"
    },
    {
      role: "Customer",
      criticism: "I don't want to make another profile just for this app.",
      concern: "Friction in sign-up process.",
      severity: "Medium"
    },
    {
      role: "Security Expert",
      criticism: "Collecting student IDs and transcripts is a data privacy nightmare.",
      concern: "Data breaches, compliance with FERPA/GDPR.",
      severity: "High"
    },
    {
      role: "Regulator",
      criticism: "If you offer paid internships, you must comply with labor laws in 50 states.",
      concern: "Legal liabilities and compliance overhead.",
      severity: "High"
    },
    {
      role: "Competitor",
      criticism: "LinkedIn already has an internship filter that everyone uses.",
      concern: "Lack of unique value proposition.",
      severity: "High"
    }
  ];

  try {
    console.log("Testing with Idea: ", idea);
    const result = await analyzeIdea({ idea, critics });
    console.log("\nAnalysis Result:");
    console.log(JSON.stringify(result, null, 2));
    
    // Verifications
    console.log("\nVerifications:");
    console.log("- JSON structure valid:", !!(result.biggestWeaknesses && result.improvements && result.improvedIdea));
    console.log("- Number of weaknesses:", result.biggestWeaknesses?.length);
    console.log("- Number of improvements:", result.improvements?.length);
    console.log("- Improved idea is different from original:", result.improvedIdea !== idea);

  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

runTest();
