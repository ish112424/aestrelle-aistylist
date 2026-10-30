const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');
const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');

process.on('uncaughtException', err => console.error('UNCAUGHT EXCEPTION:', err));
process.on('unhandledRejection', reason => console.error('UNHANDLED REJECTION:', reason));
process.on('exit', code => console.log('PROCESS EXITING WITH CODE:', code));
// Load environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_this';

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Multer config for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// API Routes will go here
app.get('/api/weather', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        // Use Open-Meteo API — no API key needed, real-time global data
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`;
        const response = await axios.get(url);
        const cw = response.data.current_weather;
        const humidity = response.data.hourly?.relativehumidity_2m?.[0] ?? 60;

        const temp = cw.temperature;
        const weathercode = cw.weathercode;

        const isRaining = [51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(weathercode);

        let weatherCategory;
        if (isRaining) {
            weatherCategory = 'monsoon';
        } else if (temp >= 35) {
            weatherCategory = 'extreme-heat';
        } else if (temp >= 25 && humidity > 70) {
            weatherCategory = 'humid';
        } else if (temp >= 25) {
            weatherCategory = 'extreme-heat';
        } else if (temp <= 15) {
            weatherCategory = 'cold';
        } else {
            weatherCategory = 'mild-winter';
        }

        const descMap = {0:'clear sky',1:'mainly clear',2:'partly cloudy',3:'overcast',45:'foggy',48:'icy fog',51:'light drizzle',61:'light rain',63:'moderate rain',65:'heavy rain',80:'rain showers',95:'thunderstorm'};
        const description = descMap[weathercode] || 'clear sky';

        res.json({ temperature: Math.round(temp), description, weatherCategory });

    } catch (error) {
        console.error('Weather API Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'aestrelle Backend is running!' });
});

app.post('/api/recommend', async (req, res) => {
    try {
        const { eventType, weather, colorPalette, style, gender, outfitType, customPrompt, styleDNA } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === 'your_gemini_api_key_here') {
            return res.status(500).json({ error: 'Gemini API key not configured' });
        }

        const ai = new GoogleGenerativeAI(apiKey);
        
        let userId = null;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, JWT_SECRET);
                userId = user.id;
            } catch(e) {}
        }

        const wardrobeItems = userId ? db.prepare('SELECT label FROM wardrobe_items WHERE user_id = ?').all(userId).map(i => i.label) : [];
        let wardrobeContext = "";
        if (wardrobeItems.length > 0) {
            wardrobeContext = `\nCRITICAL: The user has these items in their wardrobe: [${wardrobeItems.join(', ')}]. You MUST prioritize building the outfit using these specific items where possible.\n`;
        }

        let customInstructions = "";
        if (customPrompt && customPrompt.trim() !== "") {
            customInstructions = `\nUSER'S CUSTOM AI INSTRUCTIONS (VERY IMPORTANT): "${customPrompt}"\nPlease incorporate this request heavily into your recommendations.\n`;
        }

        let styleDnaContext = "";
        if (styleDNA) {
            styleDnaContext = `\nUSER'S PERSONAL STYLE DNA (CRITICAL PREFERENCES):\n`;
            if (styleDNA.fit) {
                styleDnaContext += `- Fit/Cut Silhouette: Tailor items to be strictly **${styleDNA.fit === 'oversized' ? 'Oversized, Loose-fit and Relaxed' : 'Tailored, Fitted and Structured'}**.\n`;
            }
            if (styleDNA.colors) {
                let colorDesc = "";
                if (styleDNA.colors === 'warm') colorDesc = 'Warm tones (earthy shades, creams, rust, gold, olive green)';
                else if (styleDNA.colors === 'cool') colorDesc = 'Cool tones (pastels, cool greys, sky blues, mint green, silver accents)';
                else if (styleDNA.colors === 'contrast') colorDesc = 'High-contrast monochrome (strict blacks, pure whites, charcoal greys)';
                styleDnaContext += `- Color Harmony Undertone: Favor colors and palettes that match **${colorDesc}**.\n`;
            }
            if (styleDNA.aesthetic) {
                let aestheticDesc = "";
                if (styleDNA.aesthetic === 'minimalist') aestheticDesc = 'Minimalist & Clean (simple lines, basic essentials)';
                else if (styleDNA.aesthetic === 'streetwear') aestheticDesc = 'Streetwear & Edgy (baggy layers, hoodies, cargo details)';
                else if (styleDNA.aesthetic === 'chic') aestheticDesc = 'Chic & Elegant (premium layers, polished materials)';
                styleDnaContext += `- Style Signature Vibe: Base the choices around a **${aestheticDesc}** aesthetic.\n`;
            }
            styleDnaContext += `You MUST strictly tailor all 3 suggestions to align with this Personal Style DNA!\n`;
        }
 
        const prompt = `You are STILÉ, a professional AI fashion stylist. You help both men and women find the perfect outfit.
 
Based on the following inputs, suggest exactly 3 complete outfit combinations:
- Occasion: ${eventType}
- Colour Preference: ${colorPalette}
- Style Vibe: ${style}
- Outfit Type: ${outfitType}
- Current Weather: ${weather}
- Gender: ${gender}
${wardrobeContext}${styleDnaContext}${customInstructions}
 
CRITICAL RULES:
1. Do NOT include or mention any specific brand names (e.g., Levi's, Zara, H&M, Nike, etc.) in any fields. Keep all descriptions brand-neutral.
2. Shorten all outfit details for maximum clarity. Each clothing item description MUST be punchy and short (maximum 5-8 words per item). Avoid long clauses or paragraphs in item names.
3. Be specific about clothing styles, fabric choices, cuts, and colors instead of relying on brands.
 
Provide the response as a JSON ARRAY containing exactly 3 objects. Each object MUST follow this strict structure:
[
  {
    "title": "A catchy outfit name",
    "top": "Generic style/cut description + fabric + color (e.g., 'Relaxed-fit linen shirt in olive green')",
    "bottom": "Generic style/cut description + fabric + color (e.g., 'Slim-fit dark wash denim jeans')",
    "shoes": "Generic shoe style and color (e.g., 'White minimalist canvas sneakers')",
    "accessory": "One generic accessory (e.g., 'Gold-plated minimalist chain')",
    "explanation": "Why it works for the occasion and weather"
  }
]`;

        // Self-healing model list with robust fallbacks in case of 503 high-demand or deprecations
        const modelsToTry = [
            "gemini-2.5-flash",
            "gemini-1.5-flash-latest",
            "gemini-1.5-pro-latest",
            "gemini-1.5-flash",
            "gemini-1.5-pro",
            "gemini-pro"
        ];
        
        let result = null;
        let lastError = null;
        
        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting style generation with model: ${modelName}`);
                const model = ai.getGenerativeModel({ model: modelName });
                result = await model.generateContent(prompt);
                if (result) {
                    console.log(`Success! Stylist response generated using model: ${modelName}`);
                    break;
                }
            } catch (err) {
                lastError = err;
                console.warn(`Model ${modelName} failed or busy. Error: ${err.message}`);
            }
        }
        
        if (!result) {
            throw new Error(`All generative models failed or are currently busy. Last error: ${lastError ? lastError.message : 'Unknown error'}`);
        }
 
        const response = await result.response;
        let text = response.text();
        
        // Bulletproof JSON array extractor
        const startIdx = text.indexOf('[');
        const endIdx = text.lastIndexOf(']');
        if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
            text = text.substring(startIdx, endIdx + 1);
        } else {
            // Clean standard markdown tags
            if (text.startsWith('```json')) {
                text = text.replace(/```json\n?/, '').replace(/\n?```/, '');
            } else if (text.startsWith('```')) {
                text = text.replace(/```\n?/, '').replace(/\n?```/, '');
            }
        }
        
        const recommendations = JSON.parse(text.trim());
        
        const eventData = { event: eventType, weather: weather, style: style, gender: gender };
        
        res.json({ outfits: recommendations, metadata: eventData });
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Failed to generate recommendation' });
    }
});

