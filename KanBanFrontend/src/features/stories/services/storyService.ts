import { api } from '../../../services/api'
import type { BugUserStory, KanbanItem, UserStory } from '../types/story.types'

const USER_STORIES_PATH = '/api/userstories'
const BUG_USER_STORIES_PATH = '/api/buguserstories'

export const storyService = {
  async createUserStory(story: Omit<UserStory, 'id' | 'type'>): Promise<UserStory> {
    return api.post<UserStory>(USER_STORIES_PATH, story)
  },

  async createBugStory(story: Omit<BugUserStory, 'id' | 'type'>): Promise<BugUserStory> {
    return api.post<BugUserStory>(BUG_USER_STORIES_PATH, story)
  },

  async updateUserStory(story: UserStory): Promise<UserStory> {
    return api.put<UserStory>(`${USER_STORIES_PATH}/${story.id}`, story)
  },

  async deleteItem(item: KanbanItem): Promise<void> {
    const path =
      item.type === 'bug'
        ? `${BUG_USER_STORIES_PATH}/${item.id}`
        : `${USER_STORIES_PATH}/${item.id}`

    return api.delete(path)
  },
}
