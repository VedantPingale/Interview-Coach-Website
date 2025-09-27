# AI Interview Coach - Python Backend

This project provides a FastAPI backend for an AI Interview Coach that integrates with:
- **Ollama** local LLM (model: `gpt-oss:20b`) — via HTTP requests
- **Supabase** — for user profiles and interview storage
- **JWT** authentication

## Features
- User registration / login (password hashing + JWT)
- Interview session creation, listing, retrieving
- AI endpoints:
  - `/api/generate-question`
  - `/api/analyze-answer`
  - `/api/get-feedback`
  - `/api/suggest-improvements`
- Streaming support for Ollama responses (server-sent streaming)

## Quickstart
1. Copy `.env.example` -> `.env` and fill in values (SUPABASE_URL, SUPABASE_KEY, JWT_SECRET, OLLAMA_URL).
2. Create a Python virtualenv and install requirements:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the app:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
4. Frontend CORS is enabled for `http://localhost:3000` by default; change in `main.py` if needed.

## Notes
- The Ollama HTTP endpoint used in this project is `/api/generate`. If your local Ollama has a different endpoint or requires different fields, adjust `ai.py` accordingly.
- Supabase usage assumes you will use a service role key or anon key and have created a `profiles` and `interviews` table.

