from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
CORS(app, resources={r"/summarize": {"origins": "*"}})

# Hugging Face API endpoint
API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
# Your Hugging Face API token (replace with your actual token)
HF_API_TOKEN = os.getenv('HF_API_TOKEN')

headers = {"Authorization": f"Bearer {HF_API_TOKEN}"}

@app.route('/summarize', methods=['POST'])
def summarize_text():
    text = request.json['text']

    payload = {
        "inputs": text,
        "parameters": {
            "max_length": 130,
            "min_length": 30,
            "do_sample": False
        }
    }

    response = requests.post(API_URL, headers=headers, json=payload)
    
    if response.status_code == 200:
        # Extract the summary text from the response
        summary = response.json()[0]['summary_text']
        return jsonify({"summary_text": summary})
    else:
        # Handle errors from the Hugging Face API
        return jsonify({"error": "Failed to summarize text", "details": response.text}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)