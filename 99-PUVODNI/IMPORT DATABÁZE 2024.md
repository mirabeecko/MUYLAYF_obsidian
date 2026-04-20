---
tags:
  - PostgreSQL
up:
  - "[[Databáze PostgreSQL]]"
---
[[Databáze PostgreSQL]]

---

CREATE TABLE public."Clenove2024"
(
    title text,
    dite boolean,
    name text,
    surname text,
    phone numeric,
    phone_parents numeric,
    id_cus numeric,
    zletilost text,
    prihlaska_tj boolean,
    "19.12.2023" boolean,
    pm boolean,
    neplatil boolean,
    dluh boolean,
    "obcan_CR" text,
    oddil text
)
    INHERITS (public."Clenove2024");

ALTER TABLE IF EXISTS public."Clenove2024"
    OWNER to postgres;

#claude_tech
