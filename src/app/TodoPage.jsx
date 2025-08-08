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
  

  const emptyState=<h2>No Tasks Added...Add Now...</h2>

  function isSorted(arr, compareFn) {
    return arr.every((value, index, array) => {
      return index === 0 || compareFn(array[index - 1], value) <= 0;
    });
  }


  const totalTodos=todos.length;

  const completedTodos=todos.filter((item)=>item.completed);

  return (
    
    <div>
      <h1>Super Todo</h1>

      <form action="" onSubmit={handleOnSubmit}>
        <input type="text"  name="todo" placeholder='Enter your Todo here...'/>
        <button>Submit</button>

        {totalTodos==0 ? emptyState :

          <div>
            {!isSorted(todos,compareFunction) && <button type='button' onClick={handleSortTodos}>Sort All</button>}
            <button  type="button" onClick={handleDeleteAll}>Delete All</button>
            <div>{`${completedTodos.length} tasks out of ${totalTodos} tasks completed`}</div>
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
        }
      </form>
    </div>
  )
}

export default TodoPage