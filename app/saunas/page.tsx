import CategoryView from '@/components/site/CategoryView';
import { getCategoryProducts } from '@/lib/catalog';

export const revalidate = 300;
export const metadata = { title: 'Saune a Botte | Sauna Amore' };

export default async function SaunasPage() {
  const products = await getCategoryProducts('SAUNA');
  return (
    <CategoryView
      headerImage="/images/site/cat-saune.jpg"
      titleKey="saunasTitle"
      subKey="saunasSub"
      products={products}
      showFilters
    />
  );
}
