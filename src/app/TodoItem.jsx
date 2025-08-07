import React from 'react'

const TodoItem = ({item,handleTodoComplete,handleDelete}) => {
  return (
    <div>
        
        <input type="checkbox" name='complete' 
        id={item.id}
        checked={item.completed}
        onChange={(e)=>handleTodoComplete(item.id,e.target.checked)}/>
        <label htmlFor={item.id}>{item.text}</label>

        <button onClick={()=>handleDelete(item.id)}>Delete</button>
    </div>
  )
}

export default TodoItem