



# Preambel

Quick summary about my circumstances:  
I’m the Project Lead for an open-end project (Programme might be a better description) with ~150 team members, a number of sub-leads, multiple sub-contractors and a fairly big industry around it, consisting of customer and other influencing entities.

A typical workday consists of 4-8 meetings and various phone calls/talks on a variety of topics. Most important for me personally is to stay on top of a high number of open topics, making sure I am aware of any prior information I have received or decisions which were made.

In the past I tried a ton of different approaches, from Bullet Journaling to OneNote to big text files. I stumbled upon Obsidian about a year ago and embraced it immediately, but I lacked a consistent approach and just used it for fleeting notes without any structure.  
A couple of weeks ago I found [this post 553](https://thebuccaneersbounty.wordpress.com/2022/01/05/how-i-use-the-daily-notes-plugin-a-comprehensive-guide/) by Gentry Gibson and decided to use it as my basis for a more consistent approach.

# [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#my-vault-2)My Vault

## [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#daily-notes-3)Daily Notes

Daily Notes are my Hub.  
Every morning, I let Obsidian create a Daily Note with a simple template:

```
---
Title:
created: ["<% tp.file.creation_date() %>"]
---
<- [[Daily Notes Hub | Daily Notes Hub]]

# <% tp.date.now("YYYY-MM-DD") %>

([[<% tp.date.now("YYYY-MM-DD", -1) %>]]) <- (<% tp.date.now("YYYY-MM-DD") %>) -> ([[<% tp.date.now("YYYY-MM-DD", 1) %>]])

- Summary:: 

- [ ] ```run: robocopy "C:\Users\USER\Documents\Obsidian\VAULTNAME" "H:\backup\<% tp.date.now("YYYY-MM-DD") %>\Obsidian\VAULTNAME" /mir   ``` 📅 <% tp.date.now("YYYY-MM-DD") %>
 
--- 
## 🛳️ Ship's Log

### Notes
- Note:: <% tp.date.now("HH:mm") %> Start of day

### Meetings
- Meeting:: TIME First [[1. Meetings/<% tp.date.now("YYYY-MM-DD") %> -- Meeting|Meeting]]

### Future Meetings
- FutureMeeting:: TIME [[1. Meetings/<% tp.date.now("YYYY-MM-DD", 1) %> -- Meeting|Meeting]]

--- 
## 💡 New Discoveries
- NewDiscovery:: [Link](http://www.obsidian.md)

--- 

### Tasks Log

#### Todo
```tasks
   not done
   path does not include _templates
   starts before tomorrow
```


Let’s go through each section individually:

### [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#yaml-4)


[YAML](ukázková)

I took this over from Gentry Gibson - the title is useful for one of the Hubs (Daily Notes Hub). I have to admit I don’t use it often, but I enjoy trying to find a short summary for each day. It’s a challenge, but helps to mentally close the day.

### [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#day-links-5)

Day Links

Gentry uses some DataviewJS code to create previous/next links for Daily Notes, but I had a lot of trouble with it. Most times it didn’t refresh correctly in Live Preview Mode, so I went for a much simpler Templater code. It requires manual updates over weekends or vacation, but that doesn’t bother me at all.

### [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#summary-backup-6)

Summary / Backup

Summary is once again a feature for the Daily Notes Hub, and it is a more detailed description of the day. I use tags in here, which I do not in the title.  
The task is my simple but effective backup solution. I would love to implement a more complex version control, but it’s difficult to get anything approved by company IT, so a simple daily copy of the whole vault it is. Every evening I copy&paste the line into a terminal and execute it, a couple of minutes later my vault is backed up.  
The context of my work does not allow me to use any sync or cloud services, but this works well.

### [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#ships-log-7)

Ship’s Log

### [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#notes-8)

Notes

This section is for fleeting notes - either notes to myself to remember something, ideas, but also notes from unscheduled phone calls and talks with colleagues. I use QuickAdd and a keyboard shortcut (Ctrl-Alt-Shift-N, or: Meh-N on my [Ergodox EZ 154](https://ergodox-ez.com/)) to create a note. The QuickAdd Macro is configured to enter the entry in the Section `### Notes`, at the end, and the capture formatting should be `- Note:: {{DATE:HH:mm}} {{VALUE}}` so that I have a time stamp for each note.  
In case the note is longer than 1-2 lines, I create a new file by simple writing `[[talk]] with [[Smith, Peter]]`. Clicking on the link creates a new note in the folder `2. Longer Notes`. This folder does not have a template (yet), I tried a couple of times, but so far these notes were too varied in their structure.  
I rename the file to `YYYY-MM-DD [name of note]` later and let Obsidian update the link and line in my Daily Note. Ideally I would already enter today’s date in the QuickAdd line, but unfortunately the Template Keyboard Shortcut for today’s date does not work in the QuickAdd entry field and I usually can’t be bothered to do it manually.  
And yes, every person referenced in my vault has its own page. I’ll come to that later.

### [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#meetings-9)


Meetings

Every morning I create lines/links for every meeting of the day. I copy&paste the template line and replace TIME with the beginning time of the meeting. For the name of the Meeting, I use the MultiCursor, click on both instances of Meeting in the link and overwrite them both. It’s an aesthetics thing, I don’t like the date in this section.  
As I said, on average I have 4-8 meetings per day, so I create individual lines for each meeting.  
Clicking on the link creates a new file in the folder `1. Meetings`. This folder has a Templater template, which looks like this:


```

```
--- aliases: ["<% tp.file.title.split(" -- ")[1] %>"] created: ["<% tp.file.creation_date() %>"] tags: meeting/ --- # <% tp.file.title %>  <- [[0. Diary/Daily Notes/<% tp.file.title.split(" -- ")[0] %>|Daily Note <% tp.file.title.split(" -- ")[0] %>]] <- [[Ship's Log#Meetings|Meeting Hub]]  ## Prep: -   ## Attendees:  -   ## Agenda:  -   ## Notes: -   ## Attachments`
```

The Templater split function allows me to use the link name of the meeting, so that I can create an alias without the ISO date (in case I want to link this meeting from somewhere else), as well as extract the date on which the meeting take place and link this file directly to its respective daily note. The `--` is the delimiter between ISO date and meeting name.

You might be wondering why I don’t just use today’s date to link to the Daily Note? Well, for some meetings I create the meeting note many days in advance, so that I can collect preparatory work for it - hence the section `## Prep:`. This might be short bullet points, but could as well be links to preparatory meetings on the subject.

For Attendees I link to each person attending - usually with their initials, which are aliases in each person’s file: Peter Smith from above would be linked as `[[Smith, Peter|PS]]`. As the alias is already defined, I can simply write `[[PS` and let Obsidian find the respective person/file to link to.

Agenda is a list of topics to be discussed - I like to use tags here, although I use tags in the YAML, as well. This is still a work in progress, let’s see which way I find more comfortable in the future.

Notes are my personal notes during the meeting.

Attachments are Presentations or Minutes of Meetings. I copy them into my Vault and link them. Most of these attachments are not PDFs, but MS Office files, but I don’t mind, as I can still open them with a simple click.

The hubs which are linked at the top of the note are directly taken over from Gentry - once again, I don’t use them often, but they are there, might as well stick to them.

For recurring meetings, i.e. weekly progress meetings on certain topics, I manually add a link to the last meeting here.

### [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#future-meetings-10)Future Meetings

Back to the Daily Note - Future Meetings works exactly like **Meetings**, but it’s not about today’s meetings. At some point towards the end of the day, I enter all of tomorrow’s meetings in here, so that I know what is the minimum I need to prepare for. More important meetings will be entered a couple of days in advance, so that I can keep track of them and prepare for them, as well.  
Consequently, in the morning I usually start by cutting&pasting the `FutureMeeting` section into the `Meeting` section and just remove `Future` from each line with the MultiCursor. Meetings which are still in the future are kept in the section FutureMeetings.  
And yes, ideally I would keep the ISO date in this section, so that I know which meeting is on which day, but that makes cut&pasting into today’s meeting section harder. I have not found a perfect solution here…

### [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#new-discoveries-11)New Discoveries

A direct copy from Gentry. At the moment this section is mostly about Meta-stuff related to Obsidian - best practices to do certain things, links to Forum entries, Reddit threads or other stuff. My work does not really need any input from the Web, so this is not so relevant for me.

### [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#task-log-12)Task Log

My main todo app is still Todoist, but I catch myself making more and more use of the tasks feature in Obsidian, specifically with the tasks plugin. It’s refreshing to openly write tasks and actions within the context of notes and meetings and not cryptically refer to mails and notes due to the cloud aspect and lack of confidentiality of Todoist. I might make more use of this in the future…

## [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#folder-structure-13)Folder Structure

My folder structure is pretty straight-forward:

```

```

_templates
0. Diary
0. Diary/Daily Notes
0. Diary/Daily Notes/Archive
0. Diary/Daily Notes/Archive/YEAR
0. Diary/Daily Notes/Archive/YEAR/MONTH
1. Meetings
1. Meetings/Archive
1. Meetings/YEAR
1. Meetings/YEAR/CW
2. Longer Notes
2. Longer Notes/Archive
2. Longer Notes/Archive/YEAR
2. Longer Notes/Archive/YEAR/MONTH
3. Hubs
4. People
5. Attachments

```


There is some inconsistency between the Meeting archive and the other archives. I simply have too many meeting notes to archive them on a monthly basis. So far I like the Calendar Week approach, let’s see whether I’ll stick with it. Both Daily Notes and Longer Notes feel better on a monthly basis, as I am more often referring back to notes from past weeks.  
The folder `2. Longer Notes` is the default folder for new notes, which allows me to simply create a new note in the `Note::` section above.

## [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#people-14)People

As stated, every person I interact with has their own note and is stored in `4. People`.  
If a person has not been created yet, I have to link to them with their full name as `[[Smith, Peter]]`. Clicking the link creates a note in `2. Longer Notes`, but I use the plugin **Auto Note Mover** with a simple rule: All notes matching the RegEx `[A-Z][a-z]*, [A-Z][a-z]*` are moved to folder `4. People`. Yes, it misses a couple of people with more… exotic names, but I really can’t be bothered to perfect it. It happens less and less, as by now I have more than 300 names in there, so I don’t add more than 2-3 per week.  
There is a simple Templater template associated to the People folder:
```

```
--- 
aliases:  
tags: 
company/ 
---

```



For aliases, I add the initials, the first name (or name I refer to this person) and the name in the correct order, e.g. `aliases: PS, Pete, Peter, Peter Smith`  
At the moment, I associate every person with a tag to their company. This might become handy, but so far I haven’t make a lot of use of it yet.  
So far, there is no content in any of the people notes. I use the backlinks from time to time to make sure I know in which context I met someone last time or whether they were referenced somewhere, but nothing else.

## [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#hubs-15)Hubs

Honestly - I kept the Ship’s Log, New Discoveries Log and Daily Notes Hub from Gentry’s sample vault, adapting the Ship’s Log to show Notes and Meetings. Do I use it? Not really. They are there, automatically updated, but so far I have not found a use case for them.

## [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#daily-use-16)Daily Use

This is the logic. How do I use it?  
I use links. A lot. Every time I write down a note and think this might become relevant for a meeting, I add a quick line, e.g. `to be discussed in [[2022-02-28 MD Jour Fix]]`. As soon as the meeting is created or if I open its note to further prepare for it, I look at the backlinks and collect all the references.

Same with tags. Luckily, the various topics in my work can quite easily be separated and described by tags, so when I create a meeting and write prep or Agenda, I write down the relevant tags and check them quickly for anything relevant in the last couple of days/weeks.

Does it work? Amazingly well. For the past couple of weeks, I feel like I have a superpower. Every information is at my fingertips, literally. My notes aren’t scattered around, they are exactly where I expect them or can easily be found with 1-2 clicks. I use less time to prepare for meetings and still feel far better prepared than ever before. Of course, all of this is subjective and you might not be completely off by thinking I was quite a mess in the past, but seriously, I feel unbeatable now. And I’m only half joking.

## [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#cooperation-17)Cooperation

For the time being, this is my personal vault. I am thinking about opening it to my deputy and our assistant, but so far this is just an idea. Obsidian is not MS Word, so I don’t know whether it makes sense to introduce them to Markdown and the complex open nature of the vault.  
Besides that I haven’t really fully thought through the technical aspects - storing on a network drive, individual configuration files, all of this.

## [](https://forum.obsidian.md/t/using-obsidian-at-work-project-manager-project-lead/33137#conclusion-18)Conclusion

Well, that was long. I hope someone got some use out of it. In case this was all to abstract, feel free to ask any questions. If you read this and thought to yourself: WTF, why is this guy not using [xyz], it would make his life so much easier: Please come forward, as well. This is still very much a work in progress, I’m using this for ~6 weeks now and thought it is the right time to describe it - both, to myself as well as to the world. I’m open for suggestions on how to improve.  
Thank you for making it all the way through.

#claude_reference
