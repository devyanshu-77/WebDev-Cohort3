import React from 'react'

const Todo = ({task}) => {
  return (
    <p className="bg-gray-200 text-black p-2 rounded-xl">{task}</p>
  )
}

export default Todo