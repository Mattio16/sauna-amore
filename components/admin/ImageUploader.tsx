'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ImageUploader({ productId }: { productId: string }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function onChange() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(
        `/api/upload?productId=${productId}&filename=${encodeURIComponent(file.name)}`,
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

  return (
    <div className="flex items-center gap-3">
      <label className="rounded border border-stone-300 px-4 py-2 text-sm cursor-pointer hover:bg-stone-50">
        {busy ? 'Uploading…' : 'Upload image'}
        <input ref={fileRef} type="file" accept="image/*" onChange={onChange} disabled={busy} className="hidden" />
      </label>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}
