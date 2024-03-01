import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats' 
import icon from '../Assets/logo - Copy.png'
function Sidebar() {
  return (
    <div className='sidebar' style={{position:"relative"}}>
        <Navbar/>
        <Search/>
        <Chats/>
       
    </div>
 
  )
}

export default Sidebar