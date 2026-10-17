'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';
import { Notice } from '@/components/ui/notice';
import { useDemo } from './demo-provider';
import { DemoSection, formatDemoDate } from './demo-sections';
import { issueStatuses, pollClosed, communityValidation, type CommunityDraft } from './community';

const control = 'block min-h-11 w-full rounded-lg border border-control bg-surface p-3 text-ink';
export function CommunityForm({ kind }: { kind: CommunityDraft['kind'] }) {
  const { communityDraft: draft, dispatch, view } = useDemo();
  const [error, setError] = useState('');
  const errorSummary = useRef<HTMLParagraphElement>(null);
  const [invalidField, setInvalidField] = useState('');
  const [reading, setReading] = useState(false);
  const photoRequest = useRef(0);
  const contextKey = `${view.tenantId}:${view.profileId}:${draft?.kind ?? ''}`;
  useEffect(() => { photoRequest.current += 1; return () => { photoRequest.current += 1; }; }, [contextKey]);
  const allowed = kind === 'issue' || view.permissions.canPublish;
  if (!allowed) return null;
  const label = kind === 'issue' ? 'Prijavi problem' : kind === 'poll' ? 'Nova anketa' : 'Objavi obavještenje';
  if (draft && draft.kind !== kind) return <p className="text-sm text-muted">Prvo sačuvajte ili odbacite otvoreni obrazac.</p>;
  if (!draft) return <Button onClick={() => { setError(''); dispatch({ type: 'community-draft', draft: { kind, title: '', body: '', options: '', closesAt: '' } }); }}>{label}</Button>;
  function update(value: Partial<CommunityDraft>) { if (draft) dispatch({ type: 'community-draft', draft: { ...draft, ...value } }); }
  return <form aria-describedby={error ? `${kind}-error` : undefined} className="max-w-2xl space-y-4" onSubmit={event => { event.preventDefault(); const now = new Date().toISOString(); const problem = communityValidation(draft, now); setError(problem?.message ?? ''); setInvalidField(problem?.field ?? ''); if (problem) requestAnimationFrame(() => errorSummary.current?.focus()); if (!problem && !reading) dispatch({ type: 'community-save', now }); }}>
    <h3 className="text-lg font-semibold">{label}</h3>
    {kind !== 'issue' && <TextField id={`${kind}-title`} label={kind === 'poll' ? 'Pitanje (obavezno)' : 'Naslov (obavezno)'} value={draft.title} maxLength={200} aria-invalid={!!error && invalidField === 'title'} aria-describedby={error && invalidField === 'title' ? `${kind}-error` : undefined} onChange={event => update({ title: event.target.value })} />}
    {kind !== 'poll' && <label className="block space-y-2 font-semibold">{kind === 'issue' ? 'Opis problema (obavezno)' : 'Sadržaj (obavezno)'}<textarea aria-invalid={!!error && invalidField === 'body'} aria-describedby={error && invalidField === 'body' ? `${kind}-error` : undefined} className={control} rows={4} maxLength={4000} value={draft.body} onChange={event => update({ body: event.target.value })} /></label>}
    {kind === 'poll' && <><label className="block space-y-2 font-semibold">Opcije — svaka u novi red<textarea aria-invalid={!!error && invalidField === 'options'} aria-describedby={error && invalidField === 'options' ? `${kind}-error` : undefined} className={control} rows={4} maxLength={2000} value={draft.options} onChange={event => update({ options: event.target.value })} /></label><TextField id="poll-deadline" label="Rok (lokalno vrijeme uređaja)" type="datetime-local" aria-invalid={!!error && invalidField === 'closesAt'} aria-describedby={error && invalidField === 'closesAt' ? `${kind}-error` : undefined} value={draft.closesAt} onChange={event => update({ closesAt: event.target.value })} /></>}
    {kind === 'issue' && <><TextField id="issue-photo" label="Fotografija (opciono)" type="file" accept="image/jpeg,image/png,image/webp" hint="JPEG, PNG ili WebP, do 5 MB. Samo lokalni pregled; nema slanja fotografije." disabled={reading} onChange={event => {
      const file = event.target.files?.[0]; event.target.value = ''; if (!file) return;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) { setError('Izaberite JPEG, PNG ili WebP fotografiju do 5 MB. Opis je sačuvan.'); return; }
      const request = ++photoRequest.current; setReading(true); setError(''); const reader = new FileReader();
      reader.onload = () => { if (request !== photoRequest.current) return; const image = new Image(); image.onload = () => { if (request !== photoRequest.current) return; dispatch({ type: 'community-photo', tenantId: view.tenantId, profileId: view.profileId, photo: { name: file.name, data: String(reader.result) } }); setReading(false); }; image.onerror = () => { setError('Fotografija nije čitljiva. Izaberite drugi fajl.'); setReading(false); }; image.src = String(reader.result); };
      reader.onerror = () => { setError('Fotografija nije pročitana. Pokušajte ponovo.'); setReading(false); }; reader.readAsDataURL(file);
    }} />{reading && <p role="status">Čitanje lokalne fotografije…</p>}{draft.photo && <div><Photo photo={draft.photo} /><Button variant="secondary" onClick={() => update({ photo: undefined })}>Ukloni fotografiju</Button></div>}</>}
    {error && <p id={`${kind}-error`} ref={errorSummary} tabIndex={-1} role="alert" className="text-danger">{error}</p>}
    <p className="text-sm text-muted">Unos ostaje samo u memoriji demoa. Osvježavanje ili reset ga briše.</p>
    <div className="flex flex-wrap gap-3"><Button disabled={reading} type="submit">{kind === 'issue' ? 'Pošalji prijavu u demo' : kind === 'poll' ? 'Otvori anketu u demou' : 'Objavi u demou'}</Button><Button disabled={reading} variant="secondary" onClick={() => { setError(''); dispatch({ type: 'community-draft', draft: null }); }}>Odustani</Button></div>
  </form>;
}
function Photo({ photo }: { photo: { name: string; data: string } }) {
  // Data URLs are decoded locally; no image service or upload is involved.
  // eslint-disable-next-line @next/next/no-img-element
  return <figure className="my-3 space-y-2"><img className="max-h-64 max-w-full rounded-lg object-contain" src={photo.data} alt="Lokalna fotografija prijavljenog problema" /><figcaption className="break-all text-sm text-muted">{photo.name} · lokalni primjer</figcaption></figure>;
}
export function CommunityIssues() {
  const { view, dispatch } = useDemo();
  return <DemoSection id="prijave" title={view.permissions.canManageIssues ? 'Prijave aktivnog ZEV-a' : 'Moje prijave'}><Notice>Za hitnu opasnost odmah kontaktirajte nadležnu službu ili odgovornu osobu. Demo ne šalje prijavu službi.</Notice><div className="my-4"><CommunityForm key={`${view.tenantId}:${view.profileId}`} kind="issue" /></div>{view.issues.length ? <ul className="divide-y divide-line">{view.issues.map(issue => <li className="space-y-3 py-4" key={issue.id}><details><summary className="min-h-11 cursor-pointer whitespace-pre-wrap break-words font-semibold">{issue.description}</summary>{issue.date && <p>{formatDemoDate(issue.date)}</p>}{issue.photo && <Photo photo={issue.photo} />}</details><p>Status: {issue.status}</p>{view.permissions.canManageIssues && <label className="block">Promijeni status<select className={control} value={issue.status} onChange={event => dispatch({ type: 'issue-status', id: issue.id, status: event.target.value as typeof issueStatuses[number] })}>{issueStatuses.map(status => <option key={status}>{status}</option>)}</select></label>}</li>)}</ul> : <p>Nema prijava dostupnih ovom profilu u aktivnom ZEV-u.</p>}</DemoSection>;
}
export function CommunityPolls() {
  const { view } = useDemo();
  return <DemoSection id="ankete" title="Informativne ankete"><Notice>Demo pretpostavka: jedan odgovor po članstvu, izmjenjiv do zatvaranja. Zbirni rezultati su vidljivi nakon zatvaranja. Anketa nije formalno odlučivanje skupštine.</Notice><div className="my-4"><CommunityForm key={`${view.tenantId}:${view.profileId}`} kind="poll" /></div>{view.polls.length ? view.polls.map(poll => <Poll key={`${view.tenantId}:${view.profileId}:${poll.id}`} poll={poll} />) : <p>Još nema informativnih anketa u ovoj zgradi.</p>}</DemoSection>;
}
function Poll({ poll }: { poll: ReturnType<typeof useDemo>['view']['polls'][number] }) {
  const { view, dispatch } = useDemo();
  const [option, setOption] = useState(poll.ownAnswer ?? -1);
  const [now, setNow] = useState(() => new Date().toISOString());
  // Synchronize the deadline with the external clock while the screen is open.
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date().toISOString()), 1000); return () => window.clearInterval(timer); }, []);
  const closed = pollClosed(poll, now);
  return <article className="space-y-3 border-t border-line py-5"><h3 className="text-lg font-semibold break-words">{poll.question}</h3><p className="text-sm text-muted">Informativna anketa · {closed ? 'Zatvorena' : 'Otvorena'} · Rok: {new Intl.DateTimeFormat('sr-Latn-BA', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Belgrade' }).format(new Date(poll.closesAt))} (Europe/Belgrade)</p>{closed ? <div><p>Ukupno odgovora: {poll.counts.reduce((sum, count) => sum + count, 0)}</p><ul>{poll.options.map((label, index) => <li className="break-words" key={label}>{label}: {poll.counts[index]}</li>)}</ul></div> : <form className="space-y-3" onSubmit={event => { event.preventDefault(); const timestamp = new Date().toISOString(); setNow(timestamp); dispatch({ type: 'poll-answer', id: poll.id, option, now: timestamp }); }}><fieldset className="space-y-2"><legend className="font-semibold">Izaberite odgovor</legend>{poll.options.map((label, index) => <label key={label} className="flex min-h-11 items-center gap-3 break-words"><input type="radio" name={poll.id} checked={option === index} onChange={() => setOption(index)} />{label}</label>)}</fieldset><Button type="submit" disabled={option < 0}>{poll.ownAnswer === undefined ? 'Pošalji odgovor u demo' : 'Izmijeni odgovor u demou'}</Button>{view.permissions.canManagePolls && <Button className="mt-3 sm:ml-2 sm:mt-0" variant="secondary" onClick={() => dispatch({ type: 'poll-close', id: poll.id })}>Zatvori anketu</Button>}</form>}{poll.ownAnswer !== undefined && <p className="text-sm text-muted">Vaš sačuvani odgovor: {poll.options[poll.ownAnswer]}</p>}</article>;
}
