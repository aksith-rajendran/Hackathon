import { GoogleGenerativeAI } from '@google/generative-ai';

const evaluateIdea = async (idea) => {
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing AI_API_KEY environment variable. Please set it.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Using gemini-2.5-flash for fast, concurrent performance
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const personas = [
    {
      role: "Investor",
      prompt: `You are a startup investor. Analyze the user's idea from an investment perspective. Ask specific questions about revenue, business model, market size, scalability, costs, and competition. Identify weaknesses and explain why they matter.
Analyze the specific idea provided by the user.`
    },
    {
      role: "Customer",
      prompt: `You are a potential customer. Analyze the user's idea from a user's perspective. Ask specific questions about user needs, user problems, user experience, existing alternatives, reasons to use the product, missing features, and user frustrations. Identify weaknesses and explain why they matter.
Analyze the specific idea provided by the user.`
    },
    {
      role: "Regulator",
      prompt: `You are a regulator. Analyze the user's idea from a legal and ethical perspective. Ask specific questions about privacy, personal data, consent, regulations, legal risks, ethical concerns, and data handling. Identify weaknesses and explain why they matter. Do not provide professional legal advice, only identify areas that should be investigated.
Analyze the specific idea provided by the user.`
    },
    {
      role: "Security Expert",
      prompt: `You are a security expert. Analyze the user's idea from a cybersecurity perspective. Ask specific questions about data security, authentication, unauthorized access, data leaks, sensitive information, API security, privacy, and malicious users. Identify defensive security risks and explain why they matter. Do not provide hacking instructions.
Analyze the specific idea provided by the user.`
    },
    {
      role: "Competitor",
      prompt: `You are a competitor. Analyze the user's idea from a competitive perspective. Ask specific questions about existing competitors, differentiation, competitive advantage, unique features, why users would switch, market position, and copying risk. Identify weaknesses and explain why they matter.
Analyze the specific idea provided by the user.`
    }
  ];

  const generateCritic = async (persona) => {
    const jsonFormat = `
You MUST return ONLY valid JSON matching this exact structure:
{
  "role": "${persona.role}",
  "questions": [
    "First specific question related to the user's idea...",
    "Second specific question related to the user's idea...",
    "Third specific question related to the user's idea..."
  ],
  "criticism": "Specific criticism of the idea",
  "concern": "The main problem identified",
  "severity": "High"
}
NOTE: 'severity' MUST be exactly one of: "Low", "Medium", "High".
`;
    
    try {
      const result = await model.generateContent({
        contents: [
          { role: 'user', parts: [{ text: `Idea: ${idea}` }] }
        ],
        systemInstruction: {
          parts: [{ text: `${persona.prompt}\n${jsonFormat}` }]
        },
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7
        }
      });

      const responseText = result.response.text();
      let parsed = JSON.parse(responseText);
      
      // Validation
      if (!parsed.role) parsed.role = persona.role;
      if (!parsed.questions || !Array.isArray(parsed.questions)) {
        parsed.questions = ["Could you explain more about this idea?", "What are the biggest risks?", "How will you overcome challenges?"];
      }
      if (!parsed.criticism) parsed.criticism = "Criticism could not be extracted from AI response.";
      if (!parsed.concern) parsed.concern = "Unspecified concern.";
      if (!["Low", "Medium", "High"].includes(parsed.severity)) {
         parsed.severity = "Medium"; // Default to Medium if invalid
      }
      
      return parsed;
    } catch (error) {
      console.error(`Failed to generate critic for ${persona.role}:`, error);
      // Return a safe fallback if one critic fails, rather than crashing
      return {
        role: persona.role,
        questions: ["What went wrong with the AI evaluation?", "How can we avoid this error?", "Is the service currently down?"],
        criticism: `Critique failed due to an error: ${error.message}`,
        concern: "Analysis Failure",
        severity: "High"
      };
    }
  };

  // Run all critics concurrently
  const results = await Promise.all(personas.map(persona => generateCritic(persona)));
  
  return results;
};

export { evaluateIdea };
export const analyzeIdea = evaluateIdea;
