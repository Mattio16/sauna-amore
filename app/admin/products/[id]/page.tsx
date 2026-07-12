import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import ProductForm, { DeleteProductButton } from '@/components/admin/ProductForm';
import ImageUploader from '@/components/admin/ImageUploader';
import {
  addImageUrl,
  deleteImage,
  moveImage,
  setProductOption,
  createOptionForProduct,
  deleteOptionFromProduct,
} from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      options: true,
    },
  });
  if (!product) notFound();

  const groups = await prisma.optionGroup.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { options: { orderBy: { sortOrder: 'asc' } } },
  });
  const byOptionId = new Map(product.options.map((po) => [po.optionId, po]));

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/products" className="text-sm text-stone-500 hover:text-stone-900">
            ← Products
          </Link>
          <h1 className="text-2xl font-semibold text-stone-900">{product.nameIt}</h1>
        </div>
        <DeleteProductButton id={product.id} />
      </div>

      {searchParams.saved && (
        <p className="rounded bg-green-50 border border-green-200 text-green-800 px-4 py-2 text-sm">
          Saved.
        </p>
      )}

      <ProductForm product={product} />

      {/* ---- Images ---- */}
      <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="font-medium text-stone-900">Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.images.map((img, i) => (
            <div key={img.id} className="space-y-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt ?? ''} className="h-28 w-full rounded object-cover bg-stone-100" />
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>{i === 0 ? 'Main' : `#${i + 1}`}</span>
                <span className="flex gap-1">
                  <form action={moveImage}>
                    <input type="hidden" name="id" value={img.id} />
                    <input type="hidden" name="dir" value="up" />
                    <button className="px-1 hover:text-stone-900" title="Move earlier">←</button>
                  </form>
                  <form action={moveImage}>
                    <input type="hidden" name="id" value={img.id} />
                    <input type="hidden" name="dir" value="down" />
                    <button className="px-1 hover:text-stone-900" title="Move later">→</button>
                  </form>
                  <form action={deleteImage}>
                    <input type="hidden" name="id" value={img.id} />
                    <button className="px-1 text-red-500 hover:text-red-700" title="Remove">✕</button>
                  </form>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-stone-100">
          <ImageUploader productId={product.id} />
          <form action={addImageUrl} className="flex items-center gap-2 flex-1 min-w-64">
            <input type="hidden" name="productId" value={product.id} />
            <input
              name="url"
              placeholder="…or paste an image URL"
              className="flex-1 rounded border border-stone-300 px-3 py-2 text-sm"
            />
            <button className="rounded border border-stone-300 px-4 py-2 text-sm hover:bg-stone-50">Add</button>
          </form>
        </div>
      </section>

      {/* ---- Options ---- */}
      <section className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div>
          <h2 className="font-medium text-stone-900">Options</h2>
          <p className="text-sm text-stone-500">
            Tick the options this product offers and set the price difference. One default per group.
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.id}>
            <h3 className="text-sm font-medium text-stone-700 mb-2">
              {group.nameEn} <span className="text-stone-400">({group.code})</span>
            </h3>
            <div className="space-y-1">
              {group.options.map((opt) => {
                const po = byOptionId.get(opt.id);
                return (
                  <div key={opt.id} className="flex items-center gap-2">
                    <form
                      action={setProductOption}
                      className="flex-1 grid grid-cols-[1.2rem_1fr_6.5rem_4.5rem_3.5rem] items-center gap-2 rounded px-2 py-1.5 hover:bg-stone-50 text-sm"
                    >
                      <input type="hidden" name="productId" value={product.id} />
                      <input type="hidden" name="optionId" value={opt.id} />
                      <input type="checkbox" name="enabled" defaultChecked={!!po} />
                      <input
                        name="name"
                        defaultValue={opt.nameEn}
                        title="Renames this option everywhere it is used"
                        className={`rounded border border-stone-200 px-2 py-1 ${po ? 'text-stone-900' : 'text-stone-400'}`}
                      />
                      <input
                        name="priceDelta"
                        type="number"
                        defaultValue={po?.priceDelta ?? 0}
                        className="rounded border border-stone-300 px-2 py-1 text-right"
                      />
                      <label className="flex items-center gap-1 text-xs text-stone-500">
                        <input type="checkbox" name="isDefault" defaultChecked={po?.isDefault ?? false} />
                        default
                      </label>
                      <button className="rounded border border-stone-300 px-2 py-1 text-xs hover:bg-white">
                        Save
                      </button>
                    </form>
                    <form action={deleteOptionFromProduct}>
                      <input type="hidden" name="productId" value={product.id} />
                      <input type="hidden" name="optionId" value={opt.id} />
                      <button
                        className="text-red-400 hover:text-red-600 px-1 text-sm"
                        title="Delete this option everywhere (removes it from all products that offer it)"
                      >
                        ✕
                      </button>
                    </form>
                  </div>
                );
              })}
              <form
                action={createOptionForProduct}
                className="grid grid-cols-[1fr_6.5rem_auto] items-center gap-2 rounded border border-dashed border-stone-300 px-2 py-2 mt-1 text-sm"
              >
                <input type="hidden" name="productId" value={product.id} />
                <input type="hidden" name="groupId" value={group.id} />
                <input name="name" placeholder="New option name" required className="rounded border border-stone-200 px-2 py-1" />
                <input name="priceDelta" type="number" placeholder="+ €" className="rounded border border-stone-300 px-2 py-1 text-right" />
                <button className="rounded bg-stone-900 text-white px-3 py-1 text-xs hover:bg-stone-700">
                  + Add option
                </button>
              </form>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
