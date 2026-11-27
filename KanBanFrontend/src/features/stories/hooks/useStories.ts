import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react'
import { storyService } from '../services/storyService'
import type { BugUserStory, KanbanItem, UserStory } from '../types/story.types'
import type { StoryDraft, StoryForm } from '../types/storyForm.types'
import { createTasks } from '../../tasks/utils/taskUtils'

const emptyDraft: StoryDraft = {
  title: '',
  description: '',
  assignee: '',
  estimation: 1,
  tasks: '',
  relatedUserStoryId: '',
  columnId: 'backlog',
}

export function useStories(
  items: KanbanItem[],
  setItems: Dispatch<SetStateAction<KanbanItem[]>>,
  setBackendMessage: (message: string) => void,
) {
  const [form, setForm] = useState<StoryForm>(null)
  const [draft, setDraft] = useState<StoryDraft>(emptyDraft)
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null)

  const openForm = (type: Exclude<StoryForm, null>) => {
    setDraft({
      ...emptyDraft,
      relatedUserStoryId:
        type === 'bug'
          ? items.find((item) => item.type === 'user-story')?.id ?? ''
          : '',
    })
    setForm(type)
  }

  const closeForm = () => {
    setForm(null)
    setEditingStoryId(null)
    setDraft(emptyDraft)
  }

  const openEditForm = (story: UserStory) => {
    setEditingStoryId(story.id)
    setForm('user')
    setDraft({
      title: story.title,
      description: story.description,
      assignee: story.assignee,
      estimation: story.estimation,
      tasks: story.tasks.map((task) => task.title).join('\n'),
      relatedUserStoryId: '',
      columnId: story.columnId,
    })
  }

  const submitStory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!draft.title.trim() || !draft.description.trim() || !draft.assignee.trim()) return

    try {
      if (form === 'user') {
        const story: Omit<UserStory, 'id' | 'type'> = {
          title: draft.title.trim(),
          description: draft.description.trim(),
          assignee: draft.assignee.trim(),
          estimation: draft.estimation,
          tasks: createTasks(draft.tasks),
          columnId: draft.columnId,
        }
        if (editingStoryId) {
          const existing = items.find(
            (item): item is UserStory =>
              item.id === editingStoryId && item.type === 'user-story',
          )
          if (existing) {
            const updated: UserStory = {
              ...existing,
              ...story,
              tasks: createTasks(draft.tasks, existing.tasks),
            }
            const saved = await storyService.updateUserStory(updated)
            setItems((current) =>
              current.map((item) => item.id === editingStoryId ? saved : item),
            )
            closeForm()
            return
          }
        }
        const created = await storyService.createUserStory(story)
        setItems((current) => [...current, created])
      } else if (form === 'bug') {
        const bug: Omit<BugUserStory, 'id' | 'type'> = {
          title: draft.title.trim(),
          description: draft.description.trim(),
          assignee: draft.assignee.trim(),
          estimation: draft.estimation,
          relatedUserStoryId: draft.relatedUserStoryId,
          columnId: draft.columnId,
        }
        const created = await storyService.createBugStory(bug)
        setItems((current) => [...current, created])
      }
      closeForm()
    } catch {
      if (form === 'user' && editingStoryId) {
        setItems((current) =>
          current.map((item) => {
            if (item.id !== editingStoryId || item.type !== 'user-story') return item

            return {
              ...item,
              title: draft.title.trim(),
              description: draft.description.trim(),
              assignee: draft.assignee.trim(),
              estimation: draft.estimation,
              columnId: draft.columnId,
              tasks: createTasks(draft.tasks, item.tasks),
            }
          }),
        )
        setBackendMessage('Ændringen blev gemt lokalt, fordi backend endnu ikke er tilgængelig.')
        closeForm()
        return
      }

      const localId = `${form}-${Date.now()}`

      if (form === 'user') {
        const story: UserStory = {
          id: localId,
          type: 'user-story',
          title: draft.title.trim(),
          description: draft.description.trim(),
          assignee: draft.assignee.trim(),
          estimation: draft.estimation,
          tasks: createTasks(draft.tasks),
          columnId: draft.columnId,
        }
        setItems((current) => [...current, story])
      } else if (form === 'bug') {
        const bug: BugUserStory = {
          id: localId,
          type: 'bug',
          title: draft.title.trim(),
          description: draft.description.trim(),
          assignee: draft.assignee.trim(),
          estimation: draft.estimation,
          relatedUserStoryId: draft.relatedUserStoryId,
          columnId: draft.columnId,
        }
        setItems((current) => [...current, bug])
      }

      setBackendMessage('Kortet blev gemt lokalt, fordi backend endnu ikke er tilgængelig.')
      closeForm()
    }
  }

  return {
    form,
    draft,
    setDraft,
    editingStoryId,
    openForm,
    closeForm,
    openEditForm,
    submitStory,
  }
}