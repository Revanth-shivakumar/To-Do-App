import React from 'react'
import tick from '../assets/accept.png'
import untick from '../assets/radio.png'
import delete_icon from '../assets/bin.png'

const TodoCard = ({text,id,status,deleteCard,UpdateStatus}) => {
  return (
    <div className='flex items-center my-3 gap-2 p-5 bg-white rounded-full'>
        <div onClick={()=>{UpdateStatus(id)}} className='flex flex-1 items-center cursor-pointer' >
            <img className='w-8' src={status ? tick:untick}  alt=''/>
            <p className={`text-black ml-5 text-[17px] ${status? "line-through":""}`}> {text}</p>
        </div>
        <img onClick={()=>{deleteCard(id)}}src={delete_icon} alt='' className='w-4 cursor-pointer'/>
    </div>
  )
}

export default TodoCard