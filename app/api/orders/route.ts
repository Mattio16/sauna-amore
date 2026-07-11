import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * Public endpoint: customers submit a quote request from a product page.
 * Price is computed SERVER-SIDE from the DB — client-sent prices are ignored.
 */
export async function POST(req: NextRequest) {
  let body: {
    productId?: string;
    optionIds?: string[];
    quantity?: number;
    customerName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    message?: string;
    locale?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { productId, customerName, email } = body;
  if (!productId || !customerName?.trim() || !email?.includes('@')) {
    return NextResponse.json({ error: 'Missing product, name or email' }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { options: { include: { option: { include: { group: true } } } } },
  });
  if (!product || !product.isPublished) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Validate selected options belong to this product; compute price server-side.
  const optionIds = Array.isArray(body.optionIds) ? body.optionIds : [];
  const selected = product.options.filter((po) => optionIds.includes(po.optionId));
  const optionsSnapshot = selected.map((po) => ({
    group: po.option.group.nameIt,
    option: po.option.nameIt,
    priceDelta: po.priceDelta,
  }));
  const unitPrice = product.basePrice + selected.reduce((sum, po) => sum + po.priceDelta, 0);
  const quantity = Math.min(Math.max(Number(body.quantity) || 1, 1), 20);

  // Order number: SA-<year>-<sequence>
  const year = new Date().getFullYear();
  const countThisYear = await prisma.order.count({
    where: { orderNumber: { startsWith: `SA-${year}-` } },
  });
  const orderNumber = `SA-${year}-${String(countThisYear + 1).padStart(4, '0')}`;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerName: customerName.trim().slice(0, 200),
      email: email.trim().slice(0, 200),
      phone: body.phone?.trim().slice(0, 50) || null,
      address: body.address?.trim().slice(0, 300) || null,
      city: body.city?.trim().slice(0, 100) || null,
      postalCode: body.postalCode?.trim().slice(0, 20) || null,
      message: body.message?.trim().slice(0, 3000) || null,
      locale: body.locale === 'en' ? 'en' : 'it',
      totalEstimate: unitPrice * quantity,
      items: {
        create: [
          {
            productId: product.id,
            productName: product.nameIt,
            optionsSnapshot,
            unitPrice,
            quantity,
          },
        ],
      },
    },
  });

  return NextResponse.json({ ok: true, orderNumber: order.orderNumber });
}
