import type { Task } from '../types/task.type'

interface TaskListProps {
  tasks: Task[]
  onToggle: (taskId: string) => void
}

export function TaskList({ tasks, onToggle }: TaskListProps) {
  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <li key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <span className={task.completed ? 'completed' : ''}>{task.title}</span>
          </label>
        </li>
      ))}
    </ul>
  )
}
