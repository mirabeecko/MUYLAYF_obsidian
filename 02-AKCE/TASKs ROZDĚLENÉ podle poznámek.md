---
up: "[[🔻 TASK MOC]]"
aliases:
  - TASKs
---
> [!danger] ROZDĚLENÉ TASKS PODLE POZNÁMKY
> 
> ```dataviewjs 
> dv.taskList(dv.pages("").file.tasks 
> .where(t => !t.completed)) 
> ```


---



> [!danger]+ ToDO rozdělené
> ##### Mákni na tom
> ```tasks 
> due before tomorrow 
> not done
> 
> ```
> 
> ##### Blížící se úkoly:
> 
> ```tasks
> due after tomorrow
> not done
> ```
> ##### Bez termínu
> ```tasks
> not done
> no due date
> #task 
> not done
> ```

#claude_reference
