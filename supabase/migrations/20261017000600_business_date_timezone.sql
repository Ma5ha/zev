-- Ownership dates refer to calendar days in the building's pilot time zone.
-- SET configuration prevents a caller's session timezone from moving the boundary.
alter function private.can_read_card(uuid,uuid,date) set timezone='Europe/Belgrade';
alter function private.card_grant_visible(uuid) set timezone='Europe/Belgrade';
alter function private.delegation_source_active(uuid) set timezone='Europe/Belgrade';
alter function public.end_ownership(uuid,date,text) set timezone='Europe/Belgrade';
alter function public.delegate_card(uuid,uuid,date,date,timestamptz,text) set timezone='Europe/Belgrade';
