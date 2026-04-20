```ad-tip
ahojky MORE
	LKSAFDŮ
```


```ad-tip
title: NAPROSTO ZÁSADNÍ


	LKSAFDŮ
```


```ad-tip+
title:    ahojky MORE
	LKSAFDŮ
```


```ruby
[field1:: pes]

## Another section

[field1:: kočka]

## Third section

- [povinnost2:: three],   [field3:: alpha]
- [field2:: four]  and [field2:: five], [field3:: beta]

[field3:: gamma]

### Query in page scope

```



```dataview
TABLE WITHOUT ID povinnost1, povinnost2, field3
WHERE file.name = this.file.name 
```


### Query using FLATTEN on list

```
```

- Obyčejný text některé [Field1 :: pes], [Field2 :: slepice], [Field3 :: kočka], [Field4 :: Value4a]

```dataview
TABLE WITHOUT ID Item.field1, Item.field2, Item.field3, field1
FLATTEN file.lists as Item
WHERE file.name = this.file.name 
```

```dataview 
TABLE WITHOUT ID item.Field1, item.Field2, item.Field3, item.Field4 
FLATTEN file.lists as item WHERE file.name = this.file.name 
```





```dataview 
TABLE WITHOUT ID field1, field2, field3 
WHERE file.name = this.file.name 
```



actual status:: TO DO

```dataview
TABLE WITHOUT ID Item.field1, Item.field2, Item.field3, field1
FLATTEN file.lists as Item
WHERE file.name = this.file.name 
```



**dataviewjs**
```dataviewjs

dv.taskList(dv.pages().file.tasks 
.where(t => !t.completed)
.where(t => t.text.includes("{{date:YYYY-MM-DD}}")))

```



**AGRESSIVE TAG** (dataview)
```dataview
list
from #agressive 
```


**dataviewjs**
```dataviewjs 
dv.pages #tj/deti 
```



```dataview
table
find . -type f -atime 2
```




```dataview  
table datum_narozeni as "narozen"
from #tj/deti 
sort file.mtime asc  
```

#claude_reference
