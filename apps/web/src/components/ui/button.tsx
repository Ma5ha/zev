import Link from 'next/link';
import type { ComponentProps } from 'react';

type Variant = 'primary' | 'secondary';

function actionClass(variant: Variant, className = '') {
  return `action ${variant === 'primary' ? 'action-primary' : 'action-secondary'} ${className}`;
}

export function Button({ variant = 'primary', className, type = 'button', ...props }: ComponentProps<'button'> & { variant?: Variant }) {
  return <button type={type} className={actionClass(variant, className)} {...props} />;
}

export function LinkButton({ variant = 'primary', className, ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={actionClass(variant, className)} {...props} />;
}
