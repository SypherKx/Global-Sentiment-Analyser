import feedparser
from datetime import datetime
from typing import List, Dict

class NewsService:
    def __init__(self):
        self.base_url = "https://news.google.com/rss/search?q={query}&hl=en-US&gl=US&ceid=US:en"

    def fetch_news(self, query: str, limit: int = 10) -> List[Dict]:
        try:
            feed_url = self.base_url.format(query=query)
            feed = feedparser.parse(feed_url)
            
            data = []
            for entry in feed.entries[:limit]:
                # Google News RSS entries usually have 'title', 'link', 'published'
                try:
                    # Parse published date if possible, else use current time
                    # format: 'Fri, 06 Dec 2024 08:30:00 GMT'
                    try:
                        dt = datetime(*entry.published_parsed[:6])
                    except:
                        dt = datetime.utcnow()
                        
                    data.append({
                        "id": entry.id,
                        "text": entry.title,
                        "created_at": dt,
                        "metrics": {
                            "like_count": 0,
                            "retweet_count": 0,
                            "reply_count": 0,
                            "quote_count": 0
                        },
                        "source": "news", # Mark as news
                        "url": entry.link
                    })
                except Exception as e:
                    continue
                    
            return data
        except Exception as e:
            print(f"Error fetching news: {e}")
            return []
