from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime

class UserLogin(BaseModel):
    username: str
    password: str

class UserRegister(BaseModel):
    username: str
    password: str

class TweetAnalysisRequest(BaseModel):
    query: str
    limit: int = 50

class TweetMetric(BaseModel):
    retweet_count: int
    reply_count: int
    like_count: int
    quote_count: int

class TweetItem(BaseModel):
    id: str
    text: str
    created_at: datetime
    metrics: Optional[TweetMetric] = None
    sentiment: str
    sentiment_score: float
    source: str = "twitter" # Default to twitter, can be 'reddit'

class AnalysisResponse(BaseModel):
    summary: Dict[str, int] # e.g. {"Positive": 10, "Negative": 5}
    tweets: List[TweetItem]
