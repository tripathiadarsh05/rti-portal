# RTI AI Portal

Production-oriented Right to Information portal built with Next.js App Router, JavaScript, Tailwind, MongoDB/Mongoose and the OpenRouter API.

## Quick start

1. Copy `.env.example` to `.env.local` and fill in MongoDB, JWT, and OpenRouter values.
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:3000`. Register a citizen account. An administrator can promote accounts directly in MongoDB (`role: admin` or `officer`) and assign a `department`.

Automatic department classification and officer draft generation require a valid `OPENROUTER_API_KEY`. MongoDB and the remaining citizen/officer workflow continue to work independently if AI is unavailable.

## Deployment

Deploy to Vercel or any Node 18+ host. Set all variables in `.env.example`, allow your host IP in MongoDB Atlas, and set `NEXT_PUBLIC_APP_URL` to the public URL. Persist uploads with an object store in production (the included local storage adapter is intentionally replaceable).

### Render

This repository includes `render.yaml`. Push it to GitHub, create a Render Blueprint from the repository, and supply the secret environment values prompted by Render. Set `NEXT_PUBLIC_APP_URL` to the generated `https://...onrender.com` URL after the first deployment. Use MongoDB Atlas (not local MongoDB) and allow Render network access in Atlas. For durable uploads on Render, replace the local upload adapter with S3, Cloudinary, or another object store before production use.

### VS Code / local development

Open this folder in VS Code, copy `.env.example` to `.env.local`, then run `npm install` and `npx next dev --port 5901`. A preconfigured **Run RTI Portal (port 5901)** debug target is also available in VS Code's Run and Debug panel.

## Security notes

Passwords are bcrypt-hashed; sessions are signed JWTs in secure HTTP-only cookies; all mutation APIs validate Zod input and enforce server-side roles; documents are type/size checked; every sensitive workflow operation is audit logged. AI drafts are never sent to citizens until an officer explicitly approves them.
