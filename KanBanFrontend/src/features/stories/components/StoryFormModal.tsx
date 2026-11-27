import type { Dispatch, FormEvent, SetStateAction } from 'react'
import type { KanbanItem } from '../types/story.types'
import type { StoryDraft, StoryForm } from '../types/storyForm.types'
import type { ColumnId } from '../../boards/types/board.types'

interface StoryFormModalProps {
  form: Exclude<StoryForm, null>
  draft: StoryDraft
  setDraft: Dispatch<SetStateAction<StoryDraft>>
  editingStoryId: number | null
  items: KanbanItem[]
  onClose: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const columns: { id: ColumnId; title: string }[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'qa-test', title: 'QA Test' },
  { id: 'done', title: 'Done' },
]

export function StoryFormModal({
  form,
  draft,
  setDraft,
  editingStoryId,
  items,
  onClose,
  onSubmit,
}: StoryFormModalProps) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">{form === 'bug' ? 'Bug registrering' : editingStoryId ? 'Rediger opgave' : 'Ny opgave'}</p>
            <h2 id="form-title">{form === 'bug' ? 'Ny Bug userstory' : editingStoryId ? 'Rediger userstory' : 'Ny userstory'}</h2>
          </div>
          <button className="close-button" type="button" aria-label="Luk" onClick={onClose}>×</button>
        </div>

        <form onSubmit={onSubmit}>
          <label>
            Titel
            <input required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Skriv en kort titel" />
          </label>
          <label>
            Beskrivelse
            <textarea required rows={3} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="Beskriv userstoryen" />
          </label>

          {form === 'user' && (
            <label>
              Tasks (én per linje)
              <textarea rows={4} value={draft.tasks} onChange={(event) => setDraft({ ...draft, tasks: event.target.value })} placeholder={'Lav komponent\nTilføj tests'} />
            </label>
          )}

          {form === 'bug' && (
            <label>
              Relateret userstory
              <select
                required
                value={draft.relatedUserStoryId ?? ''}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    relatedUserStoryId: event.target.value ? Number(event.target.value) : null,
                  })
                }
              >
                {items.filter((item) => item.type === 'user-story').map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            </label>
          )}

          <div className="form-row">
            <label>
              Ansvarlig
              <input required value={draft.assignee} onChange={(event) => setDraft({ ...draft, assignee: event.target.value })} placeholder="Navn" />
            </label>
            <label>
              Estimation
              <input required type="number" min="1" value={draft.estimation} onChange={(event) => setDraft({ ...draft, estimation: Number(event.target.value) })} />
            </label>
          </div>

          <label>
            Kolonne
            <select value={draft.columnId} onChange={(event) => setDraft({ ...draft, columnId: event.target.value as ColumnId })}>
              {columns.map((column) => (
                <option key={column.id} value={column.id}>{column.title}</option>
              ))}
            </select>
          </label>

          <div className="modal-actions">
            <button className="button ghost" type="button" onClick={onClose}>Annuller</button>
            <button className="button primary" type="submit">
              {form === 'bug' ? 'Opret bug' : editingStoryId ? 'Gem ændringer' : 'Opret userstory'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
