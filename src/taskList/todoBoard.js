import React, { useState, useRef, useEffect } from 'react';
import './todoBoard.css';

const TodoBoard = (props) => {
  const { data } = props;
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const [dragEnter, setDragEnter] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    setList(data);
  },[data]);

  const handleDragStart = (e, params) => {
    itemRef.current = params;
    setTimeout(() => {
      setDragging(true);
    }, 0);
    e.target.addEventListener('dragend', handleDragEnd);
  };

  const handleDragEnter = (params) => {
    const draged = itemRef.current;
    const newList = [...list];

    newList[params.catId].tasks.splice(params.taskId, 0, newList[draged.catId].tasks.splice(draged.taskId, 1));
    itemRef.current = params;

    setDragEnter(true);
    setList(newList);
  };

  const handleDragEnd = () => {
    itemRef.current = null;
    setDragging(false);
    setDragEnter(false);
  };

  const handleStyle = (params) => {
    const draged = itemRef.current;
    if (draged.catId === params.catId && draged.taskId === params.taskId) {
      return 'drag-bg tasks';
    } else {
      return 'tasks';
    }
  };

  return (
    <div className='board-wrap'>
      {list.map((cat, catId) => (
        <div
          className='category-div'
          key={catId}
          onDragEnter={!cat.tasks.length ? () => handleDragEnter({ catId, taskId: 0 }) : null}
        >
          <div className='category'>
            <div className='category-card-wrap'>
              <div className='category-card-title'>
                {cat.title}
              </div>
              <div className='tasks-wrap'>
                {cat.tasks.map((task, taskId) => (
                  <div
                    key={taskId}
                    draggable
                    className={dragging && dragEnter ? handleStyle({ catId, taskId }) : 'tasks'}
                    onDragStart={(e) => handleDragStart(e, { catId, taskId })}
                    onDragEnter={() => handleDragEnter({ catId, taskId })}
                  >
                    {task}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoBoard;
