import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';

/**
 * Legacy route: the old site linked /configurator?product=S16E&type=sauna.
 * Redirect old product codes to the new product pages (E/T variants merged).
 */
export const dynamic = 'force-dynamic';

export default async function ConfiguratorRedirect({
  searchParams,
}: {
  searchParams: { product?: string };
}) {
  const code = searchParams.product?.toUpperCase();
  if (code) {
    const sku = /[ET]$/.test(code) ? code.slice(0, -1) : code;
    const product = await prisma.product.findFirst({ where: { sku }, select: { slug: true } });
    if (product) redirect(`/products/${product.slug}`);
  }
  redirect('/saunas');
}
