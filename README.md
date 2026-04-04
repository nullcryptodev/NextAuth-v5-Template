# NextAuth v5 Template

A production-ready authentication template built with **NextAuth v5**, **Supabase**, and **Next.js**.

This project demonstrates how to implement OAuth authentication (Google) and persist authenticated users into a Supabase database for long-term use across your application.

It’s designed to be:
- **Reusable** → drop into new projects
- **Extendable** → add more providers easily
- **Safe by default** → handles user creation, linking, and edge cases

## ✨ Features
- 🔐 Google OAuth authentication via NextAuth v5
- 🧠 Automatic user creation & lookup in Supabase
- 🔗 Account linking (email ↔ OAuth provider)
- 🖼️ Optional profile image + name syncing
- ⚡ Built with App Router (Next.js)
- 🎨 Styled using Tailwind + shadcn/ui + Lucide
- 🧱 Clean, scalable project structure

## 🧠 How It Works
1. User signs in with Google via NextAuth
2. NextAuth returns user profile data
3. We run a `find_or_create_user` flow:
    - Check if user exists via `google_id`
    - Fallback to email (for account linking)
    - Create user if none exists
4. User data is stored in Supabase for future use

This allows you to:
- Store app-specific data tied to users
- Build features like teams, profiles, permissions, etc.

## Getting Started

### 1. Install dependencies
`pnpm install`

### 2. Set up environment variables

Create a .env.local file:

```
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

> You can also alter the `utils/secrets.ts` file

### 3. Set up Supabase

Create a users table:

```sql
create table users (
  id bigint generated always as identity primary key,
  email text unique,
  name text,
  google_id text unique,
  profile_image text,
  created_at timestamp default now()
);
```

> ⚠️ Make sure email and google_id are UNIQUE to prevent duplicates.

### 4. Run the app
`pnpm run dev`

## 🔒 Authentication Flow
- Uses NextAuth v5 auth() for server-side session handling
- OAuth provider: Google (extendable)
- Supabase is used only as a database, not for auth

## 🧱 Tech Stack
NextAuth.js v5
Next.js (App Router)
Supabase
React
Tailwind CSS
shadcn/ui

## 📁 Project Structure (Simplified)
```
/app                → Next.js app router pages
/blocks             → Feature-based UI blocks
/components         → Reusable UI components
/types              → TypeScript types
/utils              → Helpers (auth, supabase, etc.)
```

## ⚠️ Notes
This template does not use Supabase Auth intentionally
All identity is handled through NextAuth
Supabase acts as your application database


## Screenshots

`/`
![Login](/public/page-1.png)

`/dashboard`
![Login](/public/page-2.png)
