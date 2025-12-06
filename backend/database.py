from dotenv import load_dotenv
import os

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

def get_database():
    try:
        client = MongoClient(MONGO_URI)
        db = client["sentimentDB"]
        print("✅ Connected to MongoDB successfully!")
        return db
    except Exception as e:
        print("❌ MongoDB connection failed:", e)
        return None

db = get_database()
