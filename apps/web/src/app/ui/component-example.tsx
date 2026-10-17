'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { TextField } from '@/components/ui/text-field';

export function ComponentExample() {
  const [choice, setChoice] = useState('javor');
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
      <div className="space-y-2"><label htmlFor="primjer-select" className="font-semibold">Izbor zajednice · primjer</label><Select id="primjer-select" value={choice} onValueChange={setChoice} options={[{ value: 'javor', label: 'ZEV Javor' }, { value: 'lipa', label: 'ZEV Lipa — primjer dužeg naziva zajednice' }]} /></div>
      <Select aria-label="Nedostupan izbor · primjer" value="javor" onValueChange={setChoice} disabled options={[{ value: 'javor', label: 'Nedostupan izbor' }]} />
      <div className="flex flex-wrap gap-3">
        <Button type="submit">Potvrdi primjer</Button>
        <Button variant="secondary" onClick={reset}>Poništi unos</Button>
      </div>
      <p role="status" className="text-sm leading-relaxed text-success">{message}</p>
    </form>
  );
}
