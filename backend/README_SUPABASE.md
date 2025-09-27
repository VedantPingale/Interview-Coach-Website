## Supabase Schema Recommendations

Suggested tables and minimal columns:

profiles (id uuid primary key, email text unique, password_hash text, full_name text, created_at timestamp)
interviews (id uuid primary key, owner_id uuid references profiles(id), title text, job_role text, created_at timestamp)
responses (id uuid primary key, interview_id uuid references interviews(id), question text, answer text, created_at timestamp)
feedback (id uuid primary key, owner_id uuid references profiles(id), interview_id uuid, feedback jsonb, created_at timestamp)

Create these manually in Supabase SQL editor or adapt to your preferences.
