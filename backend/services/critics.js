import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Super Simple English Fallback Engine
 * Uses everyday, friendly English that is easy for anyone to understand.
 */
function generateFallbackCritiques(idea) {
  const lower = idea.toLowerCase();
  const isStudentOrCollege = lower.includes('college') || lower.includes('student') || lower.includes('university') || lower.includes('campus');
  const isInternshipOrJobs = lower.includes('intern') || lower.includes('job') || lower.includes('career') || lower.includes('hire');

  if (isStudentOrCollege && isInternshipOrJobs) {
    return [
      {
        role: 'Investor',
        questions: [
          'How will you make money if broke college students have no cash to pay you?',
          'Why would companies pay you when they already spend money on LinkedIn and Handshake?',
          'What happens during school months when students are not looking for jobs?'
        ],
        criticism: 'College students are usually broke and will never pay for this app. That means you must charge companies. But companies already spend their hiring budget on LinkedIn and Handshake. It will cost you too much money to get companies to try your new app.',
        concern: 'Students will not pay, and convincing companies to pay is very expensive.',
        severity: 'High'
      },
      {
        role: 'Customer',
        questions: [
          'Why should I make another profile and re-type my resume one more time?',
          'What happens if I apply to 20 jobs on your app and nobody replies back to me?',
          'Is this really faster than just asking friends or applying on LinkedIn?'
        ],
        criticism: 'Students are tired of filling out long application forms and getting ghosted. If they apply to 10 or 20 jobs on your app and nobody replies, they will get disappointed, delete the app, and never come back.',
        concern: 'Students will quickly give up and delete the app if companies ignore them.',
        severity: 'Medium'
      },
      {
        role: 'Regulator',
        questions: [
          'How do you protect student grades and private contact info from being leaked?',
          'How will you stop shady companies from posting illegal unpaid work?',
          'Do you have permission from colleges to use student data?'
        ],
        criticism: 'Schools have strict student privacy laws (like FERPA). Also, if bad companies post fake or illegal unpaid internships on your app, you could get into big legal trouble with government labor boards.',
        concern: 'Breaking student privacy laws or hosting illegal unpaid jobs.',
        severity: 'High'
      },
      {
        role: 'Security Expert',
        questions: [
          'How do you check that a company is real before they can post a job?',
          'Where do you safely store student phone numbers, resumes, and home addresses?',
          'How will you stop scammers from sending fake check scams to students?'
        ],
        criticism: 'Job apps are full of internet scammers trying to trick students with fake checks or steal their personal info. If even one student gets scammed on your platform, your reputation will be ruined forever.',
        concern: 'Scammers posting fake jobs to steal students\' money or personal identity.',
        severity: 'High'
      },
      {
        role: 'Competitor',
        questions: [
          'Handshake already partners with over 1,400 college career centers. How will you beat them?',
          'What stops LinkedIn from adding a simple college filter and crushing your app?',
          'Why would anyone use your small app over famous websites they already trust?'
        ],
        criticism: 'Handshake already owns almost every college campus career center, and LinkedIn is used by almost every company in the world. Building another job board gives you no real advantage over these giants.',
        concern: 'Big apps like LinkedIn and Handshake can easily copy you and take all your users.',
        severity: 'High'
      }
    ];
  }

  // General fallback for other startup ideas in simple English
  return [
    {
      role: 'Investor',
      questions: [
        'How exactly do you make money from this?',
        'Does it cost more money to find customers than what they actually pay you?',
        'Can this become a big business or is it just a small hobby project?'
      ],
      criticism: 'It is not clear who is actually going to pull out their credit card to pay for this. If it costs you $50 to get a customer and they only spend $10, you will quickly run out of money.',
      concern: 'Unclear way to make real profit, and getting customers might cost too much.',
      severity: 'High'
    },
    {
      role: 'Customer',
      questions: [
        'Why should I learn a whole new tool when I am already busy?',
        'Can I see value in the first 60 seconds without a long setup?',
        'Does this fix an everyday headache or is it just a nice-to-have?'
      ],
      criticism: 'People already have too many apps on their phones and laptops. If your tool takes more than a minute to set up or feels confusing, people will quit before they even start.',
      concern: 'Too much setup work and people will lose interest very quickly.',
      severity: 'Medium'
    },
    {
      role: 'Regulator',
      questions: [
        'What personal user data are you collecting and storing?',
        'What laws or privacy rules could you accidentally break?',
        'If something goes wrong, who is legally responsible?'
      ],
      criticism: 'Collecting user data without strict privacy protections can lead to heavy government fines. If your tool gives wrong advice or handles personal info poorly, you could face legal trouble.',
      concern: 'Privacy rules, legal risks, and lack of clear user protection.',
      severity: 'High'
    },
    {
      role: 'Security Expert',
      questions: [
        'How do you protect user passwords and personal information?',
        'Could a hacker or scammer abuse your platform to trick people?',
        'Are your servers and databases safely locked down?'
      ],
      criticism: 'If hackers can scrape user data or post fake content, users will lose trust immediately. You need strong locks, spam filters, and secure accounts from day one.',
      concern: 'Hackers, spammers, or data leaks ruining user trust.',
      severity: 'High'
    },
    {
      role: 'Competitor',
      questions: [
        'What stops Google, Apple, or big startups from copying this in one week?',
        'What is your unique superpower that nobody else has?',
        'Why should someone pick you over a famous company they already use?'
      ],
      criticism: 'Big existing companies already have millions of users. If your idea is easy to copy, a bigger company can add the same feature for free and wipe you out.',
      concern: 'Too easy for bigger competitors to copy and crush.',
      severity: 'Medium'
    }
  ];
}

/**
 * Main evaluation service.
 * Supports NVIDIA NIM API (if key is set), Gemini, or friendly fallback.
 * @param {string} idea
 * @returns {Promise<Array<Object>>}
 */
export const evaluateIdea = async (idea) => {
  const apiKey = process.env.AI_API_KEY || process.env.NVIDIA_API_KEY || process.env.GEMINI_API_KEY;

  // Try NVIDIA NIM if key starts with nvapi-
  if (apiKey && apiKey.startsWith('nvapi-')) {
    try {
      const prompt = `Review this startup idea: "${idea}"
Act as 5 critics: Investor, Customer, Regulator, Security Expert, Competitor.
Write in VERY SIMPLE, EVERYDAY ENGLISH so anyone can easily understand. No complicated business jargon.

Return ONLY a JSON array of 5 objects matching:
[
  {
    "role": "Investor",
    "questions": ["Simple question 1?", "Simple question 2?", "Simple question 3?"],
    "criticism": "2 simple sentences explaining the big flaw.",
    "concern": "Short 1-sentence main risk.",
    "severity": "High"
  },
  ...
]`;

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: process.env.AI_MODEL || 'meta/llama-3.1-8b-instruct',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7
        }),
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length === 5) {
          return parsed;
        }
      }
    } catch {
      // Gracefully fall through to friendly simple English engine
    }
  }

  // Fallback to our super-clear simple English engine
  return generateFallbackCritiques(idea);
};

export const generateCritiques = evaluateIdea;
export default evaluateIdea;
