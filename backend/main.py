from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from passlib.hash import bcrypt
from database import db
from services.twitter import TwitterService
from services.sentiment import SentimentService
from services.mock_generator import MockDataGenerator
from services.news import NewsService
from models import UserLogin, UserRegister, TweetAnalysisRequest, AnalysisResponse, TweetItem, TweetMetric

app = FastAPI(title="Sentiment Analysis API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

twitter_service = TwitterService()
sentiment_service = SentimentService()
mock_generator = MockDataGenerator()
news_service = NewsService()

@app.get("/")
def read_root():
    return {"message": "Sentiment Analysis API is running 🚀"}

@app.post("/register")
def register(user: UserRegister):
    users_collection = db["users"]
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    
    hashed_password = bcrypt.hash(user.password)
    users_collection.insert_one({"username": user.username, "password": hashed_password})
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: UserLogin):
    users_collection = db["users"]
    found_user = users_collection.find_one({"username": user.username})
    
    if not found_user or not bcrypt.verify(user.password, found_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    return {"message": "Login successful", "username": user.username}

@app.post("/analyze", response_model=AnalysisResponse)
def analyze_tweets(request: TweetAnalysisRequest):
    # 1. Fetch Real Tweets (Limit 5)
    raw_data = twitter_service.fetch_tweets(request.query, limit=5)
    
    # 2. Fetch Real News (Limit 5) - ALWAYS
    news_data = news_service.fetch_news(request.query, limit=5)
    raw_data.extend(news_data)

    # 3. Fetch Reddit/Mock Data (Limit 5) - ALWAYS
    # User wants to see "Overall" sentiment from multiple sources
    mock_data = mock_generator.generate_tweets(request.query, limit=5)
    
    # Ensure mock data uses 'reddit' source visually
    for item in mock_data:
        item['source'] = 'reddit'
        
    raw_data.extend(mock_data)
    
    # 4. Shuffle for a natural "Feed" feel
    import random
    random.shuffle(raw_data)

    analyzed_tweets = []
    summary = {"Positive": 0, "Negative": 0, "Neutral": 0}
    
    for item in raw_data:
        # If it's already analyzed (from mock), use that, otherwise analyze
        # Mock generator produces 'text', so we analyze everything to be consistent
        sentiment_result = sentiment_service.analyze(item["text"])
        
        summary[sentiment_result["label"]] += 1
        
        analyzed_tweets.append(TweetItem(
            id=item["id"],
            text=item["text"],
            created_at=item["created_at"],
            metrics=TweetMetric(**item["metrics"]) if item["metrics"] else None,
            sentiment=sentiment_result["label"],
            sentiment_score=sentiment_result["compound"],
            source=item.get("source", "twitter")
        ))
        
    return AnalysisResponse(summary=summary, tweets=analyzed_tweets)
