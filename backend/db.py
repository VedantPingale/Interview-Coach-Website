import os
from supabase import create_client
from dotenv import load_dotenv
load_dotenv()
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
_sb = None
def get_supabase_client():
    global _sb
    if _sb is None:
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise Exception('Supabase not configured. Set SUPABASE_URL and SUPABASE_KEY in env.')
        _sb = create_client(SUPABASE_URL, SUPABASE_KEY)
    return _sb
