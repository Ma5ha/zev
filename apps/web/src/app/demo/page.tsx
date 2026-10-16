import { PageHeading } from '@/components/ui/page-heading';
import { DemoPreview } from '@/features/demo/demo-preview';

export default function DemoPage() {
  return <div className="space-y-8">
    <PageHeading eyebrow="Demo podaci i pristup" title="Isprobaj demo kontekst">
      Promijeni ZEV ili profil i uporedi dostupne podatke. Operater može isprobati privremenu radnu bilješku.
    </PageHeading>
    <DemoPreview />
  </div>;
}
