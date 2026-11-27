import type { KanbanItem } from '../stories/types/story.types'

export const initialItems: KanbanItem[] = [
  {
    id: 'story-1',
    type: 'user-story',
    title: 'Opret en ny bruger',
    description: 'Som bruger vil jeg oprette en konto, så jeg kan gemme mine boards.',
    tasks: [
      { id: 'task-1', title: 'Lav oprettelsesformular', completed: true },
      { id: 'task-2', title: 'Tilføj validering', completed: false },
      { id: 'task-3', title: 'Forbind formularen til API', completed: false },
    ],
    assignee: 'Anna',
    estimation: 5,
    columnId: 'backlog',
  },
  {
    id: 'story-2',
    type: 'user-story',
    title: 'Filtrer kanban-kort',
    description: 'Som bruger vil jeg filtrere kort, så jeg hurtigt kan finde opgaver.',
    tasks: [
      { id: 'task-4', title: 'Tilføj søgefelt', completed: true },
      { id: 'task-5', title: 'Implementer filterlogik', completed: false },
    ],
    assignee: 'Mikkel',
    estimation: 3,
    columnId: 'in-progress',
  },
  {
    id: 'bug-1',
    type: 'bug',
    title: 'Kort forsvinder efter refresh',
    description: 'Et flyttet kort vender tilbage til sin gamle kolonne efter genindlæsning.',
    assignee: 'Sara',
    estimation: 2,
    relatedUserStoryId: 'story-2',
    columnId: 'qa-test',
  },
]
