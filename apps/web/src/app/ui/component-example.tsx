'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';

export function ComponentExample() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!value.trim()) {
      setError('Unesi kratak opis za ovaj primjer.');
      setMessage('');
      event.currentTarget.querySelector('input')?.focus();
      return;
    }
    setError('');
    setMessage('Primjer je potvrđen lokalno. Podaci nisu poslati niti trajno sačuvani.');
  }

  function reset() {
    setValue(''); setError(''); setMessage('Primjer je vraćen na početno stanje.');
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <TextField id="primjer-opisa" label="Kratak opis" hint="Primjer: Pregled rasvjete na ulazu. Ovo nije stvarna prijava." error={error}
        required maxLength={200} value={value} onChange={(event) => { setValue(event.target.value); setError(''); setMessage(''); }} />
      <div className="flex flex-wrap gap-3">
        <Button type="submit">Potvrdi primjer</Button>
        <Button variant="secondary" onClick={reset}>Poništi unos</Button>
      </div>
      <p role="status" className="text-sm leading-relaxed text-success">{message}</p>
    </form>
  );
}
