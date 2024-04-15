import React, { useContext } from 'react'
import "./NavBar.css"
import Arrow from '../../Assets/Arrow'
import Search from '../../Assets/Search'
import OlxLogo from '../../Assets/OlxLogo'
import { AuthContext } from '../../store/Context'
import {  signOut } from "firebase/auth";
import {auth} from '../../firebase/Config';
import { Link, useNavigate } from 'react-router-dom'


function Navbar() {

const{user,setUser}=useContext(AuthContext)
const navigate=useNavigate('')

const handleLogout = () => {               
  signOut(auth).then(() => {
       setUser(null)  
      navigate("/login");
      console.log("Signed out successfully")
  }).catch((error) => {
  // An error happened.
  });
}



console.log(user,'header')

  return (

    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
            <OlxLogo/>
        </div>
        <div className="placeSearch">
           <Search/>
          <input type="text" />
          <Arrow/> 
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"/>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user?(<span onClick={handleLogout}>logout</span>):(  <span><Link to={'/login'}>Login</Link> </span>)}
          <hr />
        </div>

        <div className="sellMenu" style={{marginRight:'100px'}}>
          {/* <SellButton></SellButton> */}
          <div className="sellMenuContent">
            {/* <SellButtonPlus></SellButtonPlus> */}
           <Link to={'/create'}><span>SELL</span></Link> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
