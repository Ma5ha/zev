'use client';

import { useEffect, useState } from 'react';

export function AttachmentPreview({ file }: { file: File }) {
  const [url, setUrl] = useState('');
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    setFailed(false);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  return <div className="space-y-3 text-sm">
    <p className="break-all text-muted">Lokalni prilog: {file.name} · nije poslat na server.</p>
    {url && <a href={url} download={file.name} className="inline-flex min-h-11 items-center font-semibold text-accent underline">Preuzmi lokalni prilog</a>}
    {url && file.type.startsWith('image/') && !failed && (
      // The in-memory blob is neither a public URL nor a Next.js image source.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt={`Pregled lokalnog priloga ${file.name}`} className="max-h-64 max-w-full rounded-lg object-contain" onError={() => setFailed(true)} />
    )}
    {failed && <p role="alert" className="text-danger">Pregled slike nije dostupan. U obrascu uklonite fajl i izaberite drugi; opis ostaje sačuvan.</p>}
  </div>;
}
