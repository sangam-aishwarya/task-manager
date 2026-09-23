import { useState } from 'react'

function TaskItem({
  task,
  onCompleteTask,
  onDeleteTask,
  onEditTask,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editPriority, setEditPriority] = useState(task.priority)

  function handleEditStart() {
    setEditTitle(task.title)
    setEditPriority(task.priority)
    setIsEditing(true)
  }

  function handleEditCancel() {
    setEditTitle(task.title)
    setEditPriority(task.priority)
    setIsEditing(false)
  }

  function handleEditSave() {
    const trimmedTitle = editTitle.trim()

    if (!trimmedTitle) {
      return
    }

    onEditTask(task.id, trimmedTitle, editPriority)
    setIsEditing(false)
  }

  return (
    <div className="list-group-item">
      {isEditing ? (
        <div>
          <div className="mb-3">
            <label
              htmlFor={`edit-title-${task.id}`}
              className="form-label"
            >
              Task
            </label>

            <input
              id={`edit-title-${task.id}`}
              type="text"
              className="form-control"
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor={`edit-priority-${task.id}`}
              className="form-label"
            >
              Priority
            </label>

            <select
              id={`edit-priority-${task.id}`}
              className="form-select"
              value={editPriority}
              onChange={(event) =>
                setEditPriority(event.target.value)
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleEditSave}
            >
              Save
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleEditCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
          <div>
            <h5
              className={
                task.completed
                  ? 'text-decoration-line-through mb-2'
                  : 'mb-2'
              }
            >
              {task.title}
            </h5>

            <span className="badge text-bg-secondary me-2">
              {task.priority}
            </span>

            <span
              className={
                task.completed
                  ? 'badge text-bg-success'
                  : 'badge text-bg-warning'
              }
            >
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>

          <div className="d-flex flex-wrap gap-2 align-items-start">
            <button
              type="button"
              className={
                task.completed
                  ? 'btn btn-outline-warning btn-sm'
                  : 'btn btn-success btn-sm'
              }
              onClick={() => onCompleteTask(task.id)}
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>

            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={handleEditStart}
            >
              Edit
            </button>

            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskItem