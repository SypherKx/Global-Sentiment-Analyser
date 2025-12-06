from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

class SentimentService:
    def __init__(self):
        self.analyzer = SentimentIntensityAnalyzer()

    def analyze(self, text: str):
        score = self.analyzer.polarity_scores(text)
        compound = score["compound"]
        
        if compound > 0.05:
            label = "Positive"
        elif compound < -0.05:
            label = "Negative"
        else:
            label = "Neutral"
            
        return {
            "score": score,
            "label": label,
            "compound": compound
        }
