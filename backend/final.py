from flask import Flask, jsonify, request
from transformers import pipeline
from pyngrok import ngrok
import os
from dotenv import load_dotenv

load_dotenv()
NGROK_AUTH_TOKEN = os.getenv('NGROK_AUTH_TOKEN')
# App definition
summaryapp = Flask(__name__)

def generate_summary(text):    
    summarization_pipeline = pipeline("summarization", model="facebook/bart-large-cnn")
    summary = summarization_pipeline(text, max_length=100, min_length=30, do_sample=False)
    summarized_text = summary[0]['summary_text']
    return summarized_text

# API Route
@summaryapp.route('/process_text', methods=['POST'])
def process_text():
    data = request.get_json()
    text = data['text']
    summary = generate_summary(text)
    return jsonify({'processed_text': summary})

if __name__ == '__main__':
    print("Flask web server running. Access the URL shown below to use the service.")
    ngrok.set_auth_token(NGROK_AUTH_TOKEN)
    ngrok_tunnel = ngrok.connect(addr="5000")
    print("Public URL:", ngrok_tunnel.public_url)
    summaryapp.run()
