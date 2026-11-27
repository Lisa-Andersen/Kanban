import type { Task } from '../types/task.type'

let nextTemporaryTaskId = -1

export const createTaskId = () => nextTemporaryTaskId--

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
