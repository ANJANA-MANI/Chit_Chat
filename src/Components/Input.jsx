import React, { useContext, useState } from "react";
import img1 from "../Assets/img.png";
import attach from "../Assets/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Input = () => {
  const [text,setText] = useState("");
  const [img,setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);



  const handleSend = async () => {

    if (img) 
    {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.error("Error during image upload:", error);
        },
        () => {
          if (uploadTask.snapshot.state === "success")
          {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          })
        };
        }
      );
    } 
    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className='input'>
<input  onChange={(e)=>setText(e.target.value)} type="text" placeholder='type something...' value={ text||""}/>
<div className="send">
    <img src={img1} alt="" srcset="" />
    <input onChange={(e)=>setImg(e.target.files[0])} type="file" style={{display:"none"}} id='file'/>
<label htmlFor="file">
    <img src={attach} alt="" />
</label>
<button className='btn' onClick={() => {
  if (data.chatId != 'null') {
    handleSend();
    
  
  } 
  
  else {
    console.log('select a friend');
    setText("");
    setImg(null);
    toast.error(`Click on a friend's profile to start chatting.`);

  }
}}

>Send</button>
<ToastContainer />
</div>
    </div>
  )
}

export default Input