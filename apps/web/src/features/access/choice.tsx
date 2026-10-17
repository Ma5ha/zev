'use client';
import { useState } from 'react';
import { Select } from '@/components/ui/select';
export function Choice({ name, label, options, initial, id = name }: { name: string; label: string; options: {value:string;label:string}[]; initial?: string; id?: string }) {
 const [value,setValue] = useState(initial ?? options[0]?.value ?? '');
 return <div className="space-y-2"><label htmlFor={id} className="block font-semibold">{label}</label><Select id={id} name={name} value={value} onValueChange={setValue} options={options} required/></div>;
}
