import type { ColumnId } from '../../boards/types/board.types'

export type StoryForm = 'user' | 'bug' | null

export interface StoryDraft {
  title: string
  description: string
  assignee: string
  estimation: number
  tasks: string
  relatedUserStoryId: number | null
  columnId: ColumnId
}
