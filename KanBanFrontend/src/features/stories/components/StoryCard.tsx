import type { KanbanItem, UserStory } from '../types/story.types'
import { TaskList } from '../../tasks/components/TaskList'

interface StoryCardProps {
  item: KanbanItem
  relatedTitle?: string
  onDragStart: () => void
  onEdit?: (story: UserStory) => void
  onToggleTask: (storyId: string, taskId: string) => void
}

export function StoryCard({
  item,
  relatedTitle,
  onDragStart,
  onEdit,
  onToggleTask,
}: StoryCardProps) {
  return (
    <article
      className={`card ${item.type === 'bug' ? 'bug-card' : ''}`}
      draggable
      onDragStart={onDragStart}
    >
      <div className="card-heading">
        <span className={`badge ${item.type}`}>
          {item.type === 'bug' ? 'BUG' : 'STORY'}
        </span>
        <div className="card-heading-actions">
          {item.type === 'user-story' && onEdit && (
            <button
              className="edit-button"
              type="button"
              aria-label={`Rediger ${item.title}`}
              onClick={() => onEdit(item)}
              draggable={false}
            >
              Rediger
            </button>
          )}
        </div>
      </div>
      <h3>{item.title}</h3>
      <p className="description">{item.description}</p>

      {item.type === 'user-story' && item.tasks.length > 0 && (
        <TaskList
          tasks={item.tasks}
          onToggle={(taskId) => onToggleTask(item.id, taskId)}
        />
      )}

      {item.type === 'bug' && (
        <p className="relation">
          <span>Refererer til</span>
          {relatedTitle}
        </p>
      )}

      <div className="card-footer">
        <div className="assignee">
          <span className="avatar">{item.assignee.charAt(0).toUpperCase()}</span>
          <span>{item.assignee}</span>
        </div>
        <span className="estimate">{item.estimation} p</span>
      </div>
    </article>
  )
}
