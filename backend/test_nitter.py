from ntscraper import Nitter

def test_nitter():
    scraper = Nitter()
    try:
        print("Scraping 'Bitcoin'...")
        tweets = scraper.get_tweets("Bitcoin", mode='term', number=5)
        print(f"Found {len(tweets.get('tweets', []))} tweets.")
        for t in tweets.get('tweets', [])[:2]:
            print(f"- {t['text'][:50]}...")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_nitter()
