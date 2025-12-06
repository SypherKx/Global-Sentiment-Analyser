# 🚀 Deployment Guide (GitHub & Vercel)

Your project is now fully configured for deployment!

## 1. Push to GitHub
I have already set up a `.gitignore` file so your API keys (in `.env`) will **NOT** be uploaded. This is safe.

```bash
git init
git add .
git commit -m "Initial commit - Global Sentiment Tracker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Global-Sentiment-Tracker.git
git push -u origin main
```

## 2. Deploy to Vercel
1.  Go to **Vercel.com** and click **"Add New Project"**.
2.  Import your **GitHub Repository**.
3.  **Framework Preset**: Select **Vite**.
4.  **Root Directory**: Let it stay as `./` (Root).
5.  **Environment Variables**:
    *   **IMPORTANT**: You MUST add these in the Vercel Dashboard manually for the app to work!
    *   `MONGO_URI` = `mongodb+srv://...` (Copy from your `.env`)
    *   `BEARER_TOKEN` = `AAAA...` (Copy from your `.env`)

6.  Click **Deploy**.

## 3. Verify
Once deployed, Vercel will give you a link (e.g., `https://global-sentiment-tracker.vercel.app`).
Your app will work perfectly there!
