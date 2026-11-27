import { useState, type DragEvent } from 'react'
import type { KanbanItem, UserStory } from '../../stories/types/story.types'
import { StoryCard } from '../../stories/components/StoryCard'
import type { ColumnId } from '../types/board.types'

const columns: { id: ColumnId; title: string }[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'qa-test', title: 'QA Test' },
  { id: 'done', title: 'Done' },
]

interface KanbanBoardProps {
  items: KanbanItem[]
  onMove: (itemId: number, columnId: ColumnId) => void
  onEditStory: (story: UserStory) => void
  onToggleTask: (taskId: number) => void
}

export function KanbanBoard({
  items,
  onMove,
  onEditStory,
  onToggleTask,
}: KanbanBoardProps) {
  const [draggedId, setDraggedId] = useState<number | null>(null)

  const relatedTitle = (storyId: number) =>
    items.find((item) => item.id === storyId)?.title ?? 'Ukendt user story'

  const handleDrop = (event: DragEvent, columnId: ColumnId) => {
    event.preventDefault()
    if (draggedId !== null) onMove(draggedId, columnId)
    setDraggedId(null)
  }

  return (
    <section className="board" aria-label="Kanban board">
      {columns.map((column) => {
        const columnItems = items.filter((item) => item.columnId === column.id)

        return (
          <div
            className="column"
            key={column.id}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, column.id)}
          >
            <div className="column-header">
              <h2>{column.title}</h2>
              <span className="count">{columnItems.length}</span>
            </div>
            <div className="card-list">
              {columnItems.map((item) => (
                <StoryCard
                  item={item}
                  key={item.id}
                  relatedTitle={item.type === 'bug' ? relatedTitle(item.relatedUserStoryId) : undefined}
                  onDragStart={() => setDraggedId(item.id)}
                  onEdit={item.type === 'user-story' ? () => onEditStory(item) : undefined}
                  onToggleTask={onToggleTask}
                />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
