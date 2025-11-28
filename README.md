🚨 CrisisLens – AI Crisis Misinformation Detection & Verification System

CrisisLens is an AI-powered platform designed to detect emerging misinformation during crises (health emergencies, natural disasters, public panic incidents), verify facts using automated reasoning & trusted evidence sources, and publish clear myth-vs-fact updates for the public.

## ✨ Key Features
- Manual + automated claim submission (rumors / links / screenshots)
- AI-based verification suggestions (verdict + confidence)
- Risk-level identification for dangerous misinformation
- Analyst dashboard to verify & publish updates
- Public myth-vs-fact page
- Browser extension support for on-page fact checking
- RAG-ready architecture for future embedding search

## 🧠 System Workflow
User or Auto Submission  
↓  
Incoming Claims Queue  
↓  
AI Verification Engine (Risk + Evidence + Verdict)  
↓  
Analyst Review Panel  
↓  
Publish Myth-vs-Fact Card  
↓  
Public Platform & Browser Extension API  

## 🏗 Tech Stack
- FastAPI (Python)
- Optional React / Next.js frontend
- Modular AI engine (pattern logic + future LLM integration)
- In-memory DB for hackathon, PostgreSQL for production

## ⚙ Installation & Setup
### Requirements
Python 3.9+

### Install dependencies
pip install fastapi uvicorn[standard] python-multipart

### Start the backend
uvicorn main:app --reload --port 4000

### API documentation
http://localhost:4000/docs

## 🧪 Example API Requests
Submit a claim (POST /api/claims)
{ "text": "Tap water in GreenCity is toxic", "url": "http://news.com/article" }

Verify claim (POST /api/claims/{id}/verify)

Publish card (POST /api/claims/{id}/publish)

Public results (GET /api/public/cards)

Extension API (POST /api/extension/check)

## 📂 Project Structure
CrisisLens/
│── main.py
│── README.md
│── frontend/ (optional)
│── extension/ (optional)

## 🔮 Roadmap
- v2 Authentication + PostgreSQL
- v3 Auto ingestion feeds (Twitter, Reddit, RSS)
- v4 RAG + vector DB (FAISS / Chroma)
- v5 Media forensics & deepfake validation

## 🎤 Hackathon Pitch Summary
Problem: Misinformation spreads faster than truth during crises.  
Solution: CrisisLens — real-time AI misinformation verification & truth publishing system.  
Impact: Saves lives, reduces panic, increases trust.  
Demo: Submit rumor → AI verifies → Publish → Public sees trusted fact.

## 🪪 License
MIT License

## 📬 Contact
Team CrisisLenss