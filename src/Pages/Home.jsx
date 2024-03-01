import React from 'react';
import Sidebar from '../Components/Sidebar';
import Chat from '../Components/Chat';
import icon from '../Assets/logo - Copy.png';  // Import the icon image

function Home() {
  return (
    <>
      <div className='home'>
        <div className='container'>

          <Sidebar />
          <Chat />
          <div className="chit" style={{ position: "fixed", marginTop: "450px" }}>
          <img src={icon} alt="" style={{ width: "195px", height: "185px" }} />
        </div>
        </div>

       
      </div>
    </>
  );
}

export default Home;
