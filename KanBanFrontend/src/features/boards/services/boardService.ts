import { api } from '../../../services/api'
import type { BugUserStory, KanbanItem, UserStory } from '../../stories/types/story.types'
import type { ColumnId } from '../types/board.types'

const USER_STORIES_PATH = '/api/userstories'
const BUG_USER_STORIES_PATH = '/api/buguserstories'

export const boardService = {
  async getItems(): Promise<KanbanItem[]> {
    const [userStories, bugs] = await Promise.all([
      api.get<UserStory[]>(USER_STORIES_PATH),
      api.get<BugUserStory[]>(BUG_USER_STORIES_PATH),
    ])

    return [...userStories, ...bugs]
  },

  async updateColumn(item: KanbanItem, columnId: ColumnId): Promise<KanbanItem> {
    const path =
      item.type === 'bug'
        ? `${BUG_USER_STORIES_PATH}/${item.id}`
        : `${USER_STORIES_PATH}/${item.id}`

    return api.patch<KanbanItem>(path, { columnId })
  },
}
