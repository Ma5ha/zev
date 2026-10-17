import { FinanceEntryDetail } from '@/features/demo/finances/finance-details';

export const metadata = { title: 'Finansijski detalj — demo' };

export default async function Page({ params }: { params: Promise<{ entryId: string }> }) {
  const { entryId } = await params;
  return <FinanceEntryDetail entryId={entryId} />;
}
