# Zartfy

A vivid, editorial art storefront with a browser-based room preview and lightweight catalogue admin.

The interface defaults to Brazilian Portuguese and can be switched to English or Spanish. The preference is remembered in the browser.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The admin is available at `/admin` with prototype password `zartfy-admin`.

## Prototype content model

Artwork changes made in the admin are stored in the browser's `localStorage`. Login state is stored in `sessionStorage`. This is deliberately database-free for rapid validation and is not production authentication.

For production, replace the client store with a Git-backed CMS or managed content service, store images in object storage, and use server-verified authentication.
