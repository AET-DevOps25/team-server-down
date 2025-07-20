### 🧠 GenAI Service
This service provides AI-powered language features integrated into the whiteboard application, enhancing user interactions through smart text processing.

### ✏️ Features

- `/completion` – Assists in completing the user's input text.
- `/summarization` – Generates a summary based on the user's input.
- `/rephrase` – Rewrites the user's text for improved clarity or tone.


### 📦 Setup

You can set the api key by created one .env file, there is also template available for .env.example

### 📔 Local Testing

In order to test locally if the particular endpoints are 

```bash
curl -X POST http://localhost:8000/completion \
  -H "Content-Type: application/json" \
  -d '{"user_text": ["This is the beginning of a story"]}'
```




