from fastapi import APIRouter, UploadFile, File
from backend.services.speech_to_text import transcribe_audio


router = APIRouter()

@router.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    audio_bytes = await file.read()
    text = transcribe_audio(audio_bytes)
    return {"transcript": text}
