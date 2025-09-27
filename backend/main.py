import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers import auth, interviews, ai

load_dotenv()
app = FastAPI(title='AI Interview Coach - Backend')

origins = os.getenv('FRONTEND_ORIGINS', 'http://localhost:3000').split(',')
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth.router, prefix='/api', tags=['auth'])
app.include_router(interviews.router, prefix='/api', tags=['interviews'])
app.include_router(ai.router, prefix='/api', tags=['ai'])

@app.get('/')
async def root():
    return {'ok': True, 'message': 'Interview Coach backend running'}
