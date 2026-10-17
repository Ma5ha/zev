import { WorkDetail } from '@/features/demo/work-detail';

export const metadata = { title: 'Detalj rada — demo' };

export default async function Page({ params }: { params: Promise<{ workId: string }> }) {
  const { workId } = await params;
  return <WorkDetail workId={workId} />;
}
