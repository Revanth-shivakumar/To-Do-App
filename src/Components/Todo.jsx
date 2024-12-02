import React, { useEffect, useRef, useState } from 'react';
import to_do_icon from '../assets/checklist.png';
import TodoCard from './TodoCard';

const Todo = () => {
  const [todoList, setList] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);
  const [showAllTasks, setShowAllTasks] = useState(false); // State to manage toggle between all tasks and incomplete tasks
  const [sortOrder, setSortOrder] = useState('desc'); // State for sorting order: 'desc' or 'asc'
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === '') {
      return null;
    }
    const newCard = {
      id: Date.now(),
      text: inputText,
      Completed: false,
      createdDate: new Date().toISOString(),
    };
    setList((prev) => [...prev, newCard]);
    inputRef.current.value = '';
  };

  const sortByDate = (todoList, order) => {
    return todoList.sort((a, b) => {
      const dateA = new Date(a.createdDate);
      const dateB = new Date(b.createdDate);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  const deleteCard = (id) => {
    setList((prevcards) => {
      return prevcards.filter((card) => card.id !== id);
    });
  };

  const UpdateStatus = (id) => {
    setList((prevcards) => {
      return prevcards.map((card) => {
        if (card.id === id) {
          return { ...card, Completed: !card.Completed };
        }
        return card;
      });
    });
  };

  const toggleShowAllTasks = () => {
    setShowAllTasks((prevState) => !prevState);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevState) => (prevState === 'desc' ? 'asc' : 'desc'));
  };

  const filteredTasks = showAllTasks
    ? todoList
    : todoList.filter((task) => !task.Completed);

  const sortedTasks = sortByDate(filteredTasks, sortOrder);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className='bg-violet-200 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] max-h-[700px] rounded-xl'>
      <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={to_do_icon} alt='' />
        <h1 className='text-3xl font-sans font-bold text-black'>To-Do List</h1>
      </div>

      <div className='flex items-center my-7 bg-violet-50 rounded-full'>
        <input
          ref={inputRef}
          className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
          type='text'
          placeholder='Add your Task'
        />
        <button
          onClick={add}
          className='border-none rounded-full w-32 h-14 bg-violet-950 text-white text-lg font-medium cursor-pointer'
        >
          +
        </button>
      </div>

      {/* Buttons in the same row */}
      <div className='flex items-center justify-between mb-5'>
        <button
          onClick={toggleShowAllTasks}
          className='w-48 py-2 bg-violet-950 text-white rounded-full'
        >
          {showAllTasks ? 'Show Incomplete Tasks' : 'Show All Tasks'}
        </button>
        
        <button
          onClick={toggleSortOrder}
          className='w-48 py-2 bg-violet-950 text-white rounded-full'
        >
          Sort ({sortOrder === 'desc' ? 'Newest First' : 'Oldest First'})
        </button>
      </div>

      {/* Container for task cards with overflow handling */}
      <div className='overflow-y-auto max-h-[calc(100vh-280px)] scrollbar-hide'>
        {sortedTasks.map((card, index) => (
          <TodoCard
            key={index}
            text={card.text}
            id={card.id}
            status={card.Completed}
            deleteCard={deleteCard}
            UpdateStatus={UpdateStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;




