import React, { useState } from 'react'
import './LoginPage.css'
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth,db } from '../../firebase/Config';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {

  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[validation,setValidation]=useState({emailErr:'',passwordErr:''})
  const navigate=useNavigate('')
  

  const handleSubmit=async(e)=>{
    e.preventDefault()
    
    if(email.trim()=='' && password.trim()==''){
     return    setValidation({emailErr:'This field is required',passwordErr:'This field is required'})
    }     
    
    if(email.trim()!='' && password.trim()!=''){
        setValidation({emailErr:'',passwordErr:''})
     }  

    await signInWithEmailAndPassword(auth, email,password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      navigate("/")
      console.log(user);
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
  });
    
    console.log(email,password)
    

                   
             
  }   

  return (
    <div>
    <div className="loginParentDiv">
      <img width="200px" height="200px" src='https://raw.githubusercontent.com/Packapeer/React_tutorial_olx_clone/45804c484250cb8c7bd9081c67f37c0582c23739/assets/images/olx-logo.svg'></img>
      <form  onSubmit={handleSubmit}>
        <label htmlFor="fname">Email</label>
        <br />
        <input
          onChange={(e)=>setEmail(e.target.value)}
          className="input"
          type="email"
          id="fname"
          name="email"
          value={email}
        />
        <br />
        <small style={{color:'red'}}>{validation.emailErr}</small>
        <br />
        <label htmlFor="lname">Password</label>
        <br />
        <input
          onChange={(e)=>setPassword(e.target.value)}
          className="input"
          type="password"
          id="lname"
          name="password"
          value={password}
        />
        <br />
        <small style={{color:'red'}}>{validation.passwordErr}</small>
        <br />
        <button>Login</button>
      </form>
      <Link to={'/signup'}>Signup</Link> 
    </div>
  </div>
  )
}

export default LoginPage

