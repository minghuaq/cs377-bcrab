# API Configuration
Api configuration is handled in `/.env.local`.

## Keys

### Rate Limit
The number of requests allowed per minute.

Key: `RATE_LIMIT`

### API Path
The url of the remote llm api. Only openrouter is supported, although anyone with an identical API should work.

Key: `API_PATH`

### API Key
The authentication key for the API. Authorizes using the `Authorization : "Bearer "` header.

Key: `API_KEY`

### Model
Which model to use.

Key: `MODEL`

### Base URL
Store your base url, http://localhost:3000/ for local and https://cs377-bcrab.vercel.app/ for production.

Key: `NEXT_PUBLIC_BASE_URL`

### Databse url

URL that the database can be found at.

THIS MUST BE PLACED IN `.env`, NOT `.env.local`

Follows the format postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA

Key: `DATABASE_URL`