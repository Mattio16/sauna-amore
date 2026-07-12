import { Product } from '@prisma/client';
import { saveProduct, deleteProduct } from '@/lib/admin-actions';

const input =
  'w-full rounded border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400';
const label = 'block text-xs font-medium text-stone-500 mb-1';

type SupplierItem = { label: string; cost: number };

function getSupplierItems(product?: Product): SupplierItem[] {
  const raw = (product as (Product & { supplierItems?: unknown }) | undefined)?.supplierItems;
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (x): x is SupplierItem => !!x && typeof x === 'object' && 'label' in x && 'cost' in x,
  );
}

export default function ProductForm({ product }: { product?: Product }) {
  const supplierItems = getSupplierItems(product);
  const supplierTotal = supplierItems.reduce((s, i) => s + (Number(i.cost) || 0), 0);
  const marginPct =
    product && supplierTotal > 0
      ? Math.round(((product.basePrice / 1.22 - supplierTotal) / (product.basePrice / 1.22)) * 100)
      : null;
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

      <div>
        <label className={label}>Name</label>
        <input name="name" defaultValue={product?.nameEn} required className={input} />
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

      <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
        <div className="flex items-center justify-between mb-2">
          <label className={label + ' mb-0'}>Supplier list price — one item per line: Item: cost</label>
          <span className="text-sm text-stone-700">
            Total <strong>€{supplierTotal.toLocaleString('it-IT')}</strong>
            {marginPct !== null && (
              <span className={`ml-3 text-xs ${marginPct < 15 ? 'text-red-600' : 'text-green-700'}`}>
                margin ~{marginPct}% (ex-VAT)
              </span>
            )}
          </span>
        </div>
        <textarea
          name="supplierItems"
          rows={Math.max(2, supplierItems.length + 1)}
          defaultValue={supplierItems.map((i) => `${i.label}: ${i.cost}`).join('\n')}
          placeholder={'Sauna body spruce flat-pack: 1470\nHarvia M80 8kW electric: 270'}
          className={input + ' font-mono text-xs'}
        />
      </div>

      <div>
        <label className={label}>Video URL (optional — shown under the gallery, e.g. /videos/products/tp8.mp4)</label>
        <input name="videoUrl" defaultValue={(product as unknown as { videoUrl?: string | null } | undefined)?.videoUrl ?? ''} className={input} />
      </div>

      <div>
        <label className={label}>Description</label>
        <textarea name="description" rows={4} defaultValue={product?.descriptionEn ?? ''} className={input} />
      </div>

      <div>
        <label className={label}>Specs — format: Label: value | Label: value (rendered as a table)</label>
        <textarea name="specs" rows={3} defaultValue={product?.specsEn ?? ''} className={input} />
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
