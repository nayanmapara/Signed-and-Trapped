from flask import Blueprint, request, jsonify
from app.file_handler import save_file
from app.text_extractor import extract_text
from app.ai_analysis import analyze_text
from config import Config
import os
import json

main = Blueprint("main", __name__)

@main.route("/status", methods=["GET"])
def status():
    return jsonify({"message": "API is running"}), 200

@main.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    file_path = save_file(file, Config.UPLOAD_FOLDER)

    if not file_path:
        return jsonify({"error": "Invalid file type"}), 400

    text = extract_text(file_path)
    analysis = analyze_text(text)
    
    analysis = json.loads(analysis)
        
    analysis = analysis["message"]["content"][0]["text"].strip("```").lstrip("json")
    
    analysis = json.loads(analysis)

    return jsonify({"analysis": analysis})
