import os
from dotenv import load_dotenv

load_dotenv()

BEARER_TOKEN = os.getenv("BEARER_TOKEN")

class TwitterService:
    def __init__(self):
        self.client = tweepy.Client(bearer_token=BEARER_TOKEN)

    def fetch_tweets(self, query: str, limit: int = 50):
        tweets_list = []
        try:
            # Simple pagination logic simplified for the API
            response = self.client.search_recent_tweets(
                query=query + " -is:retweet lang:en", # Added lang:en for better sentiment analysis
                max_results=min(limit, 100), # Cap at 100 per request
                tweet_fields=['created_at', 'author_id', 'public_metrics', 'text']
            )

            if response.data:
                for tweet in response.data:
                    tweets_list.append({
                        "id": str(tweet.id),
                        "text": tweet.text,
                        "created_at": tweet.created_at,
                        "metrics": tweet.public_metrics
                    })
            
            return tweets_list

        except Exception as e:
            print(f"⚠️ Error fetching tweets: {e}")
            return []
