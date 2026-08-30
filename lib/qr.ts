import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Registry of live QR campaign codes. Adding a run = one entry here plus a
// two-line app/<code>/route.ts. Keep `label` human-readable; the admin shows it.
export const QR_CAMPAIGNS: Record<string, { label: string; destination: string }> = {
  ca1: { label: 'Campaign 1', destination: '/' },
};

// Link previewers (WhatsApp, iMessage, Slack) and crawlers fetch URLs the moment
// someone shares them, which would otherwise show up as phantom scans. We still
// store those rows — dropping data is irreversible — but flag them so the
// headline numbers stay honest.
const BOT_PATTERN =
  /bot|crawler|spider|crawling|facebookexternalhit|whatsapp|telegram|slackbot|discord|twitterbot|linkedinbot|preview|curl|wget|headless|lighthouse|vercel-screenshot/i;

export function isBotAgent(userAgent: string | null): boolean {
  return userAgent ? BOT_PATTERN.test(userAgent) : true; // no UA at all == not a real phone
}

/**
 * Records the scan, then redirects. The write is best-effort on purpose: a
 * printed QR code must keep working even if the database is unreachable, so a
 * logging failure is swallowed rather than surfaced to whoever is standing
 * there with their phone out.
 */
export async function handleQrScan(request: Request, code: string) {
  const campaign = QR_CAMPAIGNS[code];
  const destination = campaign?.destination ?? '/';
  const userAgent = request.headers.get('user-agent');

  try {
    await prisma.qrScan.create({
      data: {
        code,
        userAgent,
        referer: request.headers.get('referer'),
        country: request.headers.get('x-vercel-ip-country'),
        city: request.headers.get('x-vercel-ip-city'),
        isBot: isBotAgent(userAgent),
      },
    });
  } catch (error) {
    console.error(`[qr] failed to log scan for "${code}"`, error);
  }

  // UTM params are kept even though the Hobby plan hides that report — they cost
  // nothing and mean the data is already there if Web Analytics Plus is ever on.
  const target = new URL(destination, request.url);
  target.searchParams.set('utm_source', 'qr');
  target.searchParams.set('utm_medium', 'print');
  target.searchParams.set('utm_campaign', code);

  // 307, not 308: a permanent redirect would be cached on the scanner's phone
  // forever, making a printed code impossible to repoint later.
  return NextResponse.redirect(target, 307);
}
