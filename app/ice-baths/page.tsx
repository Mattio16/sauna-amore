import CategoryView from '@/components/site/CategoryView';
import { getCategoryProducts } from '@/lib/catalog';

export const revalidate = 300;
export const metadata = { title: 'Bagni di Ghiaccio | Sauna Amore' };

export default async function IceBathsPage() {
  const products = await getCategoryProducts('ICE_BATH');
  return (
    <CategoryView
      headerImage="/images/site/cat-ghiaccio.jpg"
      titleKey="iceTitle"
      subKey="iceSub"
      products={products}
    />
  );
}
