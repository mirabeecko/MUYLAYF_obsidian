---
tags:
  - obsidian_tricks
  - scripting
  - obsidian
source: https://help.obsidian.md/Editing+and+formatting/HTML+content
---

[[CSS SNIPPETS]]

---

**Obsah HTML**

Obsidian podporuje HTML, aby vám umožnil zobrazovat své poznámky tak, jak chcete, nebo dokonce [vložené webové stránky](https://help.obsidian.md/Editing+and+formatting/Embed+web+pages). Povolení HTML uvnitř vašich poznámek přichází s riziky. Aby se zabránilo poškození škodlivého kódu, Obsidian _dezinfekce_ jakýkoli HTML v poznámkách.

Příklad

`<script>` prvek normálně umožňuje spustit JavaScript při každém načtení. Pokud Obsidian nedezinfikoval HTML, útočník by vás mohl přesvědčit, abyste vložili text obsahující JavaScript, který extrahuje citlivé informace z vašeho počítače a odešle je zpět jim.

To znamená, že syntaxe Markdown nepodporuje všechny formy stylingu, použití dezinfikovaného HTML může být dalším způsobem, jak zvýšit kvalitu vašich poznámek. Zahrnuli jsme některá z běžnějších použití HTML.

Další podrobnosti o použití `<iframe>` najdete v [Vložené webové stránky](https://help.obsidian.md/Editing+and+formatting/Embed+web+pages).

### Komentáře

[Označení komentářů](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Comments) jsou preferovaným způsobem přidávání skrytých komentářů do vašich poznámek. Některé metody převodu poznámek Markdown, například [Pandoc](https://pandoc.org/), mají omezenou podporu komentářů Markdown. V těchto případech můžete použít `<!-- HTML Comment -->` místo toho!

### Podtržení

Pokud potřebujete rychle podtrhnout položku v poznámkách, můžete ji použít `<u>Example</u>` vytvořit váš podtržený text.

### Span / Div

Značky span a div lze použít k použití vlastních tříd z [CSS úryvek](https://help.obsidian.md/Extending+Obsidian/CSS+snippets), nebo vlastní definovaný styl, na vybranou oblast textu. Například pomocí `<span style="font-family: cursive">your text</span>` vám umožní rychle změnit písmo.

## Přeškrtnutí

Je třeba udeřit ~~nějaký text~~? Použít `<s>this</s>` vyrazit to.

#claude_reference
