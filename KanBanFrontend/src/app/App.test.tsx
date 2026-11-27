import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

// Mock the fetch function globally for all tests in this file
describe('Kanban board', () => {

  // Before each test, stub the global fetch function to simulate backend unavailability  
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Backend unavailable')),
    )
  })

  // Cleanup after each test to ensure a clean state for the next test
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  // Test to verify that all board columns and demo stories are displayed correctly
  it('shows all board columns and demo stories', async () => {
    render(<App />)

    expect(await screen.findByText('Backlog')).toBeInTheDocument()
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('QA Test')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
    expect(screen.getByText('Opret en ny bruger')).toBeInTheDocument()
  })

  // Test to verify that a user story can be created locally and displayed on the board
  it('creates a user story locally', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(await screen.findByRole('button', { name: '+ Ny userstory' }))

    const dialog = screen.getByRole('dialog')
    await user.type(within(dialog).getByLabelText('Titel'), 'Betalingsflow')
    await user.type(within(dialog).getByLabelText('Beskrivelse'), 'En bruger kan gennemføre betaling')
    await user.type(within(dialog).getByLabelText('Tasks (én per linje)'), 'Tilføj knap')
    await user.type(within(dialog).getByLabelText('Ansvarlig'), 'Freja')
    await user.clear(within(dialog).getByLabelText('Estimation'))
    await user.type(within(dialog).getByLabelText('Estimation'), '8')
    await user.click(within(dialog).getByRole('button', { name: 'Opret userstory' }))

    expect(await screen.findByText('Betalingsflow')).toBeInTheDocument()
    expect(screen.getByText('Tilføj knap')).toBeInTheDocument()
  })

  // Test to verify that a bug story can be created and linked to a user story
  it('creates a bug story linked to a user story', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(await screen.findByRole('button', { name: '+ Ny Bug userstory' }))

    const dialog = screen.getByRole('dialog')
    await user.type(within(dialog).getByLabelText('Titel'), 'Login fejler')
    await user.type(within(dialog).getByLabelText('Beskrivelse'), 'Login sender en fejl')
    await user.type(within(dialog).getByLabelText('Ansvarlig'), 'Mads')
    await user.click(within(dialog).getByRole('button', { name: 'Opret bug' }))

    expect(await screen.findByText('Login fejler')).toBeInTheDocument()
    expect(screen.getAllByText('Opret en ny bruger').length).toBeGreaterThanOrEqual(2)
  })

  // Test to verify that a task checkbox can be toggled correctly
  it('toggles a task checkbox', async () => {
    const user = userEvent.setup()
    render(<App />)

    const checkbox = await screen.findByRole('checkbox', { name: 'Tilføj validering' })
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  // Test to verify that an existing user story can be edited and updated correctly
  it('edits an existing user story', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(await screen.findByRole('button', { name: 'Rediger Opret en ny bruger' }))

    const dialog = screen.getByRole('dialog')
    const title = within(dialog).getByLabelText('Titel')
    await user.clear(title)
    await user.type(title, 'Brugeroprettelse opdateret')
    await user.click(within(dialog).getByRole('button', { name: 'Gem ændringer' }))

    expect(await screen.findByText('Brugeroprettelse opdateret')).toBeInTheDocument()
  })

  // Test to verify that duplicate task keys are not created when a task title is repeated
  it('does not create duplicate task keys when a task title is repeated', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(await screen.findByRole('button', { name: '+ Ny userstory' }))
    const dialog = screen.getByRole('dialog')

    await user.type(within(dialog).getByLabelText('Titel'), 'Story med gentagelse')
    await user.type(within(dialog).getByLabelText('Beskrivelse'), 'Beskrivelse')
    await user.type(within(dialog).getByLabelText('Tasks (én per linje)'), 'Samme task\nSamme task')
    await user.type(within(dialog).getByLabelText('Ansvarlig'), 'Anna')
    await user.click(within(dialog).getByRole('button', { name: 'Opret userstory' }))

    expect(await screen.findAllByText('Samme task')).toHaveLength(1)
  })
})