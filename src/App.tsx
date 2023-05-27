import React, { useState } from 'react';
import './App.css';
import { TasksType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = 'all' | 'completed' | 'active';
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TasksType>
}

function App() {

  const removeTask = (taskId: string, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(t => t.id !== taskId)
    tasksObj[todolistId] = filteredTasks
    setTasks({ ...tasksObj })
  }

  const addTask = (title: string, todolistId: string) => {
    let task = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj })
  }

  const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj })
    }
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj })
    } 
  }

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists]);
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'what to learn', filter: 'all' },
    { id: todolistId2, title: 'what to buy', filter: 'all' },
  ])

  const removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId]
    setTasks({ ...tasksObj })
  }

  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: 'css', isDone: true },
      { id: v1(), title: 'js', isDone: true },
      { id: v1(), title: 'react', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'milk', isDone: true },
      { id: v1(), title: 'water', isDone: false },
      { id: v1(), title: 'book', isDone: false },
    ]
  })

  function addTodoList(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodolists([todolist, ...todolists])
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {
        todolists.map((tl) => {

          let tasksForTodoList = tasksObj[tl.id];
          if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
          }
          if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
          }

          return <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            removeTodolist={removeTodolist}
            filter={tl.filter}
          />
        })
      }
    </div>
  );
}

export default App;
