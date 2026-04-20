---
rating: 7
completed: false
bind_target: false
status: done
---




Jak se ti to povedlo ? 
```meta-bind
INPUT[inlineSelect(
    option(1, trash),
    option(2, bad),
    option(3, ok),
    option(4, good),
    option(5, OK),
	option(6, great),
     option(7, great),
	option(8, great),
	option(9, great),
	option(10, great)
):rating]
```





```meta-bind
INPUT[toggle(showcase):bind_target]
```


```meta-bind
INPUT[toggle(offValue(in progress), onValue(done)):status]
```


```meta-bind
INPUT[editor]
```
INPUT[toggle(showcase):bind_target]

#claude_tjkrupka