// Auth Routes
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        try {
            const insert = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
            const info = insert.run(username, hashedPassword);
            const token = jwt.sign({ id: info.lastInsertRowid, username }, JWT_SECRET, { expiresIn: '24h' });
            res.json({ token, username });
        } catch (dbErr) {
            if (dbErr.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                return res.status(400).json({ error: 'Username already exists' });
            }
            throw dbErr;
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
        
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/save-outfit', authenticateToken, (req, res) => {
    try {
        const outfit = req.body;
        const insert = db.prepare(`
            INSERT INTO saved_outfits (user_id, event, weather, style, title, description, outfit, footwear, explanation, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        insert.run(
            req.user.id, 
            outfit.event || null, 
            outfit.weather || null, 
            outfit.style || null,
            outfit.title || null, 
            outfit.description || null, 
            outfit.outfit || null, 
            outfit.footwear || null,
            outfit.explanation || null, 
            outfit.image || null
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Failed to save outfit' });
    }
});

app.get('/api/my-outfits', authenticateToken, (req, res) => {
    try {
        const outfits = db.prepare('SELECT * FROM saved_outfits WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
        res.json(outfits);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch outfits' });
    }
});

app.post('/api/wardrobe', authenticateToken, upload.single('image'), (req, res) => {
    try {
        const label = req.body.label;
        const imagePath = '/uploads/' + req.file.filename;
        const insert = db.prepare('INSERT INTO wardrobe_items (user_id, label, image_path) VALUES (?, ?, ?)');
        const info = insert.run(req.user.id, label, imagePath);
        res.json({ id: info.lastInsertRowid, label, imagePath });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload' });
    }
});

app.get('/api/wardrobe', authenticateToken, (req, res) => {
    try {
        const items = db.prepare('SELECT * FROM wardrobe_items WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch wardrobe' });
    }
});

// Fallback to serve the main HTML file
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
