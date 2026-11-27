import type { Dispatch, SetStateAction } from 'react'
import type { KanbanItem } from '../../stories/types/story.types'

export function useTasks(setItems: Dispatch<SetStateAction<KanbanItem[]>>) {
  const toggleTask = (taskId: number) => {
    setItems((current) =>
      current.map((item) => {
        if (item.type !== 'user-story') return item
        if (!item.tasks.some((task) => task.id === taskId)) return item

        return {
          ...item,
          tasks: item.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          ),
        }
      }),
    )
  }

  return { toggleTask }
}