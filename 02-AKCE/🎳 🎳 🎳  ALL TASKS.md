
```ad-attention
title: TASKs PODLE DATA
collapse:close

<br>

```ad-attention
title: DNEŠNÍ ÚKOLY

```tasks 
due before tomorrow 
not done

```

> [!help] Blížící se ÚKOLY:
> 
> ```tasks
> due next days
> not done
> ```

> [!important] ÚKOLY | bez termínu
> ```tasks
> not done
> no due date
> #task 
> not done
> ```


---

```ad-attention
title: TASK together
collapse: close
```tasks
short mode
not done
```

---


> [!danger] ROZDĚLENÉ TASKS PODLE POZNÁMKY
> 
> ```dataviewjs 
> dv.taskList(dv.pages("").file.tasks 
> .where(t => !t.completed)) 
> ```
> 
> 

#claude_reference
