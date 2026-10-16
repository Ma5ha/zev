import { PageHeading } from '@/components/ui/page-heading';
import { DemoRights } from '@/features/demo/demo-rights';

export default function RightsPage() {
  return <div className="space-y-8">
    <PageHeading eyebrow="Demo pretpostavke" title="Demo prava aktivnog profila">
      Funkcija osobe u ZEV-u i dodijeljene dozvole vode se odvojeno. Operater evidencije ovdje nije naziv zakonskog organa ZEV-a.
    </PageHeading>
    <DemoRights />
  </div>;
}
