import type { Task } from '../types/task.type'

export const createTaskId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? `task-${crypto.randomUUID()}`
    : `task-${Date.now()}-${Math.random().toString(36).slice(2)}`

export const uniqueTaskTitles = (tasks: string) =>
  [...new Set(tasks.split('\n').map((task) => task.trim()).filter(Boolean))]

export const createTasks = (titles: string, existingTasks: Task[] = []): Task[] =>
  uniqueTaskTitles(titles).map((title) =>
    existingTasks.find((task) => task.title === title) ?? {
      id: createTaskId(),
      title,
      completed: false,
    },
  )
