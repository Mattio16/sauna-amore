import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { put } from '@vercel/blob';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const productId = req.nextUrl.searchParams.get('productId');
  const filename = req.nextUrl.searchParams.get('filename') ?? 'image.jpg';
  if (!productId || !req.body) {
    return NextResponse.json({ error: 'Missing productId or file' }, { status: 400 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Image storage not configured (BLOB_READ_WRITE_TOKEN missing)' },
      { status: 500 },
    );
  }

  const blob = await put(`products/${productId}/${Date.now()}-${filename}`, req.body, {
    access: 'public',
  });

  const count = await prisma.productImage.count({ where: { productId } });
  const image = await prisma.productImage.create({
    data: { productId, url: blob.url, sortOrder: count },
  });

  return NextResponse.json({ url: blob.url, id: image.id });
}
