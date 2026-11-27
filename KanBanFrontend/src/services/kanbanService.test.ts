import { afterEach, describe, expect, it, vi } from 'vitest'
import { kanbanService } from './kanbanService'

// Cleanup after each test to ensure a clean state for the next test
afterEach(() => {
  // Restore all mocks to their original implementations after each test
  vi.restoreAllMocks()
})

// Test suite for the kanbanService module
describe('kanbanService', () => {

  // Test to verify that user stories and bug stories are loaded correctly
  it('loads user stories and bug stories', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify([{ id: '1', type: 'user-story' }]), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify([{ id: '2', type: 'bug' }]), { status: 200 }))

    const items = await kanbanService.getItems()

    expect(items).toHaveLength(2)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  // Test to verify that a user story can be created with a POST request
  it('creates a user story with POST', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ id: 'story-1', type: 'user-story' }), { status: 201 }),
    )

    await kanbanService.createUserStory({
      title: 'Ny story',
      description: 'Beskrivelse',
      assignee: 'Anna',
      estimation: 3,
      tasks: [],
      columnId: 'backlog',
    })

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/userstories',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  // Test to verify that a bug story can be created with a POST request
  it('updates a card column with PATCH', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ id: '1', columnId: 'done' }), { status: 200 }),
    )

    await kanbanService.updateColumn(
      {
        id: '1',
        type: 'user-story',
        title: 'Story',
        description: 'Beskrivelse',
        assignee: 'Anna',
        estimation: 2,
        tasks: [],
        columnId: 'backlog',
      },
      'done',
    )

    expect(fetch).toHaveBeenCalledWith(
      '/api/userstories/1',
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ columnId: 'done' }),
      }),
    )
  })

  // Test to verify that a user story can be updated with a PUT request
  it('updates a user story with PUT', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ id: '1', title: 'Opdateret story' }), { status: 200 }),
    )

    await kanbanService.updateUserStory({
      id: '1',
      type: 'user-story',
      title: 'Opdateret story',
      description: 'Beskrivelse',
      assignee: 'Anna',
      estimation: 5,
      tasks: [],
      columnId: 'todo',
    })

    expect(fetch).toHaveBeenCalledWith(
      '/api/userstories/1',
      expect.objectContaining({
        method: 'PUT',
      }),
    )
  })
})
