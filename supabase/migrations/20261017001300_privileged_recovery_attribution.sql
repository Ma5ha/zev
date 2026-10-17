-- A privileged operator recovery has no authenticated application author.
-- Direct DML remains closed; audit database_actor + operation_reasons identify the incident.
alter table public.system_admin_grants alter column granted_by drop not null;
comment on column public.system_admin_grants.granted_by is
'Auth grant author; NULL only for controlled DB-operator recovery, with incident reason and database audit actor.';
