import { FinanceForm } from '@/features/demo/finances/finance-form';

export const metadata = { title: 'Dodaj trošak — demo' };

export default function Page() {
  return <FinanceForm kind="expense" />;
}
