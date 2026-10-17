import { FinanceCard } from '@/features/demo/finances/finance-details';

export const metadata = { title: 'Finansijski detalj — demo' };

export default async function Page({ params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = await params;
  return <FinanceCard unitId={unitId} />;
}
