import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { onSnapshot } from 'firebase/firestore'

function Message({messages}) {
  const {currentUser}=useContext(AuthContext)
  const {data}=useContext(ChatContext)
  //console.log('Messages',messages);
 const ref=useRef();
 useEffect(()=>{

  ref.current?.scrollIntoView({behaviour:"smooth"})
 },[messages])


 function formatTimestamp(timestamp) {
  const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  const options = { 
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true // Use 12-hour format
  };

  return date.toLocaleString(undefined, options);
}
  return (
<>
<div ref={ref} className={`message ${messages?.senderId === currentUser?.uid && "owner"}`}>
        <div className="messageInfo">
            <img src={messages.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} />
         <span>{messages && (
  <p style={{fontSize:"10px"}}>{messages.date && formatTimestamp(messages.date)}</p>
)}</span>
        </div>
<div className="messageContent">
  
    {messages.text &&   <p>{messages.text}  </p>} 
    {messages.img && < img src={messages.img} className='mb-3'/>}
    
    
</div>
   
    </div>


</>
  )
}

export default Message

