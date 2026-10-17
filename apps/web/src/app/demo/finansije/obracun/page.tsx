import { FinanceForm } from '@/features/demo/finances/finance-form';

export const metadata = { title: 'Mjesečni obračun — demo' };

export default function Page() {
  return <FinanceForm kind="assessment" />;
}
