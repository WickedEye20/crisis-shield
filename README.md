# CrisisLens Frontend – UI for AI Crisis Misinformation Detection & Verification

This is the frontend interface for CrisisLens, an AI-powered platform used to monitor crisis-related misinformation, verify facts, and publish myth-vs-fact updates for public safety.

## ✨ Features

- Submit news, rumors, links, or screenshots for verification  
- Dashboard to view incoming claims  
- Analyze panel to review AI-generated verdicts and confidence  
- Publish verified myth-vs-fact cards  
- Public page displaying verified updates  
- Mobile responsive UI  
- Extension UI preview for quick fact check  

## 🏗 Tech Stack

- Framework: React or Next.js  
- Styling: Tailwind CSS / Material UI / Chakra UI (choose one)  
- State Management: Context API or Redux (optional)  
- HTTP Client: Axios / Fetch API  
- Build & Deployment: Vercel / Netlify  

## 📁 Frontend Folder Structure

```text
frontend/
│── src/
│   │── pages/        # screens: dashboard, analyze, public, submit
│   │── components/   # cards, buttons, layout, badges
│   │── services/     # API calls
│   │── context/      # state management (optional)
│   │── assets/       # icons, images
│── public/
│── package.json
│── README.md
🖥 Key Screens / Pages
Dashboard Screen
List incoming claims

Actions: Analyze / Publish / View

Analyze Drawer
Claim details

AI verdict + confidence

Evidence list

Controls: Publish / Mark Unproven / Close

Submit News Page
Submit rumor text

Add link or screenshot

Category selection

Submit button

Public Myth-vs-Fact Page
Claim headline

Verdict badge

Confidence %

Explanation + Calls to Action

Mobile Responsive Page
Card view layout for myth-vs-fact

Chrome Extension UI
Selected text display

Verdict result

CTA to open full page

🔌 Connecting to Backend API (Frontend Responsibilities)
The frontend is responsible for:

Fetching the claim list

Submitting new claims

Triggering verification requests

Publishing fact cards

Fetching public cards

All of these will be done via HTTP calls (Axios or Fetch) to the backend API.

🎨 Suggested UI Design
Theme: Clean, modern, Apple-style minimal

Primary color: Blue (#2563EB)

Dark theme for public page: Navy (#0F172A)

Components: Rounded, soft shadows, large spacing

Typography: Inter / SF Pro / Poppins

🌍 Deployment
Next.js via Vercel
Push the repo to GitHub.

Import into Vercel.

Configure NEXT_PUBLIC_API_BASE_URL (or similar) to point to the backend.

React via Netlify
Run npm run build.

Deploy the build/ folder to Netlify.

🪪 License
MIT License

📬 Contact (Example)
Team CrisisLens