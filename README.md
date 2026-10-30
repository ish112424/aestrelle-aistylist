# aestrelle — AI Fashion Stylist ✦

> **Your personal AI stylist.** Get complete outfit recommendations tailored to your weather, event, color preferences, and personal style DNA — powered by Google Gemini AI.

![aestrelle banner](public/logo.png)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Outfit Engine** | Powered by Google Gemini 2.5 Flash — generates 3 complete outfit combinations per request |
| 🌤 **Live Weather Detection** | Auto-detects your location's real-time weather via Open-Meteo API (no API key needed) |
| 🧬 **Style DNA Quiz** | 3-step personalization quiz (fit, color harmony, aesthetic vibe) that tailors every suggestion |
| 👚 **Digital Wardrobe** | Upload clothing photos — MobileNet AI classifies them and prioritizes them in outfit builds |
| 💾 **Save Outfits** | Swipe-to-save (Tinder-style) outfit cards stored to your personal profile in SQLite |
| 📥 **Lookbook Exporter** | Download a styled PNG lookbook card for any outfit — perfect for Pinterest or Instagram |
| 🖼 **Inspiration Gallery** | Browse curated outfit gallery filtered by occasion (casual, formal, party, sports, travel) |
| 🔐 **Auth System** | JWT-based login/register with bcrypt password hashing |
| 🧠 **Custom AI Prompt** | Add free-text instructions to fine-tune the AI (e.g. "cyberpunk vibe with cargo pants") |

---

## 🗂 Project Structure

```
aestrelle-aistylist/
│
├── server.js              # Express backend — API routes, Gemini AI, auth, wardrobe
├── database.js            # SQLite database init (users, saved_outfits, wardrobe_items)
├── package.json           # Node.js dependencies and scripts
├── .env                   # Environment variables (API keys) — NOT committed to git
├── .gitignore             # Ignores node_modules, .env, db, uploads
│
├── public/                # Frontend (served statically by Express)
│   ├── index.html         # Main app UI — hero, form, result cards, gallery, modals
│   ├── style.css          # Complete design system — dark/light tokens, animations
│   ├── script.js          # All frontend logic — AI calls, auth, wardrobe, gallery, DNA
│   ├── logo.png           # aestrelle brand logo
│   └── images/            # Gallery outfit images
│       ├── casual_outfit.png
│       ├── formal_outfit.png
│       ├── party_outfit.png
│       ├── sports_outfit.png
│       ├── travel_outfit.png
│       └── monsoon_outfit.png
│
└── public/uploads/        # User-uploaded wardrobe images (auto-created, gitignored)
```

---

## 🛠 Tech Stack

### Backend
- **Node.js + Express** — REST API server
- **Google Gemini AI** (`@google/generative-ai`) — outfit generation with self-healing model fallbacks
- **better-sqlite3** — lightweight SQLite database (no setup required)
- **JWT + bcrypt** — secure authentication
- **Multer** — clothing image upload handling
- **Axios** — weather API requests
- **dotenv** — environment variable management

### Frontend
- **Vanilla HTML, CSS, JavaScript** — zero frameworks, pure performance
- **TensorFlow.js + MobileNet** — in-browser AI clothing classification
- **Canvas API** — lookbook card PNG generation and download
- **Google Fonts** — DM Serif Display + Manrope typography
- **Open-Meteo API** — free real-time weather by GPS coordinates

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/ish112424/aestrelle-aistylist.git
cd aestrelle-aistylist
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
JWT_SECRET=your_secure_random_secret_here
PORT=3000
```

> 🔑 Get your free Gemini API key at: [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 4. Run the server
```bash
npm start
```

### 5. Open in browser
```
http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | None | Server health check |
| `GET` | `/api/weather?lat=&lon=` | None | Get weather category from coordinates |
| `POST` | `/api/recommend` | Optional | Generate 3 AI outfit suggestions |
| `POST` | `/api/register` | None | Create a new user account |
| `POST` | `/api/login` | None | Login and receive JWT token |
| `POST` | `/api/save-outfit` | ✅ JWT | Save a liked outfit to user profile |
| `GET` | `/api/my-outfits` | ✅ JWT | Fetch all saved outfits for user |
| `POST` | `/api/wardrobe` | ✅ JWT | Upload a clothing item to wardrobe |
| `GET` | `/api/wardrobe` | ✅ JWT | Fetch all wardrobe items for user |

---

## 🗄 Database Schema

```sql
-- Users table
users (id, username, password, created_at)

-- Saved outfits
saved_outfits (id, user_id, event, weather, style, title, description, outfit, footwear, explanation, image, created_at)

-- Digital wardrobe items
wardrobe_items (id, user_id, label, image_path, created_at)
```

---

## 🧠 AI Model Fallback Chain

The server automatically tries models in priority order if one is busy or deprecated:

1. `gemini-2.5-flash` *(primary)*
2. `gemini-1.5-flash-latest`
3. `gemini-1.5-pro-latest`
4. `gemini-1.5-flash`
5. `gemini-1.5-pro`
6. `gemini-pro`

If all models fail, the frontend falls back to a local rule-based outfit generator so the app never breaks.

---

## 🎨 Outfit Occasions Supported

- 👕 **Casual** — everyday relaxed looks
- 👔 **Formal** — office, meetings, professional settings
- 🎉 **Party** — nightlife, events, celebrations
- 🏃 **Sports** — gym, outdoor activities, athletic wear
- ✈️ **Travel** — comfortable, packable, on-the-go
- 💑 **Date Night** — elegant, romantic evening looks

---

## 📸 Gallery

The inspiration gallery showcases curated outfits for each occasion, filterable by:
`All` · `Casual` · `Formal` · `Party` · `Sports` · `Trending`

---

## 🚀 Scripts

```bash
npm start      # Start the production server
npm run dev    # Start the dev server (same as start)
```

---

## 📄 License

ISC License — Built as a college project.

---

<p align="center">Made with ✦ by <strong>aestrelle</strong> — AI Fashion Assistant</p>
