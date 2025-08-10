from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api import transcribe, analyze, sessions

app = FastAPI(title="AI Interview Coach API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(transcribe.router, prefix="/api")
app.include_router(analyze.router, prefix="/api")
app.include_router(sessions.router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "ok"}
