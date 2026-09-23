import { useState } from 'react'
import TaskItem from './TaskItem'

function TaskList({
  tasks,
  onCompleteTask,
  onDeleteTask,
  onEditTask,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Completed' && task.completed) ||
      (statusFilter === 'Pending' && !task.completed)

    const matchesPriority =
      priorityFilter === 'All' ||
      task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <section>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <h2 className="h4 mb-0">Your Tasks</h2>

        <span className="badge text-bg-dark align-self-start align-self-md-center">
          {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
        </span>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-5">
              <label htmlFor="searchInput" className="form-label">
                Search
              </label>

              <input
                id="searchInput"
                type="text"
                className="form-control"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>

            <div className="col-12 col-md-3">
              <label htmlFor="statusFilter" className="form-label">
                Status
              </label>

              <select
                id="statusFilter"
                className="form-select"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label
                htmlFor="priorityFilter"
                className="form-label"
              >
                Priority
              </label>

              <select
                id="priorityFilter"
                className="form-select"
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value)
                }
              >
                <option value="All">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="alert alert-info">
          No tasks yet. Add your first task above.
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="alert alert-warning">
          No tasks match your search or filters.
        </div>
      ) : (
        <div className="list-group">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onCompleteTask={onCompleteTask}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default TaskList