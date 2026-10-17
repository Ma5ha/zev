import { FinanceForm } from '@/features/demo/finances/finance-form';

export const metadata = { title: 'Evidentiraj uplatu — demo' };

export default function Page() {
  return <FinanceForm kind="payment" />;
}
