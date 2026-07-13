import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { put } from '@vercel/blob';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const productId = req.nextUrl.searchParams.get('productId');
  const optionId = req.nextUrl.searchParams.get('optionId');
  const filename = req.nextUrl.searchParams.get('filename') ?? 'image.jpg';
  if ((!productId && !optionId) || !req.body) {
    return NextResponse.json({ error: 'Missing productId/optionId or file' }, { status: 400 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Image storage not configured (BLOB_READ_WRITE_TOKEN missing)' },
      { status: 500 },
    );
  }

  // Option thumbnail: store the URL directly on the option (no gallery row).
  if (optionId) {
    const blob = await put(`options/${optionId}/${Date.now()}-${filename}`, req.body, {
      access: 'public',
    });
    await prisma.option.update({ where: { id: optionId }, data: { imageUrl: blob.url } as never });
    return NextResponse.json({ url: blob.url });
  }

  // Product gallery image.
  const blob = await put(`products/${productId}/${Date.now()}-${filename}`, req.body, {
    access: 'public',
  });
  const count = await prisma.productImage.count({ where: { productId: productId! } });
  const image = await prisma.productImage.create({
    data: { productId: productId!, url: blob.url, sortOrder: count },
  });

  return NextResponse.json({ url: blob.url, id: image.id });
}

/** Clears an option's thumbnail (the blob itself is left in storage). */
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const optionId = req.nextUrl.searchParams.get('optionId');
  if (!optionId) return NextResponse.json({ error: 'Missing optionId' }, { status: 400 });

  await prisma.option.update({ where: { id: optionId }, data: { imageUrl: null } as never });
  return NextResponse.json({ ok: true });
}
