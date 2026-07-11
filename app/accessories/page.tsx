import CategoryView from '@/components/site/CategoryView';
import { getCategoryProducts } from '@/lib/catalog';

export const revalidate = 300;
export const metadata = { title: 'Accessori | Sauna Amore' };

export default async function AccessoriesPage() {
  const products = await getCategoryProducts('ACCESSORY');
  return (
    <CategoryView
      headerImage="/images/site/about.jpg"
      titleKey="accTitle"
      subKey="accSub"
      products={products}
      showFilters
    />
  );
}
