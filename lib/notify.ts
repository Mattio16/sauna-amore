/**
 * Order email notifications via Resend (https://resend.com).
 * No-op when RESEND_API_KEY is not set — orders are never blocked by email.
 *
 * Env:
 *  RESEND_API_KEY    – Resend API key
 *  ORDER_EMAIL_TO    – where notifications go (default info@saunaamore.it)
 *  ORDER_EMAIL_FROM  – verified sender (default Resend onboarding sender,
 *                      which can only deliver to the Resend account owner's
 *                      address — verify saunaamore.it in Resend to use
 *                      ordini@saunaamore.it and deliver anywhere)
 */

type OrderEmailData = {
  orderId: string;
  orderNumber: string;
  productName: string;
  options: { group: string; option: string; priceDelta: number }[];
  quantity: number;
  totalEstimate: number;
  customerName: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  message: string | null;
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const euro = (n: number) => `€${n.toLocaleString('it-IT')}`;

export async function sendOrderNotification(o: OrderEmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  // Comma-separated list supported, e.g. "info@saunaamore.it, mkirk1066@gmail.com"
  const to = (process.env.ORDER_EMAIL_TO || 'info@saunaamore.it')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const from = process.env.ORDER_EMAIL_FROM || 'Sauna Amore <onboarding@resend.dev>';

  const optionRows = o.options
    .map(
      (op) =>
        `<tr><td style="padding:2px 12px 2px 0;color:#5f7361">${esc(op.group)}</td><td style="padding:2px 0">${esc(op.option)}${op.priceDelta > 0 ? ` (+${euro(op.priceDelta)})` : ''}</td></tr>`,
    )
    .join('');

  const detail = (label: string, value: string | null) =>
    value ? `<tr><td style="padding:2px 12px 2px 0;color:#5f7361">${label}</td><td style="padding:2px 0">${esc(value)}</td></tr>` : '';

  const html = `
  <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#26382b">
    <h2 style="font-weight:normal">Nuova richiesta di preventivo — ${esc(o.orderNumber)}</h2>
    <p style="font-size:18px;margin:4px 0 16px"><strong>${esc(o.productName)}</strong> × ${o.quantity} — <strong>${euro(o.totalEstimate)}</strong></p>
    <table style="font-size:14px;border-collapse:collapse">${optionRows}</table>
    <hr style="border:none;border-top:1px solid #d7ddc9;margin:16px 0" />
    <table style="font-size:14px;border-collapse:collapse">
      ${detail('Cliente', o.customerName)}
      ${detail('Email', o.email)}
      ${detail('Telefono', o.phone)}
      ${detail('Indirizzo', o.address)}
      ${detail('Città', [o.city, o.postalCode].filter(Boolean).join(' ') || null)}
      ${detail('Messaggio', o.message)}
    </table>
    <p style="margin-top:20px">
      <a href="https://saunaamore.it/admin/orders/${o.orderId}"
         style="background:#2e4636;color:#eef0e8;padding:10px 22px;border-radius:999px;text-decoration:none;font-family:sans-serif;font-size:13px">
        Apri nell'admin
      </a>
    </p>
  </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: o.email,
        subject: `🛁 ${o.orderNumber} · ${o.productName} · ${euro(o.totalEstimate)}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error('Order notification failed:', res.status, await res.text());
    }
  } catch (err) {
    console.error('Order notification failed:', err);
  }
}
