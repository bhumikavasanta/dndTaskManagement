import { useState } from 'react'
import './App.css'
import TodoBoard from './taskList/todoBoard';
import TaskForm from './taskForm/taskForm';

function App() {

  const [data, setData] = useState([
    { title: 'Added', tasks: ['Shopping', 'Bill payments'] },
    { title: 'Started', tasks: ['Create Web App'] },
    { title: 'Compeleted', tasks: ['Job Applications', 'Pay Rent'] }
  ]);
  const [task, setTask] = useState('');

  const addNewTask = () => {
    console.log("Func");
    const updatedData = data.map((category) => {
      if (category.title === 'Added') {
        return {
          ...category,
          tasks: [...category.tasks, task]
        };
      }
      return category;
    });
    setData(updatedData);
  };

  return (
    <div className='App'>
      <header>
        <div>
          <h3 className='header-title'>Task Management</h3>
        </div>
        <div className='add-task'>
          <TaskForm
            task={task}
            setTask={setTask}
            addNewTask={addNewTask}
          />
        </div>
      </header>
      <div className='todo-wrap'>
        <TodoBoard data={data} />
      </div>
    </div>
  )
}

export default App