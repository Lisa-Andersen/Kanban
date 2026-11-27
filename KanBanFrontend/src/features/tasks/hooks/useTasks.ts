import type { Dispatch, SetStateAction } from 'react'
import type { KanbanItem } from '../../stories/types/story.types'

export function useTasks(setItems: Dispatch<SetStateAction<KanbanItem[]>>) {
  const toggleTask = (storyId: string, taskId: string) => {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== storyId || item.type !== 'user-story') return item
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