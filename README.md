# Day one Brainstorm

## TechStack
Frontend: TypeScript, React
Backend: AspNet Core Webservice C\#
Database: MsSql
DevOps: Git, GitHub Actions

## Roller
Vi ser rollerne primært som ansvarsområder, der kommer til at være overlap
Michael: Frontend udvikler
Mathias: Backend udvikler
Lisa: Scrum Master, DevOps, (Bistår Tobias) Business Logic


## Tanker om koncepter:
I vores kanban board har vi følgende koncepter:
States i Kanban boarded:
	Backlog, ToDo, InProgress, QA Testes, Done

Feature: 
 - Id 
 - Titel
 - Beskrivelse
 - referencer til userstories

UserStory/Bug/Doc:
 - Id 
 - Titel
 - Beskrivelse
 - Ansvarlig
 - Type (bug, doc, etc)
 - ref til feature
 - mulig ref til multiple bugs 
 - mulig refercer til andre user stories som skal løses først
 - En mængde af tasks
 - Evt Sprint hvor User storien blev færdig

Task:
 - Navn 
 - Status (todo/done)

*NB!* Noget der meget tidligt er gået op for os er at disse koncepter afhænger af hvilket lag i koden man anskuer dem fra. Business logic skal kun sende den data som frontEnd beder om, mens koncepterne i databasen repræsentere data anderledes.


## Features & User stories

### Initial Setup
| User Story 					| Ansvarlig | 
| ---------- 					| --------- |
| Setup Git Repo			    | Lisa      |
| Create initial Workflow	    | Lisa      |
| Setup Backend Solution		| Tobias    |
| Setup Backend Test Env		| Tobias	|
| Setup MsSQL DB				| Tobias	|
| Setup Frontend Env			| Michael	|
| Setup Frontend Test Env		| Michael	|

### Minimum Runnable Solution
| User Story 					| Ansvarlig |
| ---------- 					| --------- |
| Create Kanban board		    | Michael   |
| Define User stories, Bugs, Features Frontend	| Michael	|
| Lav modeller for Features, UserStories, Bugs, tasks | Lisa	|
| Setup tabeller for Features, UserStories, Bugs, tasks | Tobias 	|

### AI and development Setup
| User Story 					| Ansvarlig |
| ---------- 					| --------- |
| Lav Agent Instructions		| Lisa		|
| Lav Frontend Instructions		| Michael	|
| Lav Backend Instructions		| Lisa		|
| Lav Run scripts				| Lisa		|

### Create/Update A User story
Creating a user story, a feature and the tasks
| User Story 					| Ansvarlig |
| ---------- 					| --------- |
| Create User story Frontend	| Michael   |
| Update User Story Frontend	| Michael	|
| Create Tasks Frontend			| Michael   |
| Update Tasks Story Frontend	| Michael	|
| Drag User Story Frontend		| Michael	|
| Validate User Story On Update Backend	| Tobias	|
| Validate and Add to table 	| Tobias 	|

### Request a user story
| User Story 					| Ansvarlig |
| ---------- 					| --------- |
| Frontend						| Michael	|
| Backend						| Tobias	|

### Delete a User story
| User Story 					| Ansvarlig |
| ---------- 					| --------- |
| Frontend						| Michael	|
| Backend						| Tobias	|

### Feature CRUD
| User Story 					| Ansvarlig |
| ---------- 					| --------- |
| Frontend						| Michael	|
| Backend						| Tobias	|
