-- ===================================================
-- SUPABASE SCHEMA PRO KOMÁRKA
-- Spusťte tento skript v Supabase SQL Editoru
-- ===================================================

-- 1. POKOJE
CREATE TABLE IF NOT EXISTS pokoje (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cislo_pokoje int UNIQUE NOT NULL,
  pocet_luzek int,
  stav text CHECK (stav IN ('ciste', 'na_uklid', 'obsazene', 'potrebuje_opravu')),
  posledni_uklid timestamp,
  vybaveni jsonb,
  poznamky text,
  fotky text[],
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 2. REZERVACE
CREATE TABLE IF NOT EXISTS rezervace (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pokoj_id uuid REFERENCES pokoje(id),
  host_jmeno text,
  host_email text,
  host_telefon text,
  check_in date,
  check_out date,
  pocet_osob int,
  cena numeric,
  stav text CHECK (stav IN ('potvrzena', 'probihajici', 'dokoncena', 'zrusena')),
  zdroj text,
  poznamky text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 3. UKLIDY
CREATE TABLE IF NOT EXISTS uklidy (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pokoj_id uuid REFERENCES pokoje(id),
  datum date,
  cas_od time,
  cas_do time,
  prideleno_komu text,
  stav text CHECK (stav IN ('naplanovano', 'probihajici', 'hotovo', 'problem')),
  checklist jsonb,
  poznamky text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 4. OPRAVY A ÚDRŽBA
CREATE TABLE IF NOT EXISTS opravy_udrzba (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pokoj_id uuid REFERENCES pokoje(id),
  nazev text NOT NULL,
  popis text,
  priorita text CHECK (priorita IN ('nizka', 'stredni', 'vysoka', 'kriticka')),
  stav text CHECK (stav IN ('nahlaseno', 'v_planu', 'probihajici', 'hotovo')),
  odhadovane_naklady numeric,
  skutecne_naklady numeric,
  datum_nahlaseni date DEFAULT current_date,
  datum_dokonceni date,
  prideleno_komu text,
  fotky text[],
  poznamky text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 5. DOTACE
CREATE TABLE IF NOT EXISTS dotace (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nazev text NOT NULL,
  poskytovatel text,
  castka numeric,
  deadline date,
  stav text CHECK (stav IN ('nove', 'priprava', 'podano', 'schvaleno', 'zamitnuto')),
  url text,
  poznamky text,
  prilohy text[],
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 6. AKCE (letní program, události)
CREATE TABLE IF NOT EXISTS akce (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nazev text NOT NULL,
  datum date,
  cas_od time,
  cas_do time,
  typ text,
  pocet_ucastniku int,
  stav text CHECK (stav IN ('planovano', 'potvrzeno', 'probihajici', 'dokonceno', 'zruseno')),
  partneri jsonb,
  budget numeric,
  skutecne_naklady numeric,
  poznamky text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 7. PARTNEŘI A DODAVATELÉ
CREATE TABLE IF NOT EXISTS partneri_dodavatele (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nazev text NOT NULL,
  typ text,
  kontakt_jmeno text,
  telefon text,
  email text,
  hodnoceni int CHECK (hodnoceni >= 1 AND hodnoceni <= 5),
  cena_kategorie text CHECK (cena_kategorie IN ('nizka', 'stredni', 'vysoka')),
  specializace text[],
  poznamky text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- ===================================================
-- TRIGGERY pro automatické updated_at
-- ===================================================

-- Function pro update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pro všechny tabulky
CREATE TRIGGER update_pokoje_updated_at BEFORE UPDATE ON pokoje
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rezervace_updated_at BEFORE UPDATE ON rezervace
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_uklidy_updated_at BEFORE UPDATE ON uklidy
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opravy_updated_at BEFORE UPDATE ON opravy_udrzba
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dotace_updated_at BEFORE UPDATE ON dotace
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_akce_updated_at BEFORE UPDATE ON akce
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partneri_updated_at BEFORE UPDATE ON partneri_dodavatele
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===================================================
-- AUTOMATICKÉ VYTVÁŘENÍ ÚKLIDŮ PO CHECK-OUTU
-- ===================================================

CREATE OR REPLACE FUNCTION auto_create_uklid()
RETURNS TRIGGER AS $$
BEGIN
  -- Když se vytvoří rezervace, vytvoř úklid na check-out den
  IF NEW.check_out IS NOT NULL THEN
    INSERT INTO uklidy (pokoj_id, datum, stav)
    VALUES (NEW.pokoj_id, NEW.check_out, 'naplanovano')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rezervace_uklid_trigger
AFTER INSERT ON rezervace
FOR EACH ROW
EXECUTE FUNCTION auto_create_uklid();

-- ===================================================
-- INDEXY pro rychlejší dotazy
-- ===================================================

CREATE INDEX idx_pokoje_stav ON pokoje(stav);
CREATE INDEX idx_pokoje_cislo ON pokoje(cislo_pokoje);

CREATE INDEX idx_rezervace_datum ON rezervace(check_in, check_out);
CREATE INDEX idx_rezervace_stav ON rezervace(stav);

CREATE INDEX idx_uklidy_datum ON uklidy(datum);
CREATE INDEX idx_uklidy_stav ON uklidy(stav);

CREATE INDEX idx_opravy_stav ON opravy_udrzba(stav);
CREATE INDEX idx_opravy_priorita ON opravy_udrzba(priorita);

CREATE INDEX idx_dotace_deadline ON dotace(deadline);
CREATE INDEX idx_dotace_stav ON dotace(stav);

CREATE INDEX idx_akce_datum ON akce(datum);
CREATE INDEX idx_akce_stav ON akce(stav);

-- ===================================================
-- TESTOVACÍ DATA (volitelné)
-- ===================================================

-- Vložit testovací pokoje
INSERT INTO pokoje (cislo_pokoje, pocet_luzek, stav) VALUES
(1, 2, 'ciste'),
(2, 3, 'ciste'),
(3, 2, 'ciste'),
(4, 4, 'ciste'),
(5, 2, 'potrebuje_opravu'),
(6, 3, 'ciste'),
(7, 3, 'potrebuje_opravu'),
(8, 2, 'ciste'),
(9, 4, 'ciste'),
(10, 2, 'ciste'),
(11, 3, 'ciste'),
(12, 2, 'ciste'),
(13, 4, 'ciste'),
(14, 2, 'ciste')
ON CONFLICT (cislo_pokoje) DO NOTHING;

-- ===================================================
-- ROW LEVEL SECURITY (RLS) - Volitelné, ale doporučené
-- ===================================================

-- Zapnout RLS pro všechny tabulky
ALTER TABLE pokoje ENABLE ROW LEVEL SECURITY;
ALTER TABLE rezervace ENABLE ROW LEVEL SECURITY;
ALTER TABLE uklidy ENABLE ROW LEVEL SECURITY;
ALTER TABLE opravy_udrzba ENABLE ROW LEVEL SECURITY;
ALTER TABLE dotace ENABLE ROW LEVEL SECURITY;
ALTER TABLE akce ENABLE ROW LEVEL SECURITY;
ALTER TABLE partneri_dodavatele ENABLE ROW LEVEL SECURITY;

-- Povolit všem authenticated uživatelům přístup (upravte podle potřeby)
CREATE POLICY "Povolit vše authenticated uživatelům" ON pokoje
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Povolit vše authenticated uživatelům" ON rezervace
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Povolit vše authenticated uživatelům" ON uklidy
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Povolit vše authenticated uživatelům" ON opravy_udrzba
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Povolit vše authenticated uživatelům" ON dotace
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Povolit vše authenticated uživatelům" ON akce
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Povolit vše authenticated uživatelům" ON partneri_dodavatele
  FOR ALL USING (auth.role() = 'authenticated');

-- POKUD chcete povolit přístup i bez autentizace (pro testing):
-- Odkomentujte následující políčky:

-- CREATE POLICY "Povolit čtení všem" ON pokoje FOR SELECT USING (true);
-- CREATE POLICY "Povolit zápis všem" ON pokoje FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Povolit update všem" ON pokoje FOR UPDATE USING (true);
-- CREATE POLICY "Povolit delete všem" ON pokoje FOR DELETE USING (true);

-- Opakujte pro ostatní tabulky podle potřeby

-- ===================================================
-- VIEWS pro často používané dotazy
-- ===================================================

-- View: Pokoje potřebující opravu
CREATE OR REPLACE VIEW pokoje_k_oprave AS
SELECT
  p.cislo_pokoje,
  p.stav,
  COUNT(o.id) as pocet_oprav,
  SUM(o.odhadovane_naklady) as celkove_naklady
FROM pokoje p
LEFT JOIN opravy_udrzba o ON p.id = o.pokoj_id AND o.stav != 'hotovo'
WHERE p.stav = 'potrebuje_opravu'
GROUP BY p.id, p.cislo_pokoje, p.stav;

-- View: Nadcházející akce
CREATE OR REPLACE VIEW nadchazejici_akce AS
SELECT *
FROM akce
WHERE datum >= CURRENT_DATE
  AND stav IN ('planovano', 'potvrzeno')
ORDER BY datum ASC;

-- View: Dotace s blížícím se deadlinem
CREATE OR REPLACE VIEW dotace_deadline AS
SELECT
  nazev,
  poskytovatel,
  deadline,
  (deadline - CURRENT_DATE) as dni_do_deadlinu,
  stav
FROM dotace
WHERE deadline >= CURRENT_DATE
  AND stav IN ('nove', 'priprava')
ORDER BY deadline ASC;

-- ===================================================
-- HOTOVO!
-- ===================================================

-- Zkontrolujte, že všechny tabulky byly vytvořeny:
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Výsledek by měl obsahovat:
-- - akce
-- - dotace
-- - opravy_udrzba
-- - partneri_dodavatele
-- - pokoje
-- - rezervace
-- - uklidy
