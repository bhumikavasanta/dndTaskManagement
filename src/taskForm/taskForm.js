import React from 'react'
import './taskForm.css'

const taskForm = (props) => {

    const { task, setTask, addNewTask } = props;
    const handleEnterPress = (e) => {
        if(task !== '' && e.keyCode===13) {
          addNewTask();
        }
      };

  return (
    <div>
        <input
            type='text'
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleEnterPress}
          />
          <button onClick={addNewTask} disabled={task === ''} className='btn'>Add Task</button>
    </div>
  )
}

export default taskForm