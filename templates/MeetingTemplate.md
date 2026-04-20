--- 
date: <% tp.file.creation_date() %> 
type: 
meeting company: 
summary: " "
tags: notes/meeting 
--- 

Index of all meeting notes: [[Map - Meetings]] 

Date: [[<% tp.date.now("YYYY MMDD dddd") %>]] <% await tp.file.move("/3. Meeting Notes/" + tp.date.now("YYYY MMDD") + " - " + tp.file.title) %>
# [[<% tp.date.now("YYYY MMDD - ") + " " + tp.file.title %>]] 

**Attendees**: 
- <% tp.file.cursor() %> 

## Agenda/Questions - 

## Notes -

#claude_reference
