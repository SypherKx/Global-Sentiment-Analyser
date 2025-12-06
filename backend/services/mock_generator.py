import random
from datetime import datetime, timedelta
from typing import List, Dict

class MockDataGenerator:
    def __init__(self):
        # Category-specific templates
        self.categories = {
            "Finance": {
                "keywords": ["bitcoin", "crypto", "stock", "market", "invest", "coin", "gold", "forex", "nasdaq", "economy"],
                "templates": {
                    "Positive": [
                        "Bullish on {topic}! The fundamentals look incredibly strong right now. 🚀",
                        "Just bought more {topic}. This dip is a massive opportunity.",
                        "The latest news about {topic} is a game changer for the industry.",
                        "Imagine betting against {topic} in 2025. Couldn't be me. #Growth",
                        "{topic} is leading the market rally today. Huge volume incoming!",
                        "My portfolio is up 20% thanks to {topic}. Holding strong! 💎🙌",
                    ],
                    "Negative": [
                        "I'm out of {topic}. The regulatory pressure is just too high.",
                        "Disappointed with the latest update from {topic}. Looks weak. 📉",
                        "{topic} is overvalued at this price point. Waiting for a correction.",
                        "Sold my positions in {topic}. Too much uncertainty right now.",
                        "The hype around {topic} is fading. Time to move on.",
                        "Major red flags appearing for {topic}. Be careful everyone.",
                    ]
                }
            },
            "Tech": {
                "keywords": ["ai", "gpt", "tech", "apple", "google", "microsoft", "code", "software", "app", "phone", "laptop", "server"],
                "templates": {
                    "Positive": [
                        "The new features in {topic} are absolutely mind-blowing. 🤯",
                        "Just tried {topic} for the first time. The UX is buttery smooth.",
                        "{topic} is miles ahead of the competition. Innovation at its finest.",
                        "Can't wait to see what the devs build with {topic} next.",
                        "Finally, a tech product that actually solves a problem: {topic}.",
                    ],
                    "Negative": [
                        "{topic} is so buggy right now. Unusable in production.",
                        "I expected more from the {topic} launch. Feels unfinished.",
                        "Privacy concerns with {topic} are getting hard to ignore.",
                        "The new update for {topic} broke my entire workflow. reverting.",
                        "Overpriced and underdelivering. Standard {topic} behavior.",
                    ]
                }
            },
            "Entertainment": {
                "keywords": ["movie", "film", "music", "song", "game", "netflix", "marvel", "actor", "concert", "album", "show", "series"],
                "templates": {
                    "Positive": [
                        "Just watched {topic} and WOW. Instant classic. 🎬",
                        "Can we talk about how good {topic} is? I'm obsessed.",
                        "The visuals in {topic} are stunning. A masterpiece.",
                        "If you haven't experienced {topic} yet, you are missing out!",
                        "10/10. {topic} exceeded all my expectations.",
                    ],
                    "Negative": [
                        "{topic} was a total letdown. The writing was lazy.",
                        "I don't get the hype around {topic}. It's honestly boring.",
                        "Wasted 2 hours on {topic}. Do not recommend.",
                        "The ending of {topic} ruined the whole franchise for me.",
                        "Visuals were cool, but {topic} had zero plot.",
                    ]
                }
            },
            "General": {
                "keywords": [], # Fallback
                "templates": {
                    "Positive": [
                        "Everyone is talking about {topic} right now! Love the energy.",
                        "Huge respect for what they are doing with {topic}. 👏",
                        "{topic} is exactly what we needed. Finally!",
                        "Seeing so much positivity around {topic} makes me happy.",
                        "The community around {topic} is the best.",
                    ],
                    "Negative": [
                        "I'm really tired of hearing about {topic}. It's everywhere.",
                        "Unpopular opinion: {topic} is overrated.",
                        "Something about {topic} just feels off to me.",
                        "Why is everyone so obsessed with {topic}? I don't get it.",
                        "The controversy surrounding {topic} is getting annoying.",
                    ]
                }
            }
        }
        
    def _detect_category(self, query: str) -> str:
        query_lower = query.lower()
        for cat, data in self.categories.items():
            if cat == "General": continue
            for keyword in data["keywords"]:
                if keyword in query_lower:
                    return cat
        return "General"

    def generate_tweets(self, query: str, limit: int = 50) -> List[Dict]:
        """Generates realistic-looking mocked data for a demo."""
        data = []
        
        # Determine category and bias
        category = self._detect_category(query)
        cat_data = self.categories[category]
        
        # Merge specific templates with general ones for variety
        pos_templates = cat_data["templates"]["Positive"] + self.categories["General"]["templates"]["Positive"]
        neg_templates = cat_data["templates"]["Negative"] + self.categories["General"]["templates"]["Negative"]
        
        bias = random.choice(["Positive", "Negative", "Neutral", "Mixed"])
        
        for _ in range(limit):
            # Choose sentiment
            if bias == "Positive":
                sentiment = random.choices(["Positive", "Neutral", "Negative"], weights=[0.7, 0.2, 0.1])[0]
            elif bias == "Negative":
                sentiment = random.choices(["Positive", "Neutral", "Negative"], weights=[0.1, 0.2, 0.7])[0]
            elif bias == "Neutral":
                sentiment = random.choices(["Positive", "Neutral", "Negative"], weights=[0.2, 0.6, 0.2])[0]
            else:
                sentiment = random.choice(["Positive", "Negative", "Neutral"])

            # Select text
            if sentiment == "Positive":
                text_template = random.choice(pos_templates)
            elif sentiment == "Negative":
                text_template = random.choice(neg_templates)
            else:
                # Neutral templates are often generic enough, or we can add specific ones later
                neutral_templates = [
                    "Just saw a post about {topic}.",
                    "Hmm, thinking about {topic}.",
                    "Reading the latest discussion on {topic}.",
                    "{topic} is trending properly today.",
                    "Mixed feelings about {topic} tbh."
                ]
                text_template = random.choice(neutral_templates)

            text = text_template.format(topic=query)
            
            # Simulate metrics
            likes = random.randint(0, 5000)
            retweets = int(likes * random.uniform(0.1, 0.4))
            replies = int(likes * random.uniform(0.05, 0.2))
            
            created_at = datetime.utcnow() - timedelta(minutes=random.randint(1, 1440))
            source = random.choice(["twitter", "reddit"])
            
            data.append({
                "id": str(random.randint(1000000000, 9999999999)),
                "text": text,
                "created_at": created_at,
                "metrics": {
                    "like_count": likes,
                    "retweet_count": retweets,
                    "reply_count": replies,
                    "quote_count": random.randint(0, 50)
                },
                "source": source
            })
            
        data.sort(key=lambda x: x["created_at"], reverse=True)
        return data
