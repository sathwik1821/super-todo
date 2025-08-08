import React, { useState } from 'react'



const TodoItem = ({item,handleTodoComplete,handleDelete,handleEditTodo,   handleOnMoveUp,handleOnMoveDown,todosCount,index}) => {

    const [editTodo,setEditTodo]=useState(false);

    function handleFormEditSubmit(e){
      e.preventDefault();
      const todoText=e.target["todo"].value;
      handleEditTodo(item.id,todoText);
      setEditTodo(false);
    }

    const FormItemDiv=(
      <div>
        <form onSubmit={handleFormEditSubmit}>
          <input type="text" name="todo" defaultValue={item.text}/>
          <button type="submit">Update</button>

        </form>
        <button type="button" onClick={() => setEditTodo(false)}>Cancel</button>
      </div>
    )


    const TodoItemDiv=(
      <div>
        
        <button type="button"  disabled={index==0} onClick={()=>handleOnMoveUp(index)}>⬆️</button>
        <button type="button" disabled={index==todosCount-1} onClick={()=>handleOnMoveDown(index)}>⬇️</button>
        <input type="checkbox" name='complete' 
        id={item.id}
        
        checked={item.completed}
        onChange={(e)=>handleTodoComplete(item.id,e.target.checked)}/>
        <label htmlFor={item.id}>{item.text}</label>
      
        <button type="button" onClick={() => setEditTodo(true)}>Edit</button>
        <button type="button" onClick={()=>handleDelete(item.id)}>Delete</button>
    </div>
    )


  return (
    <div>
      {editTodo && FormItemDiv}
      {!editTodo && TodoItemDiv}
    </div>
  )
}

export default TodoItem