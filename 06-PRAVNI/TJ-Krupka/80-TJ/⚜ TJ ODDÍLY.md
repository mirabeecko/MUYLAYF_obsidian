---
tags:
  - TJ/MAIN
  - dg-publish
  - Tj/zpravy
  - TJK-ALFA-DOC
dg-publish: true
---




```dataview
list 
from #tj/oddily1 
```



```dataview
table členů, prispevek_clen as "vybírán roční příspěvek"
from #tj/oddily   
```



#### Původní počty členů dle staré evidence z roku 2020 

```dataview
table členů, dluh_celkem as "dluh", tj_zaplatila as "TJ zaplaceno", oddílové_příspěvky as "zapřené přísp.", členské_příspěvky as "nezaplacené přísp."
from #tj/oddily   
```

#### Od roku 2021 do roku 2023 Marek Vaniš, Gustav Vlach a Jiří Kulík ani přes výzvy nikdy nepředali aktualizovanou evidenci členů. Na konci 2023 oddíly tvrdí členskou základnu

```dataview
table členů, dluh_celkem as "dluh", tj_zaplatila as "TJ zaplaceno", oddílové_příspěvky as "zapřené přísp.", členské_příspěvky as "nezaplacené přísp."
from #tj/oddily1   
```



2020-2021
2021-2022
2022-2023



---
```dataview
table členů, členské_příspěvky as "nezaplacené přísp.", dluh_energie as "nezaplacené energie"
from #tj/oddily 

```


```dataview
table členů, členské_příspěvky as "nezaplacené přísp.", dluh_elektrina, dluh_plyn, dluh_energie as "nezaplacené energie celkem"
from #tj/oddily 

```

#claude_tjkrupka
