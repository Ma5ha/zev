'use client';
import { useState, type ComponentProps } from 'react';
import { TextField } from '@/components/ui/text-field';
// Controlled values retain a correctable draft when an action returns an error.
export function AccessField({defaultValue, ...props}:ComponentProps<typeof TextField>) {
 const [value,setValue]=useState(defaultValue??'');
 return <TextField {...props} value={value} onChange={event=>setValue(event.target.value)}/>;
}
