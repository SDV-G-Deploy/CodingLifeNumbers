export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const payload = await request.json();
      const { birthDate, contactType, contact, serialCode3, serialCode4, createdAt, source } = payload || {};

      if (!birthDate || !contactType || !contact) {
        return new Response(JSON.stringify({ ok: false, error: 'missing required fields' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      const safe = (v) => String(v ?? '').replace(/[<>&]/g, '');
      const text = [
        '🆕 Новый лид CodingLifeNumbers',
        `Дата: ${safe(birthDate)}`,
        `Контакт: ${safe(contactType)} ${safe(contact)}`,
        `Код(3): ${(serialCode3 || []).join(' — ')}`,
        `Код(4): ${(serialCode4 || []).join(' — ')}`,
        `Источник: ${safe(source || 'unknown')}`,
        `Время: ${safe(createdAt || new Date().toISOString())}`,
      ].join('\n');

      const tgResp = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text,
          disable_web_page_preview: true,
        }),
      });

      if (!tgResp.ok) {
        const details = await tgResp.text();
        return new Response(JSON.stringify({ ok: false, error: 'telegram send failed', details }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (e) {
      return new Response(JSON.stringify({ ok: false, error: e.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  },
};
