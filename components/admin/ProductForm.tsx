import { Product } from '@prisma/client';
import { saveProduct, deleteProduct } from '@/lib/admin-actions';

const input =
  'w-full rounded border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400';
const label = 'block text-xs font-medium text-stone-500 mb-1';

export default function ProductForm({ product }: { product?: Product }) {
  return (
    <form action={saveProduct} className="bg-white rounded-xl shadow-sm p-6 space-y-5">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className={label}>SKU</label>
          <input name="sku" defaultValue={product?.sku} required className={input} />
        </div>
        <div>
          <label className={label}>Category</label>
          <select name="category" defaultValue={product?.category ?? 'SAUNA'} className={input}>
            <option value="SAUNA">Sauna</option>
            <option value="HOT_TUB">Hot Tub</option>
            <option value="ICE_BATH">Ice Bath</option>
            <option value="ACCESSORY">Accessory</option>
          </select>
        </div>
        <div>
          <label className={label}>Base price (€)</label>
          <input name="basePrice" type="number" defaultValue={product?.basePrice} required className={input} />
        </div>
        <div>
          <label className={label}>Sort order</label>
          <input name="sortOrder" type="number" defaultValue={product?.sortOrder ?? 0} className={input} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={label}>Name (Italian)</label>
          <input name="nameIt" defaultValue={product?.nameIt} required className={input} />
        </div>
        <div>
          <label className={label}>Name (English)</label>
          <input name="nameEn" defaultValue={product?.nameEn} required className={input} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className={label}>Capacity (persons)</label>
          <input name="capacity" type="number" defaultValue={product?.capacity ?? ''} className={input} />
        </div>
        <div>
          <label className={label}>Dimensions</label>
          <input name="dimensions" defaultValue={product?.dimensions ?? ''} placeholder="300×200×210cm" className={input} />
        </div>
        <div>
          <label className={label}>Subcategory / size filter</label>
          <input name="subcategory" defaultValue={product?.subcategory ?? ''} placeholder="2m, 3m, wood, fiberglass…" className={input} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={label}>Description (Italian)</label>
          <textarea name="descriptionIt" rows={4} defaultValue={product?.descriptionIt ?? ''} className={input} />
        </div>
        <div>
          <label className={label}>Description (English)</label>
          <textarea name="descriptionEn" rows={4} defaultValue={product?.descriptionEn ?? ''} className={input} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={label}>Specs (Italian)</label>
          <textarea name="specsIt" rows={2} defaultValue={product?.specsIt ?? ''} className={input} />
        </div>
        <div>
          <label className={label}>Specs (English)</label>
          <textarea name="specsEn" rows={2} defaultValue={product?.specsEn ?? ''} className={input} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input type="checkbox" name="isPublished" defaultChecked={product?.isPublished ?? true} />
          Published (visible on the site)
        </label>
        <button type="submit" className="rounded bg-stone-900 text-white px-6 py-2 text-sm font-medium hover:bg-stone-700">
          Save product
        </button>
      </div>
    </form>
  );
}

export function DeleteProductButton({ id }: { id: string }) {
  return (
    <form action={deleteProduct}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-sm text-red-500 hover:text-red-700">
        Delete product
      </button>
    </form>
  );
}
