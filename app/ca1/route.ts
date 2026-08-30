import { handleQrScan } from '@/lib/qr';

// Prisma needs the Node runtime; force-dynamic keeps every scan a real request
// rather than a cached response (a cached redirect would log nothing).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  return handleQrScan(request, 'ca1');
}
