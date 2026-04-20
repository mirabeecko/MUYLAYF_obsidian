

### ALL EXCALIDRAWs

```dataview
LIST WHERE contains(file.name, "excalidraw")
SORT file.ctime DESC
```

### ALL CANVASes
```dataviewjs
const canvas = (app.vault.getFiles().filter(file => file.extension === 'canvas')).sort((a, b) => a.name.localeCompare(b.name));;
dv.list(canvas.map(file => dv.fileLink(file.path)))
```

#claude_reference
