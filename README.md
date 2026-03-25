# SSR Demo (React + Vite + Hono + Bun)

This project renders a React app on the server, sends HTML to the browser, and then hydrates it on the client.

## SSR Logic (Current Flow)

1. Build client and server bundles:
   - `vite build --outDir dist/client`
   - `vite build --ssr src/entry-server.tsx --outDir dist/server`
2. Start the Bun server (`server.ts`).
3. Server loads the built HTML template from `dist/client/index.html`.
4. For each request:
   - Call `render()` from `dist/server/entry-server.js`.
   - `render()` uses `renderToString(<App />)` and returns HTML.
   - Replace `<!--ssr-outlet-->` in the template with that HTML.
   - Return final HTML to the browser.
5. In the browser, `src/main.tsx` runs `hydrateRoot(...)` to attach React to the server-rendered markup.

## Key Files

- `src/entry-server.tsx`: server render entry (`renderToString`).
- `server.ts`: Hono server, template injection, SSR response.
- `index.html`: contains `<div id="root"><!--ssr-outlet--></div>` placeholder.
- `src/main.tsx`: client hydration entry (`hydrateRoot`).
- `package.json`: build/start scripts.

## Run

```bash
bun install
bun run build
bun run start
```

Open `http://localhost:3000` (or the port shown by Bun).

## Notes from Logic Check

- SSR pipeline is correct: server render -> HTML injection -> client hydration.
- Static files are served from `dist/client` via catch-all middleware in `server.ts`.
- Root assets such as `/favicon.svg` and `/icons.svg` now work without additional routes.
- The `/` path still goes through SSR rendering; static middleware intentionally skips it.
