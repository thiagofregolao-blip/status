'use client';

import { useRef, useState } from 'react';
import { Upload, Link as LinkIcon, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<'url' | 'upload'>(value?.startsWith('/api/images/') ? 'upload' : 'url');

  async function handleFile(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Imagem maior que 5MB');
      return;
    }
    const fd = new FormData();
    fd.append('file', file);
    setUploading(true);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'upload_failed');
      onChange(json.url);
      toast.success('Imagem enviada');
    } catch (e) {
      toast.error('Falha no upload');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2 text-xs">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 ${
            mode === 'upload' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Upload className="w-3.5 h-3.5" /> Upload
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 ${
            mode === 'url' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" /> URL
        </button>
      </div>

      {mode === 'upload' ? (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition"
        >
          <ImageIcon className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <div className="text-sm text-slate-600">
            {uploading ? 'Enviando…' : 'Clique ou arraste a imagem aqui'}
          </div>
          <div className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP, SVG — até 5MB</div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>
      ) : (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://…"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
        />
      )}

      {value && (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="preview"
            className="h-32 w-auto rounded-lg border border-slate-200 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 bg-white rounded-full border border-slate-300 p-1 shadow hover:bg-red-50 hover:border-red-400"
            aria-label="Remover"
          >
            <X className="w-3.5 h-3.5 text-slate-600" />
          </button>
        </div>
      )}
    </div>
  );
}
