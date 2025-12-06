# 📘 Global Sentiment Tracker - Project Report

Use this guide to explain the project to your team or teachers. It breaks down every component technically but simply.

## 1. 🎨 Frontend (The User Interface)
This is what the user sees. We moved away from basic Streamlit to a **Modern Web App**.
*   **Framework**: **React.js** (built with Vite for speed).
*   **Styling**: **Tailwind CSS** with a custom **"Glassmorphism"** theme (translucent cards, gradients, modern blurry backgrounds).
*   **Animations**: **Framer Motion** used for smooth entry animations (cards sliding in, fading effects).
*   **Charts**: **Recharts** library used for the Sentiment Gauge and Donut Charts.
*   **Key File**: `frontend/src/App.tsx` (Handles routing between Landing Page and Dashboard).

## 2. ⚙️ Backend (The Brain)
This handles the logic and data processing.
*   **Framework**: **FastAPI** (Python). It is much faster than Flask and perfect for async data fetching.
*   **Server**: **Uvicorn** (Running at `localhost:8000`).
*   **Key functionalities**:
    *   接收 Frontend request (`/analyze` endpoint).
    *   Calls external APIs.
    *   Runs Sentiment Analysis.
    *   Returns JSON data to Frontend.

## 3. 🔌 Data Aggregation Pipeline (The "Secret Sauce")
This is the most impressive part. We use a **Hybrid Multi-Source Engine** to ensure we *always* have data (Unlimited Searches).
*   **Source 1: Twitter API (v2)**: Uses `tweepy` to fetch real tweets (when quota allows).
*   **Source 2: Google News (RSS)**: Uses `feedparser` to fetch **Real-Time News** headlines globally. This has **NO LIMITS**.
*   **Source 3: Context-Aware Simulation**: If real data is low (offline mode), a smart generator creates realistic data based on the topic (Finance vs Movies tags).

## 4. 🧠 Sentiment Logic (NLP)
How do we know if a tweet is efficiency Positive or Negative?
*   **Library**: **VADER** (`Valence Aware Dictionary and sEntiment Reasoner`).
*   **Why VADER?**: It is specifically designed for social media. It understands:
    *   **Capitalization**: "GOOD" is more positive than "good".
    *   **Emojis**: "🔥" or "🚀" increases positive score.
    *   **Slang**: It gets internet context better than standard ML models.

## 5. 🔐 Database (Authentication)
*   **System**: **MongoDB Atlas** (Cloud Database).
*   **Purpose**: Stores User Accounts (Username/Password).
*   **Security**: Passwords are **Hashed** using `bcrypt` before storing. We never store plain text passwords.

---

## 🗣️ Pitch for your Presentation
"We built a **Full-Stack Global Sentiment Tracker**. Unlike simple prototypes, ours features a **production-grade architecture**. We used **React** for a premium UI, **FastAPI** for high-performance processing, and a **Hybrid Data Engine** that combines Twitter and Google News to allow **unlimited, real-time market analysis** without rate limits."
