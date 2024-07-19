# Brief-ME

## Description
Brief-ME is an AI-driven web application for text summarization. The project includes a Python backend and a React frontend. We used a pre-trained open-source natural language processing (NLP) transformer model from Hugging Face. Front-end : HTML, CSS, JavaScript. Back-end : Node.js, Express, Hugging Face Interface API.

## Features
- Summarize long text into concise summaries.
- User-friendly web interface for inputting text and receiving summaries.
- The HTML structure establishes the web app's layout, including a text area for inputting text to summarize, a button to initiate the summarization process, and another text area to display the summarized text. Moreover,the Script controls the front-end interactivity, handling user input, button state (enabled/disabled based on input length), and the API request to the back-end for text summarization.

## Installation
### Backend
1. Clone the repository:
    ```bash
    git clone https://github.com/sonamchophel3/Brief-ME.git
    cd Brief-ME/backend
    ```
2. Create a `.env` file and add your Hugging Face API token:
    ```bash
    echo "HF_API_TOKEN=your_huggingface_api_token" > .env
    ```
3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4. Run the Flask app:
    ```bash
    python server.py
    ```

### Frontend
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the React app:
    ```bash
    npm start
    ```

## Usage
- Open your web browser and navigate to `http://localhost:3000`.
- Enter the text you want to summarize and click on the "Summarize" button.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any improvements or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.