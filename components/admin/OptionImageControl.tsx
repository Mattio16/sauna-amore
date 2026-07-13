'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Small option-image control: thumbnail + upload (to Vercel Blob) + remove.
 * Changes apply immediately (no need to press the row's Save button).
 */
export default function OptionImageControl({
  optionId,
  imageUrl,
}: {
  optionId: string;
  imageUrl: string | null;
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function upload() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(
        `/api/upload?optionId=${optionId}&filename=${encodeURIComponent(file.name)}`,
        { method: 'POST', body: file },
      );
      if (!res.ok) throw new Error((await res.json()).error ?? 'Upload failed');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function remove() {
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/upload?optionId=${optionId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Remove failed');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Remove failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="col-span-2 flex items-center gap-2 mt-0.5">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" className="h-9 w-9 rounded border border-stone-200 object-cover bg-white" />
      ) : (
        <span className="h-9 w-9 rounded border border-dashed border-stone-300 flex items-center justify-center text-stone-300 text-xs">
          —
        </span>
      )}
      <label
        className="rounded border border-stone-300 px-2 py-1 text-xs cursor-pointer hover:bg-stone-50 text-stone-600"
        title="Upload a small photo for this option"
      >
        {busy ? '…' : imageUrl ? 'Replace' : 'Upload'}
        <input ref={fileRef} type="file" accept="image/*" onChange={upload} disabled={busy} className="hidden" />
      </label>
      {imageUrl && (
        <button
          type="button"
          onClick={remove}
          disabled={busy}
          className="text-red-400 hover:text-red-600 text-sm px-1"
          title="Remove this option's image"
        >
          ✕
        </button>
      )}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
