import { useState } from 'react'

function TaskForm({ title, onAddTask }) {
  const [task, setTask] = useState('')
  const [priority, setPriority] = useState('Medium')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTask = task.trim()

    if (!trimmedTask) {
      return
    }

    onAddTask({
      id: Date.now(),
      title: trimmedTask,
      priority: priority,
      completed: false,
    })

    setTask('')
    setPriority('Medium')
  }

  return (
    <section className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title h4 mb-4">{title}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="taskInput" className="form-label">
              Task
            </label>

            <input
              id="taskInput"
              type="text"
              className="form-control"
              placeholder="Enter task..."
              value={task}
              onChange={(event) => setTask(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="prioritySelect" className="form-label">
              Priority
            </label>

            <select
              id="prioritySelect"
              className="form-select"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>
      </div>
    </section>
  )
}

export default TaskForm