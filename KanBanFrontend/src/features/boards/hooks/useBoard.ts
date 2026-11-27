import { useEffect, useState } from 'react'
import { boardService } from '../services/boardService'
import { initialItems } from '../boardData'
import type { KanbanItem } from '../../stories/types/story.types'
import type { ColumnId } from '../types/board.types'

export function useBoard() {
  const [items, setItems] = useState<KanbanItem[]>(initialItems)
  const [loading, setLoading] = useState(true)
  const [backendMessage, setBackendMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    boardService
      .getItems()
      .then((data) => {
        if (!cancelled && data.length > 0) setItems(data)
      })
      .catch(() => {
        if (!cancelled) {
          setBackendMessage('Backend er endnu ikke tilgængelig. Demo-data vises lokalt.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const moveItem = async (itemId: string, columnId: ColumnId) => {
    const item = items.find((current) => current.id === itemId)
    if (!item || item.columnId === columnId) return

    setItems((current) =>
      current.map((currentItem) =>
        currentItem.id === itemId ? { ...currentItem, columnId } : currentItem,
      ),
    )

    try {
      await boardService.updateColumn(item, columnId)
    } catch {
      setBackendMessage('Kolonnens ændring er gemt lokalt. Backend er ikke tilgængelig.')
    }
  }

  return {
    items,
    setItems,
    loading,
    backendMessage,
    setBackendMessage,
    moveItem,
  }
}
