import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'

function Messages() {
  const [messages,setMessages]=useState([])
  const {data}=useContext(ChatContext)
  
  useEffect(()=>{

const unSub=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{

  doc.exists() && setMessages(doc.data().messages)
  
})
return()=>{
  unSub();
}
  },[data.chatId])
  console.log('got Message',messages);
  return (
    <div className='messages'>
      {
        messages.map((m)=>(
          
          <Message messages={m} key={m.id} />
        ))
      }
       
       
    </div>
  )
}

export default Messages