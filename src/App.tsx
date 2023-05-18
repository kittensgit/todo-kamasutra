import React, { useState } from 'react';
import './App.css';
import { TasksType, TodoList } from './TodoList';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

  const [tasks, setTasks] = useState<Array<TasksType>>([
    { id: v1(), title: 'css', isDone: true },
    { id: v1(), title: 'js', isDone: true },
    { id: v1(), title: 'react', isDone: false },
  ]
  )

  const [filter, setFilter] = useState<FilterValuesType>('all')


  const removeTask = (taskId: string) => {
    let filteredTasks = tasks.filter(t => t.id !== taskId)
    setTasks(filteredTasks)
  }

  const addTask = (title: string) => {
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  const changeStatus = (taskId: string, isDone: boolean) => {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value)
  }

  let tasksForTodoList = tasks;
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone === true)
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter(t => t.isDone === false)
  }


  return (
    <div className="App">
      <TodoList title='what to learn'
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
