---
tags:
  - Tj/zpravy
  - TJ/MAIN
---
# Výsledek hospodaření 2021-2023

> [!INFO]- VÝSLEDEK hospodaření
> ```dataview
> TABLE členů, pokladna_2020,dluh_elektrina AS Elektřina, dluh_plyn as Plyn, oddílové_příspěvky ,členské_příspěvky as Členské, dluh_celkem as Dluh
> from #tj/oddily  
> ```

> [!TIP]- Pokladny 31.12.2020
> ```dataview
> TABLE pokladna_2020 as "pokladna k 31.12.2020"
> from #tj/oddily  
> 
> ```

> [!INFO]- ZAPŘENÉ příspěvky 
> ```dataview
> TABLE oddílové_příspěvky as "Zapírané příspěvky" 
> from #tj/oddily1   
> 
> ```



> [!INFO]- ZAPŘENÉ příspěvky 
> ```dataview
> TABLE oddílové_příspěvky as "Zapírané příspěvky" 
> from #tj/oddily  
> 
> ```



> [!important]- NEZAPLACENÉ příspěvky 
> ```dataview
> TABLE členské_příspěvky as "Nezaplacené členské příspěvky"
> from #tj/oddily  
> 
> ```

> [!important]- Energie-Dluhy oddílů
>```dataview
> TABLE dluh_energie
> from #tj/oddily  
>  
> ```

#claude_tjkrupka
