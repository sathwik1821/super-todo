import React from 'react'
import {useState} from 'react'
import TodoItem from './TodoItem';
import { Plus } from 'lucide-react';
import { Trash } from 'lucide-react';
import { Rabbit } from 'lucide-react';


const TodoPage = () => {

  const [todos,setTodos]=useState([]);

  function handleOnSubmit(e){
    e.preventDefault();

    const todoText=e.target['todo'].value;

    const newTodos=[...todos,{
      text:todoText,
      id:crypto.randomUUID(),
      completed:false,
    }];

    setTodos(newTodos);

    e.target.reset();
  }

  function handleTodoComplete(id,checked){
    const newTodos=todos.map((item)=>{
      if(item.id==id){
        return {...item,completed:checked}
      }
      return item;
    })
    
    setTodos(newTodos)
  }

  function handleDelete(id){
    const newTodos = todos.filter((item) => item.id !== id);


    setTodos(newTodos)
  }

  function handleDeleteAll(){
    setTodos([])
  }


  function compareFunction(a, b) {
    return a.text.localeCompare(b.text);
  }


  function handleSortTodos(){
    const newTodos=[...todos];
    newTodos.sort(compareFunction);
    setTodos(newTodos);
  }


  function handleEditTodo(id,todoText){
    const newTodos=todos.map((item)=>{
      if(item.id==id)
      {
        return {...item,text:todoText}
      }
      return item
    })

    setTodos(newTodos)


  }
  

  function handleOnMoveUp(index){
    const newTodos=[...todos];
    [newTodos[index],newTodos[index-1]]=[newTodos[index-1],newTodos[index]];

    setTodos(newTodos);
  }

  function handleOnMoveDown(index){
    const newTodos=[...todos];
    [newTodos[index],newTodos[index+1]]=[newTodos[index+1],newTodos[index]];

    setTodos(newTodos);
  }


  const emptyState=<div className='flex flex-col gap-4 justify-center items-center font-extralight'>
    <Rabbit />
    <p>Add tasks to continue</p>
  </div>

  function isSorted(arr, compareFn) {
    return arr.every((value, index, array) => {
      return index === 0 || compareFn(array[index - 1], value) <= 0;
    });
  }


  const totalTodos=todos.length;

  const completedTodos=todos.filter((item)=>item.completed);

  return (
    
    <div className='container max-w-2xl mx-auto p-8  flex flex-col justify-center items-center  text-white space-y-6 '>
      <h1 className='text-6xl text-accent font-display font-bold'>Super Todo</h1>
      <p className=' italic font-light'>Manages your todos with Ease!</p>


      <form action="" onSubmit={handleOnSubmit} className='bg-gray-700 px-10 py-2.5 rounded-sm flex justify-btweeen gap-4  '>
        <input type="text"  name="todo" placeholder='Enter your Todo here...' className='focus:outline-none font-sans' />
        <button className='cursor-pointer bg-accent text-black p-2 rounded-lg hover:bg-accent-light'><Plus /></button>
      </form>
     
      {totalTodos==0 ? emptyState :

        <div className="space-y-4">
          <div className="flex gap-4 ">
            {!isSorted(todos, compareFunction) && (
              <button
                type="button"
                onClick={handleSortTodos}
                className="px-4 py-2 ring-2 ring-yellow-300 hover:bg-yellow-300 hover:text-black transition rounded-lg cursor-pointer ml-auto"
              >
                Sort All
              </button>
            )}

            <button
              type="button"
              onClick={handleDeleteAll}
              className="px-4 py-2 ring-2 ring-red-700 hover:bg-red-700 hover:text-black transition rounded-lg flex gap-2 cursor-pointer ml-auto mr-10"
            >
              <Trash />
              Delete All
            </button>
          </div>

          <div className='ml-65'>{`${completedTodos.length}/${totalTodos} completed`}</div>
          {
            
            todos.map((item,index)=>
            (
                <TodoItem key={item.id} item={item} 
                handleTodoComplete={handleTodoComplete} 
                handleDelete={handleDelete}
                handleEditTodo={handleEditTodo}
                handleOnMoveUp={handleOnMoveUp}
                handleOnMoveDown={handleOnMoveDown}
                todosCount={totalTodos}
                index={index}
                />
            ))
          }
          </div>
        }
      </div>
  )
}

export default TodoPage 