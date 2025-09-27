import os, time
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from db import get_supabase_client

pwdctx = CryptContext(schemes=['bcrypt'], deprecated='auto')
bearer = HTTPBearer()
JWT_SECRET = os.getenv('JWT_SECRET', 'please-change-me')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRES = 60 * 60 * 24 * 7  # 7 days

def get_password_hash(password: str) -> str:
    return pwdctx.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    try:
        return pwdctx.verify(password, hashed)
    except Exception:
        return False

def create_access_token(data: dict):
    now = int(time.time())
    payload = {**data, 'iat': now, 'exp': now + ACCESS_TOKEN_EXPIRES}
    return jwt.encode(payload, JWT_SECRET, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
    except JWTError:
        return None

async def jwt_required(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    token = credentials.credentials
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid or expired token')
    # fetch user from supabase
    supabase = get_supabase_client()
    res = supabase.table('profiles').select('*').eq('id', payload.get('sub')).execute()
    if not res.data or len(res.data) == 0:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='User not found')
    return res.data[0]

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    token = credentials.credentials
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid or expired token')
    supabase = get_supabase_client()
    res = supabase.table('profiles').select('*').eq('id', payload.get('sub')).execute()
    if not res.data or len(res.data) == 0:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='User not found')
    return res.data[0]
