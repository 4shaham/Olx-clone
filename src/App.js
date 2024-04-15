import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NavBar from "./Component/NavBar/NavBar";
import Banner from "./Component/Banner/Banner";
import Footer from "./Component/Footer/Footer";
import { useContext, useEffect } from "react";
import { AuthContext } from "./store/Context";
import { onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase/Config'
import Createpage from "./pages/Createpage";
import ViewPage from "./pages/ViewPage";
import PContext from "./store/PostContext";

function App() {

  const {setUser}=useContext(AuthContext)
   
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid", uid)
          setUser(user)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
     
 }, [])

  return (
    <div>

    <PContext>

    <NavBar/>
      <Routes>  
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/create" element={<Createpage/>}></Route>
        <Route path="/view" element={<ViewPage/>}></Route>
    </Routes>


    </PContext> 

      

      

    </div>
  );
}

export default App;
