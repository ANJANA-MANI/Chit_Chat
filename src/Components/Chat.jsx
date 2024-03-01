import React, { useContext } from 'react'
import cam from '../Assets/cam.png'
import add from '../Assets/add.png'
import more from '../Assets/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'


function Chat() {
  const {data}=useContext(ChatContext)
 console.log('Data in chat',{data});
  return (
    <div className='chat'>
        <div className="chatInfo">
            <span className='ms-2'>{data.user?.username}</span>
            <div className="chatIcons me-3">
                <img src={cam} alt="" srcset="" />
                <img src={add} alt="" srcset="" />
                <img src={more} alt="" srcset="" />
            </div>
        </div>
        <Messages/>
      <Input/>
    </div>
  )
}

export default Chat