import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logout from '../Assets/logout.png'
function Navbar() {
  const navigate=useNavigate();
  const logout2=()=>{
    signOut(auth)
  }
 const {currentUser}=useContext(AuthContext)
  return (
    <div className='navbar'>
        <span className='logo ' style={{fontFamily:" Protest Revolution"}}>Chit Chat</span>
        <div className="user">
            <img className='img' src={currentUser.photoURL} alt="hiii" srcset="" />
            <span>{currentUser.displayName}</span>
           
            <Link className='btn1' onClick={()=>logout2()}>
              <img src={logout} alt="" srcset="" style={{width:"30px",height:"30px"}}/>
            </Link>
        </div>
    </div>
  )
}

export default Navbar