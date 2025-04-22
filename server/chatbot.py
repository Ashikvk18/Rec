from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# OpenRouter API configuration
OPENROUTER_API_KEY = "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"
ORG_ID = "org-123456"

def call_openrouter(message, session_id):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://recreation.truman.edu",
        "X-Title": "Campus Recreation Chat",
        "OpenAI-Organization": ORG_ID
    }

    # Create system message with context about campus recreation
    system_message = """You are a helpful Campus Recreation Assistant. You can help with:
    1. Information about gym facilities and hours
    2. Fitness classes and schedules
    3. Sports and recreation programs
    4. Membership information
    5. Equipment rentals
    6. General wellness advice
    Keep responses friendly, concise, and focused on campus recreation topics."""

    data = {
        "model": "anthropic/claude-2",
        "messages": [
            {"role": "system", "content": system_message},
            {"role": "user", "content": message}
        ]
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=data
        )
        
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            print(f"Error: {response.status_code}")
            print(f"Response: {response.text}")
            return "I apologize, but I'm having trouble processing your request right now. Please try again."
    except Exception as e:
        print(f"Exception: {str(e)}")
        return "I apologize, but I'm experiencing technical difficulties. Please try again later."

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message')
        session_id = data.get('sessionId')

        if not message:
            return jsonify({"error": "No message provided"}), 400

        response = call_openrouter(message, session_id)
        return jsonify({"response": response})

    except Exception as e:
        print(f"Error in /api/chat: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(port=3000)
