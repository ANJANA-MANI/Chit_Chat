import React from 'react'
import Sidebar from '../Components/Sidebar'
import Chat from '../Components/Chat'
import icon from '../Assets/logo - Copy.png'
function Home() {
  return (
    <div className='home'>
    <div className='container'>
      <Sidebar/>
      <Chat/>
    </div>
    <img src={icon} alt="" srcset="" style={{with:"195px",height:"185px",position:"sticky",position:"absolute",marginLeft:"-490px",bottom:"-20px"}}/>
    </div>
  )
}

export default Home