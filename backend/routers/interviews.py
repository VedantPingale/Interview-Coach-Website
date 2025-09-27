from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from db import get_supabase_client
from security import get_current_user, jwt_required

router = APIRouter()

class InterviewCreate(BaseModel):
    title: str
    job_role: Optional[str] = None

@router.post('/interviews')
async def create_interview(payload: InterviewCreate, current=Depends(get_current_user)):
    supabase = get_supabase_client()
    table = supabase.table('interviews')
    rec = {
        'owner_id': current['id'],
        'title': payload.title,
        'job_role': payload.job_role,
    }
    res = table.insert(rec).execute()
    if res.status_code >= 400:
        raise HTTPException(status_code=500, detail='Failed to create interview')
    return res.data[0]

@router.get('/interviews')
async def list_interviews(current=Depends(get_current_user)):
    supabase = get_supabase_client()
    table = supabase.table('interviews')
    res = table.select('*').eq('owner_id', current['id']).execute()
    return res.data or []

@router.get('/interviews/{interview_id}')
async def get_interview(interview_id: str, current=Depends(get_current_user)):
    supabase = get_supabase_client()
    table = supabase.table('interviews')
    res = table.select('*').eq('id', interview_id).execute()
    if not res.data or len(res.data) == 0:
        raise HTTPException(status_code=404, detail='Interview not found')
    return res.data[0]
