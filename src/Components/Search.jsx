import React, { useContext, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
 
const {currentUser}=useContext(AuthContext);
console.log('currentUser',currentUser);
console.log('currentUser.username-',currentUser.displayName);
  const handleSearch = async () => {
   
      console.log('handling..');
      const q = query(
        collection(db, "users"), 
        where("username", "==", username));
      try {
      const querySnapshot = await getDocs(q);
   
        

      if (querySnapshot.empty) {
        // No user found
        setErr(true);
      } else {
        // User found
        setErr(false);}

      querySnapshot.forEach((doc) => 
      {
        setUser(doc.data());
        console.log('found',{user});
      });
    } 
    catch (error) {
      console.log(error);
      
    }
  };

  const handleKey = (e) => {
    console.log('searchinggg...');
    e.code === "Enter" && handleSearch();
  };

  const handleSelect= async()=>{


   console.log('handlinggg select');
    const combinedId=
    currentUser.uid>user.uid?
    currentUser.uid+user.uid
    :user.uid+currentUser.uid;
    console.log('ID',combinedId);
  try {
    const res=await getDoc(doc(db,"chats",combinedId));
    console.log('response',res);
    if(!res.exists())
    {
    console.log('no response exists');
      
    await setDoc(doc(db,"chats",combinedId),{messages:[]});
    //create userchats
console.log('setting current users friend in userchats');
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [combinedId+".userInfo"]:{
        uid:user.uid,
        username:user.username,
        photoURL:user.photoURL
      },
      [combinedId+".date"]:serverTimestamp()
    });
    console.log('setting user as friends friend in userchats.......');
    try {
      const result = await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          username: currentUser.displayName||"",
          photoURL: currentUser.photoURL
        },
        [combinedId + ".date"]: serverTimestamp()
      });
      console.log('result56', result);
    } catch (error) {
      console.error('Error updating document:', error);
    }
    
    }
   
  } 
  catch (error) {
    
  }
  setUser(null);
  setUsername("")
 
  }

  return (
    <div className='search'>
      <div className="searchForm p-2 " >
        <input onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} className="text-center w-100" type="text" placeholder='Find a friend' />
      </div>
      {err && <span className='text-center texpt-light ms-5'>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="search" />
          <div className="userChatInfo">
            <span>{user.username}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
