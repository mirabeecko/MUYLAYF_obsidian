---
jméno: "{{name}}"
příjmení: "{{surname}}"
oddíl: "{{oddil}}"
datum_narozeni: "{{born}}"
email: "{{email}}"
id: "{{ID}}"
bydliště: "{{wherelive}}"
rodiče: "{{name_parents}}"
rodiče-tel: "{{phone_parents}}"
rodiče-mail: "{{mail_parents}}"
zařazení: "{{zarazeni}}"
alergie: "{{alergy}}"
další sporty: "{{more_sports}}"
rodné číslo: "{{born_number}}"
tags:
  - template-tj
project: Členové TJ
město: "{{city}}"
PSČ: "{{ZIP-CODE}}"
ulice: "{{street}}"
2023-1Q: "{{2023-1Q}}"
2023-2Q: "{{2023-2Q}}"
2023-3Q: "{{2023-3Q}}"
2023-4Q: "{{2023-4Q}}"
2024-1Q: "{{2024-1Q}}"
2024-2Q: "{{2024-2Q}}"
2024-3Q: "{{2024-3Q }}"
2024-4Q: "{{2024-4Q}}"
role: "{{role}}"
sportovce_od: "{{sportovec_od}}"
trenér_od: "{{trener_od}}"
dluh: "{{dluh}}"
Obcan_CR: "{{Obcan_CR}}"
trenér: "{{trener}}"
rozhodci: "{{rozhodci}}"
pojišťovna: 
cssclasses:
  - dashboard
---


Jméno: {{name}}
Příjmení: {{surname}}

---



---





--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 4  

```



```dataview
list
from #tj/oddily1 

```

--- end-column ---

```tasks
due after tomorrow
not done
```

--- end-column ---



--- end-column ---

```dataview
table dluh_celkem
from #tj/vsechnyoddily1 
```

--- end-column ---



--- end-multi-column

#claude_tjkrupka
