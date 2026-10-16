import type { ComponentProps } from 'react';

type TextFieldProps = Omit<ComponentProps<'input'>, 'id'> & { id: string; label: string; hint?: string; error?: string };

export function TextField({ id, label, hint, error, className = '', ...props }: TextFieldProps) {
  const description = [props['aria-describedby'], hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ');
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-semibold">{label}</label>
      <input {...props} id={id} aria-invalid={error ? true : props['aria-invalid']} aria-describedby={description || undefined}
        className={`min-h-11 w-full rounded-lg border bg-surface px-3 py-2 text-ink ${error ? 'border-danger' : 'border-control'} ${className}`} />
      {hint && <p id={`${id}-hint`} className="text-sm text-muted">{hint}</p>}
      {error && <p id={`${id}-error`} className="text-sm text-danger">{error}</p>}
    </div>
  );
}
