from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

# Initialize the Flask application
app = Flask(__name__)
# Enable CORS
CORS(app, resources={r"/summarize": {"origins": "*"}})

# Load the summarization pipeline with the specified model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", tokenizer="facebook/bart-large-cnn")

@app.route('/summarize', methods=['POST'])
def get_summary():
    # Get the text to summarize from the POST request body
    data = request.json
    text_to_summarize = data['text']
    
    # Use the summarizer to summarize the text
    # Set the min_length and max_length as per your requirements
    summary = summarizer(text_to_summarize, min_length=50, max_length=85)
    
    # Return the summarized text as JSON
    return jsonify(summary[0]['summary_text'])

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
