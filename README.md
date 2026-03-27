# Varian Globe — Interactive World Map

An interactive globe presentation built with React and react-globe.gl.

## Features
- **Tab 1 — What your peers have achieved**: Rotating 3D globe with clickable location pins. Click a pin to zoom in and see a hospital card with stats.
- **Tab 2 — What challenges are you facing**: Auto-rotating 3D fan carousel of 7 challenge cards.

## Tech Stack
- React 18
- react-globe.gl
- CSS transitions & animations (no extra animation library)

## Project Structure
```
src/
├── App.js                          # Root — tab routing only
├── App.css                         # Global styles
├── data/
│   ├── locations.js                # Globe pin data
│   └── challenges.js               # Challenge card data
├── utils/
│   └── globe.js                    # lat/lng → pixel math + constants
└── components/
    ├── Branding.jsx / .css         # Top-right logo
    ├── Footer.jsx / .css           # Bottom tab bar + rotate button
    ├── globe/
    │   ├── GlobeTab.jsx            # Globe tab — all zoom/nav state
    │   ├── GlobeView.jsx           # Globe canvas + React pin overlay
    │   ├── LocationCard.jsx        # Slide-in popup card
    │   ├── DetailNav.jsx           # Back / prev / next buttons
    │   └── globe.css
    └── challenges/
        ├── ChallengesTab.jsx       # Carousel logic + auto-rotate
        ├── ChallengeCard.jsx       # Single card in the fan
        ├── ChallengeIcon.jsx       # 7 SVG icons
        └── challenges.css
```

## Getting Started

### Prerequisites
- Node.js v16 or higher
- npm v8 or higher

### Installation & Run
```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 2. Go into the project folder
cd YOUR_REPO_NAME

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

App opens at **http://localhost:3000**

## Adding New Locations
Edit `src/data/locations.js` — add a new object to the array:
```js
{
  lat: 19.07,
  lng: 72.87,
  name: "Tata Memorial Hospital, Mumbai",
  image: "https://your-image-url.jpg",
  stat: "320 fields",
  statDesc: "no longer need completion",
}
```

## Adding New Challenges
Edit `src/data/challenges.js` — add a new object and a matching icon case in `ChallengeIcon.jsx`.