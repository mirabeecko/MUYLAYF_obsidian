---
tags:
  - tj/gpt
  - GPT-INFO
up: "[[🤖 Ai MOC]]"
---

# dotazování na dokumenty ve složce přes API
zadání:
- NAPIŠ PŘESNÝPOSTUP KROK ZA KROKEM JAK VYTVOŘIT SLOŽKU S DOKUMENTY KTERÉ BUDE GPT ZPRACOVÁVAT A VYHODNOCOVAT DLE POŽADAVKŮ PŘES API NA MAC OS.

ChatGPT odpověď:
- Vytvoření složky s dokumenty pro zpracování a vyhodnocení GPT přes API na systému macOS zahrnuje několik kroků, které vás provedou od přípravy dokumentů až po jejich zpracování pomocí API. Následující postup předpokládá, že máte již základní znalosti práce s macOS a přístup k API (například OpenAI API pro GPT).

### Krok 1: Příprava dokumentů

1. **Shromážděte všechny dokumenty**, které chcete zpracovat. Ujistěte se, že jsou ve formátu kompatibilním s vaším skriptem pro zpracování (nejčastěji `.txt` nebo `.pdf`).

### Krok 2: Vytvoření složky pro dokumenty

1. Otevřete **Finder** na vašem Macu.
2. Přejděte na místo, kde chcete novou složku vytvořit (např. na Plochu nebo do Dokumentů).
3. Klikněte pravým tlačítkem myši (nebo použijte dvouprstý klik na trackpadu) a vyberte **Nová složka**.
4. Pojmenujte složku podle vašeho výběru, například `GPT_Documents`.

### Krok 3: Přidání dokumentů do složky

1. Přetáhněte všechny vybrané dokumenty do nově vytvořené složky `GPT_Documents`.

### Krok 4: Příprava skriptu pro zpracování dokumentů

1. Otevřete textový editor nebo vývojové prostředí na vašem Macu (např. Visual Studio Code, Atom, Sublime Text).
2. Vytvořte nový skript v Pythonu (nebo jiném preferovaném programovacím jazyce, který podporuje volání API).
3. Do skriptu implementujte logiku pro čtení dokumentů ve složce `GPT_Documents`, extrakci textu (pokud pracujete s PDF, můžete potřebovat knihovnu jako je `PyMuPDF` nebo `pdfminer`), a formátování požadavků pro GPT API.

### Krok 5: Integrace GPT API

1. Zaregistrujte se a získejte přístupový klíč k API od poskytovatele GPT API (např. OpenAI).
2. Do skriptu přidejte potřebné HTTP volání pro interakci s GPT API, včetně autentizačního klíče a parametrů požadavku. Ujistěte se, že vaše volání API respektuje formát a omezení specifikovaná v dokumentaci API.

### Krok 6: Spuštění skriptu a zpracování dokumentů

1. Spusťte skript z terminálu nebo přímo z vývojového prostředí.
2. Skript postupně načte dokumenty ze složky `GPT_Documents`, odešle je do GPT API pro analýzu nebo generování odpovědí na základě vašich požadavků.
3. Výstupy z API (analyzovaný nebo generovaný obsah) můžete ukládat zpět na disk, do nových souborů, nebo je zobrazit přímo v terminálu.

### Krok 7: Další kroky

- Vyhodnoťte výsledky a případně upravte parametry požadavků na API nebo logiku zpracování dokumentů ve vašem skriptu pro zlepšení výsledků.

Tento postup je základním průvodcem, který předpokládá základní znalosti programování a práce s API. Pro konkrétní implementaci a pokročilé scénáře použití může být potřeba další customizace a programovací práce.


---


# program



vytvoř script v python, který bude přes api analyzovat dokumenty ve složce GPT_Documents s path : /Users/mb/Documents/GPT_Documents/

#claude_ai #claude_tech #claude_tjkrupka
