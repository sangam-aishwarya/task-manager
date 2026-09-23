import { useEffect, useState } from 'react'
import Header from './Header'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks')

      return savedTasks ? JSON.parse(savedTasks) : []
    } catch (error) {
      console.error('Unable to load tasks:', error)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function handleAddTask(newTask) {
    setTasks((currentTasks) => [...currentTasks, newTask])
  }

  function handleCompleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    )
  }

  function handleDeleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  function handleEditTask(taskId, updatedTitle, updatedPriority) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: updatedTitle,
              priority: updatedPriority,
            }
          : task,
      ),
    )
  }

  return (
    <div className="min-vh-100 bg-light">
      <Header />

      <main className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9 col-xl-8">
            <TaskForm
              title="Add a New Task"
              onAddTask={handleAddTask}
            />

            <TaskList
              tasks={tasks}
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App