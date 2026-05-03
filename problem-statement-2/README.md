# 🗳️ ElectIQ — Interactive Election Education Website

A fully non-partisan, interactive website that helps users understand how elections work through visual journeys, country comparisons, a role-play simulator, and an AI-powered Q&A guide.

---

## 📁 Project Structure

```
election-site/
├── index.html              ← Landing page
├── css/
│   ├── main.css            ← Global styles, nav, footer, typography
│   ├── journey.css         ← Election journey page styles
│   ├── compare.css         ← Country comparison styles
│   ├── simulator.css       ← Simulator game styles
│   └── qa.css              ← Q&A chat styles
├── js/
│   ├── main.js             ← Landing page scripts (counter animations)
│   ├── journey.js          ← 8-stage election journey logic
│   ├── compare.js          ← Country data + radar chart
│   ├── simulator.js        ← 8-scenario election simulation game
│   └── qa.js               ← Claude AI chat integration
└── pages/
    ├── journey.html         ← Visual election journey
    ├── compare.html         ← Country comparator
    ├── simulator.html       ← Role-play simulator
    └── qa.html              ← AI Q&A guide
```

---

## 🚀 Features

### 1. 🗺️ Visual Election Journey (`pages/journey.html`)
- 8 interactive stages from Voter Registration → Inauguration
- Animated visuals for each stage (ballots, urns, vote counters)
- Progress bar as you move through stages
- Timeline overview panel
- Details: Who's involved, What happens, Why it matters

### 2. 🌍 Country Comparator (`pages/compare.html`)
- 10 countries pre-loaded (US, UK, Germany, France, India, Australia, Brazil, Sweden, Japan, Nigeria)
- Compare across 10 dimensions: voting method, registration, electoral system, turnout, etc.
- Animated radar chart for democracy index comparison
- Key facts and notes for each country

### 3. 🎮 Election Simulator (`pages/simulator.html`)
- 8 crises spanning all election stages (50 in-game days)
- Real-time metrics: Public Trust, Voter Turnout, Legal Compliance
- 4 choices per scenario with different consequences
- Decision log and final grade (A+ through D)
- Fully replayable

### 4. 🤖 AI Q&A Guide (`pages/qa.html`)
- Powered by Claude AI (claude-sonnet-4)
- Non-partisan system prompt
- 10 suggested starter questions
- Multi-turn conversation history
- Covers elections worldwide

---

## 🛠️ Setup & Deployment

### Option 1: Open Locally (No Server Required)
```bash
git clone <your-repo-url>
cd election-site
# Open index.html in a browser
open index.html
```

### Option 2: Deploy to GitHub Pages
```bash
git init
git add .
git commit -m "Initial ElectIQ commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
# Then enable GitHub Pages in repo Settings → Pages → Deploy from main branch
```

### Option 3: Deploy to Netlify / Vercel
- Drag and drop the `election-site/` folder to netlify.com/drop
- Or connect your GitHub repo to Vercel for auto-deploy

---

## 🔑 API Key Setup (for Q&A page)

The Q&A page calls the Anthropic API. For production:

1. Get an API key at [console.anthropic.com](https://console.anthropic.com)
2. **Never expose your API key in frontend code for a public site**
3. For production, create a simple backend proxy:

### Simple Node.js Proxy (recommended for production)
```js
// server.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(req.body)
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3000);
```

Then update `qa.js` to call `/api/chat` instead of the Anthropic API directly.

---

## 🎨 Tech Stack

- **Pure HTML, CSS, JavaScript** — No frameworks, no build step
- **Google Fonts** — Playfair Display (headings) + DM Sans (body)
- **Canvas API** — Custom radar chart in country comparator
- **Anthropic Claude API** — AI Q&A guide
- **CSS Animations** — All animations are pure CSS or vanilla JS

---

