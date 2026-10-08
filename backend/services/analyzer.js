/**
 * Analyzes an idea and its criticisms to produce a final strategic analysis.
 * 
 * @param {Object} input
 * @param {string} input.idea - The original idea.
 * @param {Array} input.critics - Array of criticisms { role, criticism, concern, severity }
 * @returns {Promise<Object>} - The analysis result { biggestWeaknesses, improvements, improvedIdea }
 */
async function analyzeIdea({ idea, critics }) {
  if (!idea || !critics || !Array.isArray(critics)) {
    throw new Error('Invalid input: "idea" must be a string and "critics" must be an array.');
  }

  const prompt = `
You are an expert strategic analyst for a startup incubator. Your job is to review a proposed idea and the feedback from five different critics, then provide a final synthesized analysis.

ORIGINAL IDEA:
${idea}

CRITICISMS:
${JSON.stringify(critics, null, 2)}

INSTRUCTIONS:
1. Read all the criticisms carefully.
2. Identify repeated or connected problems. Do not blindly accept every criticism; use reasoning to determine which problems matter most as some may conflict.
3. Rank the most important weaknesses (approximately 3-5 items).
4. Explain how each weakness can be fixed (approximately 3-5 practical improvements).
5. Create an improved version of the original idea using the strongest improvements. Make it sound like a realistic startup/project proposal. Do not completely replace the original idea; improve it based on the criticisms.

You must respond strictly in JSON format. The response must match this schema exactly:
{
  "biggestWeaknesses": [
    {
      "problem": "string (The core problem)",
      "whyItMatters": "string (Explanation of why this is a critical issue)",
      "severity": "Low" | "Medium" | "High"
    }
  ],
  "improvements": [
    "string (Practical improvement 1)",
    "string (Practical improvement 2)"
  ],
  "improvedIdea": "string (The rewritten, improved idea)"
}
`;

  // Determine which API to use based on available environment variables.
  // We prefer OpenAI, but fallback to Gemini if available.
  const openAiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (openAiKey) {
    return await callOpenAI(prompt, openAiKey);
  } else if (geminiKey) {
    return await callGemini(prompt, geminiKey);
  } else {
    throw new Error('Missing API Key: Please set OPENAI_API_KEY or GEMINI_API_KEY in your environment variables.');
  }
}

async function callOpenAI(prompt, apiKey) {
  const url = 'https://api.openai.com/v1/chat/completions';
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${apiKey}\`
    },
    body: JSON.stringify({
      model: 'gpt-4o', // Assuming GPT-4o for best reasoning, fallback to gpt-4-turbo or gpt-3.5-turbo if needed
      messages: [
        { role: 'system', content: 'You are a helpful assistant designed to output strict JSON.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(\`OpenAI API error: \${response.status} - \${errorText}\`);
  }

  const data = await response.json();
  const resultText = data.choices[0].message.content;
  return JSON.parse(resultText);
}

async function callGemini(prompt, apiKey) {
  const url = \`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=\${apiKey}\`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(\`Gemini API error: \${response.status} - \${errorText}\`);
  }

  const data = await response.json();
  const resultText = data.candidates[0].content.parts[0].text;
  return JSON.parse(resultText);
}

module.exports = {
  analyzeIdea
};
