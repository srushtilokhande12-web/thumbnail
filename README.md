# Thumbnail Delivery Portal

Client portal for delivering Instagram Reel thumbnails. Clients log in, see their thumbnails, download each image with one tap, and open the matching Instagram Reel to update its cover.

Built with React + Vite. Deploys to Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown (usually http://localhost:5173).
Demo login: `demo` / `demo123`

## Add your own clients and thumbnails

1. Put image files in `public/thumbnails/` (e.g. `reel-05.jpg`).
2. Edit `src/data/clients.js`:
   - change/add a client (`username`, `password`, `name`)
   - for each thumbnail set `title`, `image` (`/thumbnails/reel-05.jpg`) and `reelUrl` (the Instagram Reel link)
3. Commit and push. Vercel redeploys automatically.

> Security note: login is checked in the browser, and the credentials live in the built JS bundle. It is fine for a lightweight delivery page, but don't rely on it to protect sensitive files. Thumbnail images in `public/` are also reachable by direct URL.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output `dist`.
4. Click **Deploy**.
