import React from 'react';
import './App.css';
import { TasksType, TodoList } from './TodoList';

function App() {

  let tasks1: Array<TasksType> = [
    { id: 1, title: 'css', isDone: true },
    { id: 2, title: 'js', isDone: true },
    { id: 3, title: 'react', isDone: false },
  ]

  let tasks2: Array<TasksType> = [
    { id: 1, title: 'matrix', isDone: true },
    { id: 2, title: 'prestige', isDone: true },
    { id: 3, title: 'leon', isDone: true },
  ]

  return (
    <div className="App">
      <TodoList title='what to learn' tasks={tasks1} />
      <TodoList title='Movies' tasks={tasks2} />
    </div>
  );
}

export default App;
