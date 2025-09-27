        from fastapi import APIRouter, Depends, HTTPException, Request
        from fastapi.responses import StreamingResponse, JSONResponse
        from pydantic import BaseModel
        import os, json, asyncio, httpx
        from security import get_current_user
        from db import get_supabase_client

        router = APIRouter()
        OLLAMA_URL = os.getenv('OLLAMA_URL', 'http://localhost:11434')
        MODEL = 'gpt-oss:20b'

        class GenerateQuestionPayload(BaseModel):
            topic: str = ''
            difficulty: str = 'medium'
            role: str = None

        class AnalyzeAnswerPayload(BaseModel):
            interview_id: str
            question: str
            answer: str

        class FeedbackPayload(BaseModel):
            interview_id: str
            answer: str
            context: str = None

        # Simple prompt engineering helpers
        def prompt_for_question(topic, difficulty, role):
            return f"""You are an expert interview coach. Produce one concise interview question about '{topic}' for role '{role or 'general'}' at difficulty '{difficulty}'. Include a short note (1-2 sentences) why this question matters."""

        def prompt_for_analysis(question, answer):
            return f"""You are an experienced technical interviewer and coach. Analyze the following Q&A. Provide: 1) a short score out of 10, 2) 3 concise strengths, 3) 3 concise improvements, and 4) sample bullet-point suggestions the candidate can practice.

Question: {question}

Answer: {answer}

Respond in JSON with keys: score, strengths, improvements, suggestions."""

        async def stream_ollama(prompt: str):
            # Ollama streaming via HTTP -- adjust if your Ollama server differs.
            url = f"{OLLAMA_URL}/api/generate"
            headers = {'Content-Type': 'application/json'}
            payload = {
                'model': MODEL,
                'prompt': prompt,
                'stream': True
            }
            async with httpx.AsyncClient(timeout=None) as client:
                async with client.stream('POST', url, json=payload, headers=headers) as resp:
                    async for chunk in resp.aiter_bytes():
                        if not chunk:
                            continue
                        yield chunk

        @router.post('/generate-question')
        async def generate_question(payload: GenerateQuestionPayload, current=Depends(get_current_user)):
            prompt = prompt_for_question(payload.topic, payload.difficulty, payload.role)
            # Simple call (non-stream) to Ollama
            url = f"{OLLAMA_URL}/api/generate"
            async with httpx.AsyncClient() as client:
                resp = await client.post(url, json={'model': MODEL, 'prompt': prompt})
                if resp.status_code != 200:
                    raise HTTPException(status_code=502, detail='LLM generation failed')
                data = resp.json()
                text = data.get('text') or data.get('output') or str(data)
            return {'question': text}

        @router.post('/analyze-answer')
        async def analyze_answer(payload: AnalyzeAnswerPayload, current=Depends(get_current_user)):
            prompt = prompt_for_analysis(payload.question, payload.answer)
            # We will stream the analysis back to the frontend
            async def generator():
                try:
                    async for chunk in stream_ollama(prompt):
                        yield chunk
                except Exception as e:
                    yield str(e).encode('utf-8')
            return StreamingResponse(generator(), media_type='text/event-stream')

        @router.post('/get-feedback')
        async def get_feedback(payload: FeedbackPayload, current=Depends(get_current_user)):
            # Non-streaming feedback in JSON
            prompt = prompt_for_analysis(payload.context or 'General', payload.answer)
            url = f"{OLLAMA_URL}/api/generate"
            async with httpx.AsyncClient() as client:
                resp = await client.post(url, json={'model': MODEL, 'prompt': prompt})
                if resp.status_code != 200:
                    raise HTTPException(status_code=502, detail='LLM feedback failed')
                data = resp.json()
                text = data.get('text') or data.get('output') or str(data)
            # attempt to parse JSON from the model
            try:
                parsed = json.loads(text)
            except Exception:
                parsed = {'raw': text}
            # save feedback to supabase
            try:
                supabase = get_supabase_client()
                supabase.table('feedback').insert({
                    'owner_id': current['id'],
                    'interview_id': payload.interview_id,
                    'feedback': parsed
                }).execute()
            except Exception:
                pass
            return {'feedback': parsed}

        @router.post('/suggest-improvements')
        async def suggest_improvements(payload: FeedbackPayload, current=Depends(get_current_user)):
            prompt = f"You are a coach. Provide 6 practical improvement steps for this answer: {payload.answer}"
            url = f"{OLLAMA_URL}/api/generate"
            async with httpx.AsyncClient() as client:
                resp = await client.post(url, json={'model': MODEL, 'prompt': prompt})
                if resp.status_code != 200:
                    raise HTTPException(status_code=502, detail='LLM suggestions failed')
                data = resp.json()
                text = data.get('text') or data.get('output') or str(data)
            return {'suggestions': text}
