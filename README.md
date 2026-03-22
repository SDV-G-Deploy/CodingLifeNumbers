# CodingLifeNumbers

MVP landing page for Coding Life Numbers.

## Live
- GitHub Pages: https://sdv-g-deploy.github.io/CodingLifeNumbers/

## Included
- `index.html` — лендинг + MVP форма (дата рождения + контакт) + базовый расчёт кода на клиенте
- `docs/result-template.json` — JSON-шаблон результата для бота/CRM
- `docs/content-plan-10-days.md` — контент-план на 10 дней

## Notes
Текущая форма в демо-режиме сохраняет лид локально в `localStorage` (`cln_last_lead`).
Для production подключить backend webhook (например, Make/n8n/Cloudflare Worker) и отправку в CRM/бот.
