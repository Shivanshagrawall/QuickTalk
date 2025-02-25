import React from 'react'
import './chat.css'
import LeftSideBar from '../../Component/LeftSideBar/LeftSideBar'
import ChatBox from '../../Component/ChatBox/ChatBox'
import RightSideBar from '../../Component/RightSideBar/RightSideBar'

const chat = () => {
  return (
    <div className='chat'>
      <div className="chat-container">
        <LeftSideBar/>
        <ChatBox/>
        <RightSideBar/>
      </div>
    </div>
  )
}

export default chat