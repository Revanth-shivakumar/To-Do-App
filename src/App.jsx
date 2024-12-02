import React from 'react'
import Todo from './Components/Todo'

const App = () => {
  return (
    <div className='bg-violet-900 grid py-6 min-h-screen'>
      {/* <h1 className='bg-gray-600 text-white'>App</h1> */}
      <Todo></Todo>
    </div>
  )
}

export default App