# Deploy webhook (Cloudflare Worker) for live leads

## 1) Prerequisites
- Cloudflare account
- `npm i -g wrangler` (or use npx)
- Telegram bot token and target chat id

## 2) Configure secrets
From repo root:

```bash
wrangler login
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
```

`TELEGRAM_CHAT_ID` can be your personal chat id or group id.

## 3) Deploy worker

```bash
wrangler deploy
```

After deploy, you'll get URL like:
`https://codinglifenumbers-leads.<subdomain>.workers.dev`

Use endpoint:
`https://codinglifenumbers-leads.<subdomain>.workers.dev/lead`

> Current worker accepts any POST path, so `/lead` is optional but recommended for clarity.

## 4) Connect landing form
In `index.html` set:

```js
const WEBHOOK_URL = 'https://codinglifenumbers-leads.<subdomain>.workers.dev/lead';
```

Commit/push and wait GitHub Pages rebuild.

## 5) Smoke test
Open landing, submit test lead.
Expected:
- success message on page
- Telegram message with lead details

## 6) Optional hardening (next)
- Add HMAC signature header from client (or turnstile)
- Restrict CORS origin to your GitHub Pages domain
- Store leads in D1/Sheets in addition to Telegram
