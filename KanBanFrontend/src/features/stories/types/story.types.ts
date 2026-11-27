import type { ColumnId } from '../../boards/types/board.types'
import type { Task } from '../../tasks/types/task.type'

export interface UserStory {
  id: number
  type: 'user-story'
  title: string
  description: string
  tasks: Task[]
  assignee: string
  estimation: number
  columnId: ColumnId
}

export interface BugUserStory {
  id: number
  type: 'bug'
  title: string
  description: string
  assignee: string
  estimation: number
  relatedUserStoryId: number
  columnId: ColumnId
}

export type KanbanItem = UserStory | BugUserStory