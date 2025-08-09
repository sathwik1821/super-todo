import React, { useState } from 'react';
import { Trash,SquarePen,ChevronDown,ChevronUp } from 'lucide-react';

const TodoItem = ({ item, index, todosCount, handleTodoComplete, handleDelete, handleEditTodo, handleOnMoveUp, handleOnMoveDown }) => {
  const [editTodo, setEditTodo] = useState(false);

  const handleFormEditSubmit = (e) => {
    e.preventDefault();
    const updatedText = e.target.todo.value;
    handleEditTodo(item.id, updatedText);
    setEditTodo(false);
  };

  if (editTodo) {
    return (
      <div className="flex flex-col gap-3 border border-secondary p-4 rounded-lg bg-zinc-800">
        <form onSubmit={handleFormEditSubmit} className="flex gap-3">
          <input
            type="text"
            name="todo"
            defaultValue={item.text}
            className="flex-1 bg-black text-white px-4 py-2 rounded border border-secondary focus:outline-none"
          />
          <button type="submit" className="bg-accent text-black px-4 py-2 rounded hover:bg-accent-light transition cursor-pointer">
            Update
          </button>
        </form>
        <button
          type="button"
          onClick={() => setEditTodo(false)}
          className="text-sm underline self-end hover:text-red-500"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between border-t border-secondary pt-4 pb-2 px-2 rounded-md bg-black text-white hover:bg-zinc-900 transition group w-100">

      <div className="flex flex-col gap-1 text-xl">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => handleOnMoveUp(index)}
          className="disabled:opacity-30 p-2 cursor-pointer"
        >
          <ChevronUp />
        </button>
        <button
          type="button"
          disabled={index === todosCount - 1}
          onClick={() => handleOnMoveDown(index)}
          className="disabled:opacity-30 p-2 cursor-pointer"
        >
          <ChevronDown />
        </button>
      </div>

      <div className="flex-1 flex items-center gap-3 ml-2">
        <input
          type="checkbox"
          name="complete"
          id={item.id}
          checked={item.completed}
          onChange={(e) => handleTodoComplete(item.id, e.target.checked)}
          className="w-5 h-5 accent-accent cursor-pointer"
        />
        <label
          htmlFor={item.id}
          className={`text-lg font-medium ${item.completed ? 'line-through text-secondary' : ''}`}
        >
          {item.text}
        </label>
      </div>

      <div className="hidden group-hover:flex gap-2 text-sm">
        <button
          type="button"
          onClick={() => setEditTodo(true)}
          className="px-2 py-1 border border-yellow-300 rounded transition-colors duration-200 ease-in-out hover:bg-yellow-300 hover:text-black focus:outline-none cursor-pointer"
        >
          <SquarePen />
        </button>
        <button
          type="button"
          onClick={() => handleDelete(item.id)}
          className="px-2 py-1 border border-yellow-300 rounded transition-colors duration-200 ease-in-out hover:bg-red-700 hover:text-black focus:outline-none cursor-pointer"
        >
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
