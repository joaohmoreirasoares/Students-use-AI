// EXEMPLO DE BACKEND SEGURO PARA PRODUÇÃO
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Rate limiting - máximo 20 requisições por hora por IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 20,
  message: { error: 'Muitas requisições. Tente novamente em 1 hora.' }
});

app.use('/api/', limiter);

// Cache simples
const cache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutos

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.length > 1000) {
      return res.status(400).json({ error: 'Mensagem inválida' });
    }

    // Verificar cache
    const cacheKey = message.substring(0, 50);
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json({ response: cached.data });
    }

    // Chamar API Gemini com chave segura do .env
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;

    // Salvar no cache
    cache.set(cacheKey, { data: aiResponse, timestamp: Date.now() });
    res.json({ response: aiResponse });

  } catch (error) {
    res.status(500).json({ error: 'Erro interno' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));