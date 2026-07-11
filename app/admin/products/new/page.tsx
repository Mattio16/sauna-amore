import Link from 'next/link';
import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <Link href="/admin/products" className="text-sm text-stone-500 hover:text-stone-900">
          ← Products
        </Link>
        <h1 className="text-2xl font-semibold text-stone-900">New product</h1>
        <p className="text-sm text-stone-500">Save it first — then you can add images and options.</p>
      </div>
      <ProductForm />
    </div>
  );
}
