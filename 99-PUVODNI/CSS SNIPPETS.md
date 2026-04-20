---
tags:
  - scripting
  - obsidian
  - obsidian_tricks
---


---

**Úryvky CSS**

Naučte se, jak upravit aspekty vzhledu Obsidian, aniž byste museli [vytvářet téma](https://docs.obsidian.md/Themes/App+themes/Build+a+theme) .

CSS je jazyk, který popisuje, jak prezentovat HTML dokument. Přidáním úryvků CSS můžete předefinovat části uživatelského rozhraní Obsidian, jako je velikost a barva nadpisů. Obsidian obsahuje [proměnné CSS](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables) , které můžete použít ke snadnému přizpůsobení částí rozhraní.

Obsidian hledá úryvky CSS uvnitř konfigurační složky úložiště.

Chcete-li přidat fragment CSS, postupujte takto:

1. Otevřete **Nastavení** .
2. V **části Vzhled → Úryvky CSS** vyberte **Otevřít složku výstřižků** (ikona složky).
3. Ve složce úryvků vytvořte soubor CSS, který obsahuje váš úryvek.
4. V Obsidianu v části **Vzhled → Úryvky CSS** vyberte **Znovu načíst úryvky** (ikona obnovení), aby se úryvek zobrazil v seznamu.

Obsidian automaticky detekuje změny úryvků CSS a použije je, když úryvek uložíte. Aby se změny projevily, nemusíte Obsidian restartovat.

Příklad: Změna barvy textu

Vytvořte například soubor nazvaný `snippet.css`s následujícím obsahem a změňte barvu textu na červenou:

```css
body {
  --text-normal: red;
}
```

## Zjistěte více

- Pokud s CSS začínáte, přečtěte si článek [Naučte se stylovat HTML pomocí CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS) od Mozilly.
- Pokud chcete další tipy na styling Obsidian, podívejte se na [O stylingu](https://docs.obsidian.md/Reference/CSS+variables/About+styling) .

#claude_reference
