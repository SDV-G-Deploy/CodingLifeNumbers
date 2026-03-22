# CodingLifeNumbers

MVP landing page for Coding Life Numbers.

## Live
- GitHub Pages: https://sdv-g-deploy.github.io/CodingLifeNumbers/

## Included
- `index.html` — лендинг + MVP форма (дата рождения + контакт) + базовый расчёт кода на клиенте
- `docs/result-template.json` — JSON-шаблон результата для бота/CRM
- `docs/content-plan-10-days.md` — контент-план на 10 дней
- `worker.js` + `wrangler.toml` — готовый Cloudflare Worker для приёма лидов и отправки в Telegram
- `docs/deploy-webhook.md` — пошаговый деплой webhook

## Notes
По умолчанию форма работает в демо-режиме: сохраняет лид локально в `localStorage` (`cln_last_lead`).
Чтобы включить live-поток, задеплой webhook и вставь URL в `WEBHOOK_URL` внутри `index.html`.
