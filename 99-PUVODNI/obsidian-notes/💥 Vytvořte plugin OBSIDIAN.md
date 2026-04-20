---
source: https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin
tags:
  - obsidian
  - obsidian_tricks
---
Vytvořte plugin

Pluginy vám umožní rozšířit Obsidian o vlastní funkce a vytvořit si vlastní zážitek z pořizování poznámek.

V tomto tutoriálu zkompilujete ukázkový plugin ze zdrojového kódu a načtete jej do Obsidian.

## Co se naučíte

Po dokončení tohoto tutoriálu budete moci:

- Nakonfigurujte prostředí pro vývoj pluginů Obsidian.
- Zkompilujte plugin ze zdrojového kódu.
- Po provedení změn znovu načtěte plugin.

## Předpoklady

K dokončení tohoto tutoriálu budete potřebovat:

- [Git](https://git-scm.com/) nainstalován na místním počítači.
- Prostředí místního rozvoje pro [Node.js](https://node.js.org/en/about/).
- Editor kódu, například [Kód vizuálního studia](https://code.visualstudio.com/).

## Než začnete

Při vývoji pluginů může jedna chyba vést k nezamýšleným změnám v úschovně. Abyste zabránili ztrátě dat, neměli byste ve svém hlavním trezoru nikdy vyvíjet pluginy. Vždy používejte samostatný trezor věnovaný vývoji pluginu.

[Vytvořte prázdný trezor](https://help.obsidian.md/Getting+started/Create+a+vault#Create+empty+vault).

## Krok 1: Stáhněte si ukázkový plugin

V tomto kroku stáhnete ukázkový plugin do `plugins` adresář v úschovně [`.obsidian` adresář](https://help.obsidian.md/Advanced+topics/How+Obsidian+stores+data#Per+vault+data) aby to Obsidian našel.

Ukázkový plugin, který použijete v tomto tutoriálu, je k dispozici v a [Úložiště GitHub](https://github.com/obsidianmd/obsidian-sample-plugin).

1. Otevřete okno terminálu a změňte adresář projektu na `plugins` adresář.
    
    ```bash
    cd path/to/vault
    mkdir .obsidian/plugins
    cd .obsidian/plugins
    ```
    
2. Uzavřete ukázkový plugin pomocí Gitu.
    
    ```bash
    git clone https://github.com/obsidianmd/obsidian-sample-plugin.git
    ```
    

Úložiště šablony GitHub

Úložiště ukázkového pluginu je úložiště šablony GitHub, což znamená, že si můžete vytvořit vlastní úložiště ze vzorového pluginu. Chcete-li se naučit jak, odkazovat na [Vytvoření úložiště ze šablony](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template).

Při klonování ukázkového pluginu nezapomeňte použít adresu URL svého vlastního úložiště.

## Krok 2: Sestavte plugin

V tomto kroku zkompilujete ukázkový plugin tak, aby jej mohl Obsidian načíst.

1. Přejděte do adresáře pluginů.
    
    ```bash
    cd obsidian-sample-plugin
    ```
    
2. Nainstalujte závislosti.
    
    ```bash
    npm install
    ```
    
3. Zkompilujte zdrojový kód. Následující příkaz stále běží v terminálu a obnovuje plugin při úpravě zdrojového kódu.
    
    ```bash
    npm run dev
    ```
    

Všimněte si, že adresář pluginů má nyní `main.js` soubor, který obsahuje kompilovanou verzi pluginu.

## Krok 3: Povolte plugin

Chcete-li načíst plugin v Obsidianu, musíte jej nejprve povolit.

1. V Obsidian, otevřeno **Nastavení**.
2. V postranní nabídce vyberte **Doplňky Společenství**.
3. Vybrat **Zapněte komunitní pluginy**.
4. Pod **Nainstalované pluginy**, povolit **Ukázka pluginu** výběrem tlačítka přepínání vedle něj.

Nyní jste připraveni použít plugin v Obsidianu. Dále provedeme některé změny pluginu.

## Krok 4: Aktualizujte manifest pluginu

V tomto kroku přejmenujete plugin aktualizací manifestu pluginu, `manifest.json`. Manifest obsahuje informace o vašem pluginu, jako je jeho název a popis.

1. Otevřít `manifest.json` v editoru kódů.
2. Změnit `id` na jedinečný identifikátor, jako je `"hello-world"`.
3. Změnit `name` na jméno přátelské k člověku, jako je `"Hello world"`.
4. Restartujte Obsidian a načtěte nové změny do manifestu pluginu.

Vraťte se do **Nainstalované pluginy** a všimněte si, že název pluginu byl aktualizován, aby odrážel provedené změny.

Nezapomeňte restartovat Obsidiana, kdykoli provedete změny `manifest.json`.

## Krok 5: Aktualizujte zdrojový kód

Chcete-li uživateli komunikovat s pluginem, přidejte _ikona stuhy_ to pozdraví uživatele, když jej vybere.

1. Otevřít `main.ts` v editoru kódů.
    
2. Přejmenujte třídu pluginu z `MyPlugin` do `HelloWorldPlugin`.
    
3. Importovat `Notice` od `obsidian` balíček.
    
    ```ts
    import { Notice, Plugin } from "obsidian";
    ```
    
4. V `onload()` metoda, přidejte následující kód:
    
    ```ts
    this.addRibbonIcon('dice', 'Greet', () => {
      new Notice('Hello, world!');
    });
    ```
    
5. V **Paleta příkazů**, vybrat **Znovu načtěte aplikaci bez uložení** znovu načíst plugin.
    

Nyní můžete vidět kostkovou ikonu ve stuze na levé straně okna Obsidian. Vyberte ji a zobrazte zprávu v pravém horním rohu.

Pamatujte, musíte **po změně zdrojového kódu znovu načtěte plugin**, buď deaktivací a opětovným aktivací na panelu komunitních pluginů, nebo pomocí palety příkazů, jak je podrobně popsáno v části 5 tohoto kroku.

Horké překládky

Nainstalujte [Hot-Reload](https://github.com/pjeby/hot-reload) plugin pro automatické opětovné načtení pluginu při vývoji.

## Závěr

V tomto tutoriálu jste vytvořili svůj první plugin Obsidian pomocí rozhraní API TypeScript. Upravili jste plugin a znovu jej načtili tak, aby odrážel změny uvnitř Obsidian.

ODKAZY NA TUTO STRÁNKU

[Domov](https://docs.obsidian.md/Home)

[Použijte Svelte ve svém pluginu](https://docs.obsidian.md/Plugins/Getting+started/Use+Svelte+in+your+plugin)

#claude_reference
