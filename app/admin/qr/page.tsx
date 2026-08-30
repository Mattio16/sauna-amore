import { prisma } from '@/lib/db';
import { formatDate } from '@/lib/format';
import { QR_CAMPAIGNS } from '@/lib/qr';

export const dynamic = 'force-dynamic';

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export default async function QrScansPage() {
  // Headline numbers exclude bots; the bot tally is shown separately so a spike
  // in link-preview traffic is visible rather than silently missing.
  const real = { isBot: false };

  const [total, last7, last24h, bots, byCampaign, byCountry, recent] = await Promise.all([
    prisma.qrScan.count({ where: real }),
    prisma.qrScan.count({ where: { ...real, createdAt: { gte: daysAgo(7) } } }),
    prisma.qrScan.count({ where: { ...real, createdAt: { gte: daysAgo(1) } } }),
    prisma.qrScan.count({ where: { isBot: true } }),
    prisma.qrScan.groupBy({ by: ['code'], where: real, _count: true }),
    prisma.qrScan.groupBy({ by: ['country'], where: real, _count: true }),
    prisma.qrScan.findMany({ where: real, orderBy: { createdAt: 'desc' }, take: 25 }),
  ]);

  const stats = [
    { label: 'Total scans', value: total },
    { label: 'Last 7 days', value: last7 },
    { label: 'Last 24 hours', value: last24h },
    { label: 'Bots / previews', value: bots },
  ];

  const campaigns = byCampaign.sort((a, b) => b._count - a._count);
  const countries = byCountry.sort((a, b) => b._count - a._count).slice(0, 8);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">QR scans</h1>
        <p className="text-sm text-stone-500 mt-1">
          Every scan of a printed QR code, recorded here permanently — no sampling, no
          expiry.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg bg-white border border-stone-200 p-4">
            <p className="text-xs uppercase tracking-wide text-stone-500">{s.label}</p>
            <p className="text-2xl font-semibold text-stone-900 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
          By campaign
        </h2>
        <div className="rounded-lg bg-white border border-stone-200 divide-y divide-stone-100">
          {campaigns.length === 0 && (
            <p className="p-4 text-sm text-stone-500">
              No scans yet. Scan a printed code and it will appear here within seconds.
            </p>
          )}
          {campaigns.map((c) => (
            <div key={c.code} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-stone-900">/{c.code}</p>
                <p className="text-xs text-stone-500">
                  {QR_CAMPAIGNS[c.code]?.label ?? 'Retired code'}
                </p>
              </div>
              <p className="text-lg font-semibold text-stone-900">{c._count}</p>
            </div>
          ))}
        </div>
      </section>

      {countries.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
            By country
          </h2>
          <div className="rounded-lg bg-white border border-stone-200 divide-y divide-stone-100">
            {countries.map((c) => (
              <div
                key={c.country ?? 'unknown'}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
              >
                <span className="text-stone-700">{c.country ?? 'Unknown'}</span>
                <span className="font-medium text-stone-900">{c._count}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
          Recent scans
        </h2>
        <div className="rounded-lg bg-white border border-stone-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-left text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th className="px-4 py-2.5 font-medium">When</th>
                <th className="px-4 py-2.5 font-medium">Code</th>
                <th className="px-4 py-2.5 font-medium">Where</th>
                <th className="px-4 py-2.5 font-medium">Device</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {recent.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-stone-500">
                    Nothing recorded yet.
                  </td>
                </tr>
              )}
              {recent.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-2.5 text-stone-700 whitespace-nowrap">
                    {formatDate(s.createdAt)}
                  </td>
                  <td className="px-4 py-2.5 text-stone-700">/{s.code}</td>
                  <td className="px-4 py-2.5 text-stone-700">
                    {[s.city, s.country].filter(Boolean).join(', ') || '—'}
                  </td>
                  <td
                    className="px-4 py-2.5 text-stone-500 max-w-md truncate"
                    title={s.userAgent ?? ''}
                  >
                    {s.userAgent ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
