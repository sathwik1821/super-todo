import React from 'react'
import {useState} from 'react'
import TodoItem from './TodoItem';

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


  return (
    <div>
      <h1>Super Todo</h1>

      <form action="" onSubmit={handleOnSubmit}>
        <input type="text"  name="todo" placeholder='Enter your Todo here...'/>
        <button>Submit</button>

        
        <div>
          {
            todos.map((item)=>
            (
                <TodoItem key={item.id} item={item}
                 handleTodoComplete={handleTodoComplete} 
                 handleDelete={handleDelete}
                />
            ))
          }
        </div>
      </form>
    </div>
  )
}

export default TodoPage