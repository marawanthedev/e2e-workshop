# Deploy Mini Shop (bonus)

The API goes to **Render**, the client to **Vercel**, and the database stays on **Neon**.
Deploy the API first, because the client needs its URL.

## 1. API on Render

1. Push your repo to GitHub.
2. Render dashboard > **New** > **Blueprint**, pick your repo. Render reads `render.yaml`.
   (Or create a **Web Service** by hand: build `npm install`, start `npm run start -w server`.)
3. Set the environment variables:
   - `DATABASE_URL`: your Neon connection string (the same one as in `server/.env`)
   - `CLIENT_ORIGIN`: leave `http://localhost:5173` for now, you will change it in step 3
4. Open `https://<your-service>.onrender.com/api/health`. You should see `{"status":"ok"}`.

> The free tier sleeps after 15 minutes without traffic, so the first request after that is slow.

## 2. Client on Vercel

1. Vercel > **Add New** > **Project**, pick the repo.
2. Set **Root Directory** to `client` and turn on **Include source files outside of the Root Directory**
   (the app lives in an npm workspace). Framework preset: **Vite**.
3. Add the environment variable `VITE_API_URL` = `https://<your-service>.onrender.com/api`
4. Deploy and copy your Vercel URL.

## 3. Allow your site through CORS

In Render set `CLIENT_ORIGIN` to your Vercel URL, with no trailing slash:

```
CLIENT_ORIGIN=https://your-app.vercel.app
```

Render redeploys by itself. Open your Vercel URL and the products should load.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Products fail to load and the console says CORS | `CLIENT_ORIGIN` is wrong or has a trailing slash |
| The page calls `localhost:3001` | `VITE_API_URL` is not set. It is read at build time, so redeploy after setting it |
| The API returns 500 | Check the Render logs. Usually `DATABASE_URL` is wrong or the seed script was never run |
| First load takes a long time | Free-tier cold start. Wait about a minute |
