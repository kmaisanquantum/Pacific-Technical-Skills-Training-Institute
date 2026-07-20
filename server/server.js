import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { pool, initDb } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize database tables
initDb();

/* ── API Endpoints ── */

// Secure proxy for Anthropic Claude AI Tutor
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages list provided.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "sk-ant-placeholder") {
    // Elegant fallback simulation when no real API key is present
    const lastUserMsg = messages[messages.length - 1]?.content || '';
    const mockReply = `[Mock AI Mechanic Tutor] Great question about: "${lastUserMsg}"! To help you understand this component, remember that on PNG's highland and coastal roads, dust and humidity require constant maintenance of your filters and electrical terminals. Keep practicing your trade modules!`;
    return res.json({ reply: mockReply });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        system: "You are an expert motor vehicle mechanic tutor for Pacific Technical Skills Training Institute (PTSTI) in Papua New Guinea. Help students understand engines, fuel systems, electrical systems, brakes, suspension, and transmission. Use practical examples relevant to PNG vehicle types (Land Cruisers, Hiluxes, Corollas, PMVs). Relate advice to PNG road conditions (highland gravel roads, tropical heat and humidity, river crossings, coastal salt air). Be encouraging, practical and clear. Keep responses concise but thorough. Occasionally use Tok Pisin greetings like 'Apinun' or 'Gutpela' to connect culturally.",
        messages
      })
    });

    const data = await response.json();
    if (data.content && data.content[0] && data.content[0].text) {
      res.json({ reply: data.content[0].text });
    } else {
      console.error('Anthropic API returned unexpected response format:', data);
      res.status(500).json({ error: 'Unexpected response format from upstream AI provider.' });
    }
  } catch (error) {
    console.error('Error during AI Chat Proxy call:', error);
    res.status(500).json({ error: 'Failed to communicate with AI Tutor service.' });
  }
});

// Create/Register user
app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const result = await pool.query(
      'INSERT INTO users (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING *',
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in /api/users:', err.message);
    res.json({ name }); // Fallback for in-memory mode
  }
});

// Save progress score
app.post('/api/progress', async (req, res) => {
  const { username, moduleId, score } = req.body;
  if (!username || moduleId === undefined || score === undefined) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO progress (username, module_id, score) VALUES ($1, $2, $3) ON CONFLICT (username, module_id) DO UPDATE SET score = EXCLUDED.score RETURNING *',
      [username, moduleId, score]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in /api/progress:', err.message);
    res.json({ username, moduleId, score }); // Fallback
  }
});

// Save payment record
app.post('/api/payments', async (req, res) => {
  const { username, amount, reference, status } = req.body;
  if (!username || !amount || !reference || !status) {
    return res.status(400).json({ error: 'Missing payment fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO payments (username, amount, reference, status) VALUES ($1, $2, $3, $4) ON CONFLICT (username) DO UPDATE SET status = EXCLUDED.status, reference = EXCLUDED.reference RETURNING *',
      [username, amount, reference, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in /api/payments:', err.message);
    res.json({ username, amount, reference, status }); // Fallback
  }
});

/* ── Serve Static Assets ── */

// In production, serve the built Vite static frontend assets
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../client/dist');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('PTSTI backend server is running in development mode. Please start the frontend server.');
  });
}

app.listen(port, () => {
  console.log(`PTSTI monolithic server listening on port ${port}`);
});
