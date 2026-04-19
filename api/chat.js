export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { messages } = req.body;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://coach-etudiant.vercel.app',
      'X-Title': 'CoachIA — Amadou Niang'
    },
    body: JSON.stringify({ model: 'anthropic/claude-sonnet-4.6', max_tokens: 400, messages })
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
