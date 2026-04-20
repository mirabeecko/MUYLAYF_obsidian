---
database-plugin: basic
tags:
  - TJ/MAIN
---

```yaml:dbfolder
name: new database
description: new description
columns:
  __file__:
    key: __file__
    id: __file__
    input: markdown
    label: File
    accessorKey: __file__
    isMetadata: true
    skipPersist: false
    isDragDisabled: false
    csvCandidate: true
    position: 1
    isHidden: false
    sortIndex: 1
    width: 240
    isSorted: true
    isSortedDesc: true
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
      wrap_content: false
      content_alignment: text-align-left
  __tasks__:
    key: __tasks__
    id: __tasks__
    input: task
    label: Task
    accessorKey: __tasks__
    isMetadata: true
    isDragDisabled: false
    skipPersist: false
    csvCandidate: false
    position: 2
    isHidden: true
    sortIndex: -1
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  __tags__:
    key: __tags__
    id: __tags__
    input: metadata_tags
    label: File Tags
    accessorKey: __tags__
    isMetadata: true
    isDragDisabled: false
    skipPersist: false
    csvCandidate: false
    position: 3
    isHidden: true
    sortIndex: -1
    width: 148
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: false
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  bydliště:
    input: text
    accessorKey: bydliště
    key: bydliště
    id: bydliště
    label: bydliště
    position: 5
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 248
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  rodiče-tel:
    input: text
    accessorKey: rodiče-tel
    key: rodiče-tel
    id: rodiče-tel
    label: rodiče-tel
    position: 7
    skipPersist: false
    isHidden: false
    sortIndex: -1
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  rodiče:
    input: text
    accessorKey: rodiče
    key: rodiče
    id: rodiče
    label: rodiče
    position: 6
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 154
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  oddíl:
    input: text
    accessorKey: oddíl
    key: oddíl
    id: oddíl
    label: oddíl
    position: 8
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 183
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  další-sporty:
    input: text
    accessorKey: další-sporty
    key: další-sporty
    id: další-sporty
    label: další-sporty
    position: 9
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 184
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  rodné-číslo:
    input: text
    accessorKey: rodné-číslo
    key: rodné-číslo
    id: rodné-číslo
    label: rodné-číslo
    position: 10
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 166
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  tags:
    input: tags
    accessorKey: tags
    key: tags
    id: tags
    label: tags
    position: 11
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 154
    options:
      - { label: "tj/deti", value: "tj/deti", color: "hsl(328, 95%, 90%)"}
      - { label: "tj/komárka", value: "tj/komárka", color: "hsl(45, 95%, 90%)"}
      - { label: "daily", value: "daily", color: "hsl(107, 95%, 90%)"}
      - { label: "POUŽITÉ_TEMPLATES", value: "POUŽITÉ_TEMPLATES", color: "hsl(92, 95%, 90%)"}
      - { label: "TJ/MAIN", value: "TJ/MAIN", color: "hsl(243, 95%, 90%)"}
      - { label: "ski-komárka", value: "ski-komárka", color: "hsl(221, 95%, 90%)"}
      - { label: "TJ-2024", value: "TJ-2024", color: "hsl(63, 95%, 90%)"}
      - { label: "MOC", value: "MOC", color: "hsl(331, 95%, 90%)"}
      - { label: "group_type", value: "group_type", color: "hsl(289, 95%, 90%)"}
      - { label: "DASHBOARD", value: "DASHBOARD", color: "hsl(81, 95%, 90%)"}
      - { label: "life-MAIN", value: "life-MAIN", color: "hsl(206, 95%, 90%)"}
      - { label: "SUN/MAIN", value: "SUN/MAIN", color: "hsl(208, 95%, 90%)"}
      - { label: "SOLAX", value: "SOLAX", color: "hsl(64, 95%, 90%)"}
      - { label: "SUN-MOC", value: "SUN-MOC", color: "hsl(149, 95%, 90%)"}
      - { label: "tj/obeslat", value: "tj/obeslat", color: "hsl(78, 95%, 90%)"}
      - { label: "AKTUAL_2024", value: "AKTUAL_2024", color: "hsl(273, 95%, 90%)"}
      - { label: "tj/policie", value: "tj/policie", color: "hsl(107, 95%, 90%)"}
      - { label: "excalidraw", value: "excalidraw", color: "hsl(72, 95%, 90%)"}
      - { label: "task", value: "task", color: "hsl(310, 95%, 90%)"}
      - { label: "tj/task", value: "tj/task", color: "hsl(75, 95%, 90%)"}
      - { label: "obsidian_tricks", value: "obsidian_tricks", color: "hsl(183, 95%, 90%)"}
      - { label: "obsidian", value: "obsidian", color: "hsl(282, 95%, 90%)"}
      - { label: "klávesové_zkratky", value: "klávesové_zkratky", color: "hsl(240, 95%, 90%)"}
      - { label: "newTJ", value: "newTJ", color: "hsl(159, 95%, 90%)"}
      - { label: "TJ/SKATEPARK", value: "TJ/SKATEPARK", color: "hsl(204, 95%, 90%)"}
      - { label: "letní-provoz", value: "letní-provoz", color: "hsl(335, 95%, 90%)"}
      - { label: "tj", value: "tj", color: "hsl(159, 95%, 90%)"}
      - { label: "MoyeGPTs", value: "MoyeGPTs", color: "hsl(189, 95%, 90%)"}
      - { label: "Drak", value: "Drak", color: "hsl(335, 95%, 90%)"}
      - { label: "tj/město", value: "tj/město", color: "hsl(25, 95%, 90%)"}
      - { label: "MěÚ-KRUPKA", value: "MěÚ-KRUPKA", color: "hsl(44, 95%, 90%)"}
      - { label: "#clientB", value: "#clientB", color: "hsl(70, 95%, 90%)"}
      - { label: "#privateProject", value: "#privateProject", color: "hsl(332, 95%, 90%)"}
      - { label: "#clientA", value: "#clientA", color: "hsl(282, 95%, 90%)"}
      - { label: "#clientC", value: "#clientC", color: "hsl(19, 95%, 90%)"}
      - { label: "tj/poradna", value: "tj/poradna", color: "hsl(254, 95%, 90%)"}
      - { label: "SUN", value: "SUN", color: "hsl(268, 95%, 90%)"}
      - { label: "zákon", value: "zákon", color: "hsl(227, 95%, 90%)"}
      - { label: "GPT-RADY", value: "GPT-RADY", color: "hsl(103, 95%, 90%)"}
      - { label: "tj/gpt", value: "tj/gpt", color: "hsl(218, 95%, 90%)"}
      - { label: "lidi", value: "lidi", color: "hsl(70, 95%, 90%)"}
      - { label: "peoplelist", value: "peoplelist", color: "hsl(245, 95%, 90%)"}
      - { label: "LIDI", value: "LIDI", color: "hsl(266, 95%, 90%)"}
      - { label: "kom-main", value: "kom-main", color: "hsl(94, 95%, 90%)"}
      - { label: "Lifehack", value: "Lifehack", color: "hsl(289, 95%, 90%)"}
      - { label: "tj/ATEAM", value: "tj/ATEAM", color: "hsl(19, 95%, 90%)"}
      - { label: "OFFROAD", value: "OFFROAD", color: "hsl(186, 95%, 90%)"}
      - { label: "EDU", value: "EDU", color: "hsl(60, 95%, 90%)"}
      - { label: "gpt", value: "gpt", color: "hsl(51, 95%, 90%)"}
      - { label: "ČAST", value: "ČAST", color: "hsl(29, 95%, 90%)"}
      - { label: "STÍŽNOSTI", value: "STÍŽNOSTI", color: "hsl(269, 95%, 90%)"}
      - { label: "scripting", value: "scripting", color: "hsl(17, 95%, 90%)"}
      - { label: "API", value: "API", color: "hsl(18, 95%, 90%)"}
      - { label: "MACOS", value: "MACOS", color: "hsl(111, 95%, 90%)"}
      - { label: "windows10", value: "windows10", color: "hsl(120, 95%, 90%)"}
      - { label: "MAIN", value: "MAIN", color: "hsl(91, 95%, 90%)"}
      - { label: "tj/shrnuti", value: "tj/shrnuti", color: "hsl(89, 95%, 90%)"}
      - { label: "tj/hospodareni", value: "tj/hospodareni", color: "hsl(236, 95%, 90%)"}
      - { label: "tj/web", value: "tj/web", color: "hsl(242, 95%, 90%)"}
      - { label: "tj/ToDo", value: "tj/ToDo", color: "hsl(144, 95%, 90%)"}
      - { label: "překážky", value: "překážky", color: "hsl(74, 95%, 90%)"}
      - { label: "software", value: "software", color: "hsl(166, 95%, 90%)"}
      - { label: "kom-udrzba", value: "kom-udrzba", color: "hsl(137, 95%, 90%)"}
      - { label: "tj/komarka", value: "tj/komarka", color: "hsl(65, 95%, 90%)"}
      - { label: "tj/příjem", value: "tj/příjem", color: "hsl(125, 95%, 90%)"}
      - { label: "divize-kontakty", value: "divize-kontakty", color: "hsl(219, 95%, 90%)"}
      - { label: "2024 let", value: "2024 let", color: "hsl(298, 95%, 90%)"}
      - { label: "Právní-slovíček", value: "Právní-slovíček", color: "hsl(278, 95%, 90%)"}
      - { label: "tj/odeslané", value: "tj/odeslané", color: "hsl(323, 95%, 90%)"}
      - { label: "tj/ČUS", value: "tj/ČUS", color: "hsl(358, 95%, 90%)"}
      - { label: "KSSTÚK", value: "KSSTÚK", color: "hsl(237, 95%, 90%)"}
      - { label: "diyVAN", value: "diyVAN", color: "hsl(17, 95%, 90%)"}
      - { label: "tj/oddily", value: "tj/oddily", color: "hsl(86, 95%, 90%)"}
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  zařazení:
    input: text
    accessorKey: zařazení
    key: zařazení
    id: zařazení
    label: zařazení
    position: 12
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 68
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  alergie:
    input: text
    accessorKey: alergie
    key: alergie
    id: alergie
    label: alergie
    position: 13
    skipPersist: false
    isHidden: false
    sortIndex: -1
    width: 189
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
  POŘADÍ:
    input: number
    accessorKey: POŘADÍ
    key: POŘADÍ
    id: POŘADÍ
    label: POŘADÍ
    position: 4
    skipPersist: false
    isHidden: false
    sortIndex: -1
    config:
      enable_media_view: true
      link_alias_enabled: true
      media_width: 100
      media_height: 100
      isInline: true
      task_hide_completed: true
      footer_type: none
      persist_changes: false
config:
  remove_field_when_delete_column: true
  cell_size: normal
  sticky_first_column: true
  group_folder_column: 
  remove_empty_folders: false
  automatically_group_files: false
  hoist_files_with_empty_attributes: true
  show_metadata_created: false
  show_metadata_modified: false
  show_metadata_tasks: true
  show_metadata_inlinks: false
  show_metadata_outlinks: false
  show_metadata_tags: true
  source_data: query
  source_form_result: "FROM #tj/deti"
  source_destination_path: 80 🎪 TJ/83 TJ ČLENOVÉ ALL
  row_templates_folder: /
  current_row_template: 
  pagination_size: 20
  font_size: 16
  enable_js_formulas: true
  formula_folder_path: /timeline
  inline_default: true
  inline_new_position: last_field
  date_format: yyyy-MM-dd
  datetime_format: "yyyy-MM-dd HH:mm:ss"
  metadata_date_format: "yyyy-MM-dd HH:mm:ss"
  enable_footer: true
  implementation: default
filters:
  enabled: false
  conditions:
```

#claude_tjkrupka
