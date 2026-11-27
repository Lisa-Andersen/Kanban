import '../App.css'
import { KanbanBoard } from '../features/boards/components/KanbanBoard'
import { useBoard } from '../features/boards/hooks/useBoard'
import { StoryFormModal } from '../features/stories/components/StoryFormModal'
import { useStories } from '../features/stories/hooks/useStories'
import { useTasks } from '../features/tasks/hooks/useTasks'

function App() {
  const {
    items,
    setItems,
    loading,
    backendMessage,
    setBackendMessage,
    moveItem,
  } = useBoard()
  const stories = useStories(items, setItems, setBackendMessage)
  const { toggleTask } = useTasks(setItems)

  return (
    <main className="kanban-app">
      <header className="topbar">
        <div>
          <p className="eyebrow">Project workspace</p>
          <h1>Kanban Board</h1>
        </div>
        <div className="header-actions">
          <button className="button secondary" type="button" onClick={() => stories.openForm('bug')}>
            + Ny Bug userstory
          </button>
          <button className="button primary" type="button" onClick={() => stories.openForm('user')}>
            + Ny userstory
          </button>
        </div>
      </header>

      {backendMessage && (
        <div className="notice" role="status">
          {backendMessage}
          <button type="button" aria-label="Luk besked" onClick={() => setBackendMessage(null)}>×</button>
        </div>
      )}

      {loading ? (
        <p className="loading">Indlæser board...</p>
      ) : (
        <KanbanBoard
          items={items}
          onMove={moveItem}
          onEditStory={stories.openEditForm}
          onToggleTask={toggleTask}
        />
      )}

      {stories.form && (
        <StoryFormModal
          form={stories.form}
          draft={stories.draft}
          setDraft={stories.setDraft}
          editingStoryId={stories.editingStoryId}
          items={items}
          onClose={stories.closeForm}
          onSubmit={stories.submitStory}
        />
      )}
    </main>
  )
}

export default App
