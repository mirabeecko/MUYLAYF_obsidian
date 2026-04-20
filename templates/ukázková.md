---
name: 
věk: "{{age}}"
image: 
oddíl: "{{oddil}}"
created_date: <% tp.date.now("DD-MM-YYYY") %>
---
### Riko ALL

```expander
#tj-krupka
```
<-->



author:
year:
status: reading
date: (jak) '!!

"jméno knihy"
"téma knihy"

|Variable|Description|
|---|---|
|`Untitled`|Title of the active note.|
|`2023-11-09`|Today's date. **Default format:** `YYYY-MM-DD`.|
|`13:39`|Current time. **Default format:** `HH:mm`.|


|Variable|Availability|
|---|---|
|[{{caret_paragraph}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bcaret_paragraph%7D%7D)|When a note pane is open.|
|[{{caret_position}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bcaret_position%7D%7D)|When a note pane is open.|
|[{{clipboard}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bclipboard%7D%7D)|Always.|
|[{{date}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bdate%7D%7D)|Always.|
|[{{file_content}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bfile_content%7D%7D)|When a file is open.|
|[{{file_extension}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bfile_extension%7D%7D)|When a file is open.|
|[{{file_name}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bfile_name%7D%7D)|When a file is open.|
|[{{file_path}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bfile_path%7D%7D)|When a file is open.|
|[{{file_uri}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bfile_uri%7D%7D)|When a file is open.|
|[{{folder_name}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bfolder_name%7D%7D)|When a file is open.|
|[{{folder_path}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bfolder_path%7D%7D)|When a file is open.|
|[{{new_note_folder_name}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bnew_note_folder_name%7D%7D)|Always.|
|[{{new_note_folder_path}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bnew_note_folder_path%7D%7D)|Always.|
|[{{note_content}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bnote_content%7D%7D)|When a file is open.|
|[{{selection}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bselection%7D%7D)|When a note pane is open in _editing view_.|
|[{{tags}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Btags%7D%7D)|When a note pane is open.|
|[{{title}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Btitle%7D%7D)|When a file is open.|
|[{{vault_path}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bvault_path%7D%7D)|Always.|
|[{{yaml_content}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Byaml_content%7D%7D)|When a note pane is open and a YAML frontmatter is defined.|
|[{{yaml_value}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Byaml_value%7D%7D)|When a note pane is open and a YAML frontmatter is defined.|
|[{{workspace}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bworkspace%7D%7D)|When the _Workspaces_ core plugin is enabled.|

## Event variables

These variables are only available when a shell command is executed by a specific event that supports the variables.

|Variable|Available during events|
|---|---|
|[{{event_file_content}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_file_content%7D%7D)|[File menu](https://publish.obsidian.md/shellcommands/Events/File+menu), [File created](https://publish.obsidian.md/shellcommands/Events/File+created), [File content modified](https://publish.obsidian.md/shellcommands/Events/File+content+modified), [File deleted](https://publish.obsidian.md/shellcommands/Events/File+deleted), [File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed)|
|[{{event_file_extension}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_file_extension%7D%7D)|[File menu](https://publish.obsidian.md/shellcommands/Events/File+menu), [File created](https://publish.obsidian.md/shellcommands/Events/File+created), [File content modified](https://publish.obsidian.md/shellcommands/Events/File+content+modified), [File deleted](https://publish.obsidian.md/shellcommands/Events/File+deleted), [File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed)|
|[{{event_file_name}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_file_name%7D%7D)|[File menu](https://publish.obsidian.md/shellcommands/Events/File+menu), [File created](https://publish.obsidian.md/shellcommands/Events/File+created), [File content modified](https://publish.obsidian.md/shellcommands/Events/File+content+modified), [File deleted](https://publish.obsidian.md/shellcommands/Events/File+deleted), [File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed)|
|[{{event_file_path}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_file_path%7D%7D)|[File menu](https://publish.obsidian.md/shellcommands/Events/File+menu), [File created](https://publish.obsidian.md/shellcommands/Events/File+created), [File content modified](https://publish.obsidian.md/shellcommands/Events/File+content+modified), [File deleted](https://publish.obsidian.md/shellcommands/Events/File+deleted), [File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed)|
|[{{event_file_uri}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_file_uri%7D%7D)|[File menu](https://publish.obsidian.md/shellcommands/Events/File+menu), [File created](https://publish.obsidian.md/shellcommands/Events/File+created), [File content modified](https://publish.obsidian.md/shellcommands/Events/File+content+modified), [File deleted](https://publish.obsidian.md/shellcommands/Events/File+deleted), [File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed)|
|[{{event_folder_name}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_folder_name%7D%7D)|[File menu](https://publish.obsidian.md/shellcommands/Events/File+menu), [File created](https://publish.obsidian.md/shellcommands/Events/File+created), [File content modified](https://publish.obsidian.md/shellcommands/Events/File+content+modified), [File deleted](https://publish.obsidian.md/shellcommands/Events/File+deleted), [File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed),  <br>[Folder menu](https://publish.obsidian.md/shellcommands/Events/Folder+menu), [Folder created](https://publish.obsidian.md/shellcommands/Events/Folder+created), [Folder deleted](https://publish.obsidian.md/shellcommands/Events/Folder+deleted), [Folder moved](https://publish.obsidian.md/shellcommands/Events/Folder+moved), [Folder renamed](https://publish.obsidian.md/shellcommands/Events/Folder+renamed)|
|[{{event_folder_path}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_folder_path%7D%7D)|[File menu](https://publish.obsidian.md/shellcommands/Events/File+menu), [File created](https://publish.obsidian.md/shellcommands/Events/File+created), [File content modified](https://publish.obsidian.md/shellcommands/Events/File+content+modified), [File deleted](https://publish.obsidian.md/shellcommands/Events/File+deleted), [File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed),  <br>[Folder menu](https://publish.obsidian.md/shellcommands/Events/Folder+menu), [Folder created](https://publish.obsidian.md/shellcommands/Events/Folder+created), [Folder deleted](https://publish.obsidian.md/shellcommands/Events/Folder+deleted), [Folder moved](https://publish.obsidian.md/shellcommands/Events/Folder+moved), [Folder renamed](https://publish.obsidian.md/shellcommands/Events/Folder+renamed)|
|[{{event_note_content}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_note_content%7D%7D)|[File menu](https://publish.obsidian.md/shellcommands/Events/File+menu), [File created](https://publish.obsidian.md/shellcommands/Events/File+created), [File content modified](https://publish.obsidian.md/shellcommands/Events/File+content+modified), [File deleted](https://publish.obsidian.md/shellcommands/Events/File+deleted), [File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed)|
|[{{event_old_file_name}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_old_file_name%7D%7D)|[File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed)|
|[{{event_old_file_path}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_old_file_path%7D%7D)|[File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed)|
|[{{event_old_folder_name}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_old_folder_name%7D%7D)|[File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [Folder moved](https://publish.obsidian.md/shellcommands/Events/Folder+moved)|
|[{{event_old_folder_path}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_old_folder_path%7D%7D)|[File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [Folder moved](https://publish.obsidian.md/shellcommands/Events/Folder+moved), [Folder renamed](https://publish.obsidian.md/shellcommands/Events/Folder+renamed)|
|[{{event_old_title}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_old_title%7D%7D)|[File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed)|
|[{{event_tags}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_tags%7D%7D)|[File menu](https://publish.obsidian.md/shellcommands/Events/File+menu), [File created](https://publish.obsidian.md/shellcommands/Events/File+created), [File content modified](https://publish.obsidian.md/shellcommands/Events/File+content+modified), [File deleted](https://publish.obsidian.md/shellcommands/Events/File+deleted), [File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed)|
|[{{event_title}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_title%7D%7D)|[File menu](https://publish.obsidian.md/shellcommands/Events/File+menu), [File created](https://publish.obsidian.md/shellcommands/Events/File+created), [File content modified](https://publish.obsidian.md/shellcommands/Events/File+content+modified), [File deleted](https://publish.obsidian.md/shellcommands/Events/File+deleted), [File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed)|
|[{{event_yaml_content}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_yaml_content%7D%7D)|[File menu](https://publish.obsidian.md/shellcommands/Events/File+menu), [File created](https://publish.obsidian.md/shellcommands/Events/File+created), [File content modified](https://publish.obsidian.md/shellcommands/Events/File+content+modified), [File deleted](https://publish.obsidian.md/shellcommands/Events/File+deleted), [File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed)|
|[{{event_yaml_value}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bevent_yaml_value%7D%7D)|[File menu](https://publish.obsidian.md/shellcommands/Events/File+menu), [File created](https://publish.obsidian.md/shellcommands/Events/File+created), [File content modified](https://publish.obsidian.md/shellcommands/Events/File+content+modified), [File deleted](https://publish.obsidian.md/shellcommands/Events/File+deleted), [File moved](https://publish.obsidian.md/shellcommands/Events/File+moved), [File renamed](https://publish.obsidian.md/shellcommands/Events/File+renamed)|

|Variable|Availability|
|---|---|
|[{{environment}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Benvironment%7D%7D)|Usually used in [PATH additions](https://publish.obsidian.md/shellcommands/Environments/Additions+to+the+PATH+environment+variable#An%20easier%20way%20to%20add%20directories%20to%20PATH). Available, if the passed environment variable name exists.|
|[{{output}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Boutput%7D%7D)|In [output wrappers](https://publish.obsidian.md/shellcommands/Output+handling/Output+wrappers), cannot be used as input for shell commands.|
|[{{shell_command_content}}](https://publish.obsidian.md/shellcommands/Variables/%7B%7Bshell_command_content%7D%7D)|In [[Settings for custom shells|

#claude_reference
