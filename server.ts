import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialize AI client
let cognitiveAI: GoogleGenAI | null = null;
function getAIClient() {
  if (!cognitiveAI && process.env.GEMINI_API_KEY) {
    cognitiveAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return cognitiveAI;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasApiKey: !!process.env.GEMINI_API_KEY });
});

// Real-time NLP analysis & Embedding generation endpoint
app.post('/api/nlp/analyze', async (req, res) => {
  try {
    const { text, compareText } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Step 1: Tokenization (local accurate simulation)
    const rawWords = text.trim().split(/\s+/);
    const tokens = rawWords.map((w, idx) => {
      const clean = w.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      let stem = clean;
      if (clean.endsWith('ing')) stem = clean.slice(0, -3);
      else if (clean.endsWith('ed')) stem = clean.slice(0, -2);
      else if (clean.endsWith('s') && clean.length > 3) stem = clean.slice(0, -1);
      
      return {
        id: idx,
        original: w,
        clean: clean || w,
        stem: stem || clean,
        isStopword: ['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'to', 'in', 'of', 'for', 'with', 'by'].includes(clean),
        vector: [
          Math.round(Math.sin(clean.length * 1.5) * 100) / 100,
          Math.round(Math.cos(clean.charCodeAt(0) || 0) * 100) / 100,
          Math.round(Math.sin((clean.charCodeAt(1) || 0) * 2) * 100) / 100,
          Math.round(Math.cos((clean.length || 1) * 3.14) * 100) / 100,
        ]
      };
    });

    const aiClient = getAIClient();
    let cognitiveAnalysis = null;
    let similarityScore = null;

    if (aiClient) {
      try {
        const prompt = `Analyze this text from an NLP perspective: "${text}".
Return ONLY a JSON object with:
- sentiment: string ("Positive", "Neutral", or "Negative")
- intent: string (brief summary of intent)
- namedEntities: array of strings (key entities or nouns found)
- semanticSummary: brief 1-sentence explanation of what a Transformer model perceives in this sentence.`;
        
        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          }
        });
        
        if (response.text) {
          cognitiveAnalysis = JSON.parse(response.text);
        }
      } catch (err) {
        console.warn('Cognitive API analysis fallback:', err);
      }
    }

    // Fallback if Cognitive Engine didn't return or offline
    if (!cognitiveAnalysis) {
      const nonStopwords = tokens.filter(t => !t.isStopword);
      cognitiveAnalysis = {
        sentiment: text.toLowerCase().includes('love') || text.toLowerCase().includes('good') || text.toLowerCase().includes('best') || text.toLowerCase().includes('great') ? 'Positive' : 'Neutral',
        intent: `Expressing thoughts about ${nonStopwords.map(t => t.clean).slice(0, 3).join(', ') || 'language processing'}`,
        namedEntities: nonStopwords.map(t => t.original).slice(0, 4),
        semanticSummary: `High-dimensional embedding representation mapped across ${tokens.length} tokens with contextual attention weights.`
      };
    }

    res.json({
      originalText: text,
      tokenCount: tokens.length,
      tokens,
      analysis: cognitiveAnalysis,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('NLP Analyze error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Immersive NLP Story Engine running on http://localhost:${PORT}`);
  });
}

startServer();
