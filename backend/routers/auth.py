from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from db import get_supabase_client
from security import create_access_token, verify_password, get_password_hash, jwt_required, get_current_user
from typing import Dict

router = APIRouter()

class RegisterPayload(BaseModel):
    email: EmailStr
    password: str
    full_name: str = None

class LoginPayload(BaseModel):
    email: EmailStr
    password: str

@router.post('/register')
async def register(payload: RegisterPayload):
    supabase = get_supabase_client()
    user_table = supabase.table('profiles')
    # check exists
    existing = user_table.select('id,email').eq('email', payload.email).execute()
    if existing.data and len(existing.data) > 0:
        raise HTTPException(status_code=400, detail='User already exists')
    hashed = get_password_hash(payload.password)
    res = user_table.insert({
        'email': payload.email,
        'password_hash': hashed,
        'full_name': payload.full_name
    }).execute()
    if res.status_code >= 400:
        raise HTTPException(status_code=500, detail='Supabase insert failed')
    user = res.data[0]
    token = create_access_token({'sub': user['id'], 'email': user['email']})
    return {'access_token': token, 'token_type': 'bearer', 'user': {'id': user['id'], 'email': user['email'], 'full_name': user.get('full_name')}}

@router.post('/login')
async def login(payload: LoginPayload):
    supabase = get_supabase_client()
    user_table = supabase.table('profiles')
    res = user_table.select('*').eq('email', payload.email).execute()
    if not res.data or len(res.data) == 0:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid credentials')
    user = res.data[0]
    if not verify_password(payload.password, user.get('password_hash','')):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid credentials')
    token = create_access_token({'sub': user['id'], 'email': user['email']})
    return {'access_token': token, 'token_type': 'bearer', 'user': {'id': user['id'], 'email': user['email'], 'full_name': user.get('full_name')}}

@router.get('/me')
async def me(current=Depends(get_current_user)):
    return current
