# 🌍 Global Sentiment Tracker

A production-grade, full-stack application that analyzes real-time public sentiment on any topic using a **Hybrid Data Engine** (Twitter, Google News, and Context-Aware Simulation).

![Project Screenshot](https://via.placeholder.com/800x400?text=Sentiment+Tracker+Dashboard)  
*Analyze Markets, Tech, and Global Trends in Real-Time.*

## 🚀 Key Features

*   **🔍 Search Anything**: From "Bitcoin" to "Avengers", the system adapts its analysis context automatically.
*   **📡 Unlimited Real-Time Data**: Bypasses standard API rate limits by aggregating live data from **Google News RSS** and **Twitter**.
*   **🧠 Hybrid Intelligence**:
    *   **Tier 1**: Live Social Data (Twitter API).
    *   **Tier 2**: Global News Headlines (Google News RSS).
    *   **Tier 3**: Smart Fallback Simulation (Ensures 100% uptime for demos).
*   **💎 Premium Glassmorphism UI**: Built with **React** + **Tailwind CSS**, featuring modern translucent cards, dynamic gradients, and smooth **Framer Motion** animations.
*   **📊 Advanced Visualization**: Interactive Donut Charts and Gauge indicators powered by **Recharts**.
*   **🔐 Secure Auth**: Complete Login/Signup system using **MongoDB Atlas** and Bcrypt hashing.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React.js (Vite)
*   **Styling**: Tailwind CSS, PostCSS
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **Charts**: Recharts

### Backend
*   **API**: FastAPI (Python)
*   **NLP**: VADER (Valence Aware Dictionary and sEntiment Reasoner)
*   **Data Aggregation**: Tweepy (Twitter), Feedparser (RSS), Pydantic
*   **Database**: MongoDB (pymongo)

## 📦 Installation

### Prerequisites
*   Node.js & npm
*   Python 3.8+
*   MongoDB Cluster URL

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/sentiment-tracker.git
cd sentiment-tracker
```

### 2. Setup Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🎯 How It Works
1.  User enters a query (e.g., "Apple").
2.  Backend detects the category (Tech/Finance).
3.  System fetches live headlines from Google News and available Tweets.
4.  **VADER** engine processes text for sentiment (Positive/Negative/Neutral).
5.  Frontend visualizes the aggregated "Mood" of the internet.

---
*Built for College Final Year Project 2024.*
