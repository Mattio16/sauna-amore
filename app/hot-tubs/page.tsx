import CategoryView from '@/components/site/CategoryView';
import { getCategoryProducts } from '@/lib/catalog';

export const revalidate = 300;
export const metadata = { title: 'Vasche Idromassaggio | Sauna Amore' };

export default async function HotTubsPage() {
  const products = await getCategoryProducts('HOT_TUB');
  return (
    <CategoryView
      headerImage="/images/site/cat-vasche.jpg"
      titleKey="tubsTitle"
      subKey="tubsSub"
      products={products}
      showFilters
    />
  );
}
