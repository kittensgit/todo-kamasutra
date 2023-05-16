import React, { useState } from 'react';
import './App.css';
import { TasksType, TodoList } from './TodoList';

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

  const [tasks, setTasks] = useState<Array<TasksType>>([
    { id: 1, title: 'css', isDone: true },
    { id: 2, title: 'js', isDone: true },
    { id: 3, title: 'react', isDone: false },
  ]
  )

  const [filter, setFilter] = useState<FilterValuesType>('all')


  const removeTask = (taskId: number) => {
    let filteredTasks = tasks.filter(t => t.id !== taskId)
    setTasks(filteredTasks)
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
      />
    </div>
  );
}

export default App;
