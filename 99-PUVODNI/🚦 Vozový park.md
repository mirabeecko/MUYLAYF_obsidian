---
tags:
  - VOZOVÝ_PARK
  - nodataview
---
```dataview
table
from #VOZOVÝ_PARK 

```

#nodataview

```dataview
table značka, palivo, nádrž, rok, STK, motor
from #VOZOVÝ_PARK 
where file.tags != "#nodataview"
```

#claude_vozovypark
