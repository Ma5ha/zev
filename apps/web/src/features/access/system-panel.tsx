import { AccessForm } from './form';
import { AccessField } from './field';
import { Basis } from './basis';
import { Choice } from './choice';
import { systemAdministration } from './admin-actions';
export function SystemPanel() {
 return <section className="demo-section space-y-6 p-6"><h2 className="text-xl font-semibold">Administracija sistema</h2>
 <details><summary className="cursor-pointer py-3 font-semibold">Novi ZEV i prvi administrator</summary><AccessForm action={systemAdministration} submit="Kreiraj ZEV"><input type="hidden" name="operation" value="tenant"/><AccessField id="tenant-name" name="name" label="Naziv ZEV-a" required maxLength={160}/><AccessField id="slug" name="slug" label="Jedinstvena oznaka" pattern="[a-z0-9]+(-[a-z0-9]+)*" required/><AccessField id="first-admin" name="user" label="Potvrđeni ID prvog administratora" required pattern="[0-9a-fA-F-]{36}"/><Basis/></AccessForm></details>
 <details><summary className="cursor-pointer py-3 font-semibold">Globalna administratorska rola</summary><p className="mb-4">Dodjela daje puni pristup svim ZEV-ovima. Prije opoziva posljednjeg administratora postavite zamjenu.</p><AccessForm action={systemAdministration} submit="Potvrdi globalnu rolu"><input type="hidden" name="operation" value="system-role"/><AccessField id="global-user" name="user" label="Potvrđeni korisnički ID" required pattern="[0-9a-fA-F-]{36}"/><Choice name="enabled" id="global-enabled" label="Radnja" options={[{value:'true',label:'Dodijeli globalni pristup'},{value:'false',label:'Opozovi globalni pristup'}]}/><Basis/></AccessForm></details>
 </section>;
}
