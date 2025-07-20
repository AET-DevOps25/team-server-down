### 🧠 GenAI Service

This microservice powers AI language features within the whiteboard application. It utilizes [FastAPI](https://fastapi.tiangolo.com/), [LangChain](https://python.langchain.com/), and [OpenWebUI](https://gpu.aet.cit.tum.de/) for real-time text completion, summarization, and rephrasing, enhancing user experience with smart, context-aware suggestions.

---

### ✏️ Features

- **POST `/completion`** – Continue a user’s text with a natural single-sentence continuation.
- **POST `/summarization`** – Generate a concise summary for any user-provided text.
- **POST `/rephrase`** – Rephrase user’s text in a more natural, clear, or alternative tone.

---

### ⚡️ Endpoints & Docs

- **API Docs (Swagger UI):** [`/docs`](http://localhost:8000/docs)
- **OpenAPI JSON:** [`/v3/api-docs`](http://localhost:8000/v3/api-docs)
- **Prometheus Metrics:** [`/metrics`](http://localhost:8000/metrics)
- **Health:** [`/health`](http://localhost:8000/health)

---

### 📦 Setup

- Copy `.env.example` → `.env` and fill in your `OPEN_WEB_UI_API_KEY`.
- All other configuration (API URLs, etc.) is handled through environment variables.

---

### 🛠️ Development Info

- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **LLM Backend:** [LangChain](https://python.langchain.com/) connected to OpenWebUI
- **Linting/Formatting:** [`ruff`](https://docs.astral.sh/ruff/)
- **Testing:** [`pytest`](https://docs.pytest.org/)
- **Metrics:** Custom Prometheus exporter provides additionally an `llm_token` metric at `/metrics`.

---

### 🚀 Running the Service

We recommend running the entire application via the root `README.md` instructions to ensure all services work together smoothly.

#### Running GenAI as a Standalone Service

If you want to run only this GenAI service locally with Docker Compose:

```bash
docker compose build genai
docker compose up -d genai
```

---

### 🧹 Linting, Formatting & Testing

You can manually run linting, formatting, and tests for GenAI (from the project root or inside the `genai/` folder):

#### Lint (check code style with Ruff)

```bash
ruff check .
```

#### Format code (auto-fix formatting with Ruff)

```bash
ruff format .
```

#### Check formatting (without changing files)

```bash
ruff format --check .
```

#### Run Tests (with pytest)

Make sure you have the necessary environment variables (see `.env.example`):

```bash
pytest
```
