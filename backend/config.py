import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "Failed to get secret key")
    UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
    ALLOWED_EXTENSIONS = {"pdf", "docx", "txt"}
    
# Ensure the upload folder exists
os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)