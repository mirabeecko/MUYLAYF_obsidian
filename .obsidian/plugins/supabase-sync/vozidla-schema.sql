-- ===================================================
-- TABULKA VOZIDEL PRO KOMÁRKU
-- Spusťte v Supabase SQL Editoru
-- ===================================================

-- TABULKA: VOZIDLA
CREATE TABLE IF NOT EXISTS vozidla (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nazev text NOT NULL,
  typ text CHECK (typ IN ('traktor', 'rolba', 'auto', 'moto', 'ctyrkolka', 'ostatni')),
  znacka text,
  model text,
  registracni_znacka text,
  vin text,
  rok_vyroby int,
  vykon_hp int,
  vykon_kw int,
  motor text,
  stav text CHECK (stav IN ('funkcni', 'nefunkcni', 'v_oprave', 'mimo_provoz', 'ukradeno', 'prodano')),
  umisteni text,
  platnost_stk date,
  posledni_servis date,
  pristi_servis date,
  pojistovna text,
  platnost_pojisteni date,
  poznamky text,
  fotky text[],
  dokumenty jsonb,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Trigger pro updated_at
CREATE TRIGGER update_vozidla_updated_at BEFORE UPDATE ON vozidla
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Index pro rychlejší dotazy
CREATE INDEX idx_vozidla_typ ON vozidla(typ);
CREATE INDEX idx_vozidla_stav ON vozidla(stav);
CREATE INDEX idx_vozidla_rz ON vozidla(registracni_znacka);

-- Row Level Security
ALTER TABLE vozidla ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Povolit vše authenticated uživatelům" ON vozidla
  FOR ALL USING (auth.role() = 'authenticated');

-- View: Vozidla s končící STK
CREATE OR REPLACE VIEW vozidla_stk_expiruje AS
SELECT
  nazev,
  typ,
  registracni_znacka,
  platnost_stk,
  (platnost_stk - CURRENT_DATE) as dni_do_stk,
  stav
FROM vozidla
WHERE platnost_stk IS NOT NULL
  AND platnost_stk >= CURRENT_DATE
  AND platnost_stk <= CURRENT_DATE + INTERVAL '60 days'
ORDER BY platnost_stk ASC;

-- View: Vozidla potřebující servis
CREATE OR REPLACE VIEW vozidla_servis_potreba AS
SELECT
  nazev,
  typ,
  posledni_servis,
  pristi_servis,
  (pristi_servis - CURRENT_DATE) as dni_do_servisu
FROM vozidla
WHERE pristi_servis IS NOT NULL
  AND pristi_servis >= CURRENT_DATE
  AND pristi_servis <= CURRENT_DATE + INTERVAL '30 days'
ORDER BY pristi_servis ASC;

-- HOTOVO!
SELECT 'Tabulka vozidla vytvořena!' as status;
