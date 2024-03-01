import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import icon from '../Assets/logo - Copy.png'
const Chats = () => {
  
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
//console.log('Chats',chats);
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
   
    <div className="chats">
      
  {chats && Object.keys(chats).length > 0 &&
  Object.entries(chats)
      .sort((a, b) => b[1].date - a[1].date)
      .map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1]?.userInfo)}
        >
          <img src={chat[1]?.userInfo?.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1]?.userInfo?.username}</span>
            <p>{chat[1]?.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    
</div>
     
  )
};

export default Chats;