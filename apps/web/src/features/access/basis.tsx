'use client';
import { useId } from 'react';
import { AccessField as TextField } from '@/features/access/field';
export function Basis() {
 const id = useId();
 return <TextField id={id} name="basis" label="Osnov / razlog promjene" required maxLength={1000}/>;
}
