import React, {  useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { auth,db } from '../../firebase/Config';
import { collection, addDoc } from "firebase/firestore";






function CSignUP() {

  const[userName,setUserName]=useState('')
  const[email,setEmail]=useState('')
  const[phone,setPhone]=useState('')
  const[password,setPassword]=useState('')
  const[validation,setValidation]=useState({userNameErr:'',emailErr:'',phoneErr:'',passwordErr:''})

  
  const navigate=useNavigate('')

  const handleSubmit=async(e)=>{

    e.preventDefault()


    if(userName.trim()==''&&email.trim()==''&&phone.trim()==''&& password.trim()==''){
      
      setValidation({userNameErr:'This field is requried',emailErr:'This field is requried',phoneErr:'This field is requried',passwordErr:'This field is requried'})
      return

    }

    if(userName.trim()!='' && email.trim()!='' && phone.trim()!=''&& password.trim()!=''){
      
      setValidation({userNameErr:'',emailErr:'',phoneErr:'',passwordErr:''})

    }
    

    await createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
        const user = userCredential.user;
        user.displayName=userName
        console.log(user);
        try{

          const docRef =await addDoc(collection(db, "Users"), {
            id:user.uid,
            userName:userName,
            PhoneNumber:phone,    
          });
          console.log(docRef,'syuuhsjhsj')
        }catch(err){

          console.log(err)
        
        }
       

              
        navigate("/login")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

    });


      
   

  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src='https://raw.githubusercontent.com/Packapeer/React_tutorial_olx_clone/45804c484250cb8c7bd9081c67f37c0582c23739/assets/images/olx-logo.svg' alt='hii'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
          />
          <br />
         <small style={{color:'red'}}>{validation.userNameErr}</small>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
         <small style={{color:'red'}}>{validation.emailErr}</small>
         <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
          <br />
         <small style={{color:'red'}}>{validation.phoneErr}</small>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
        
          <input 
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
         <small style={{color:'red'}}>{validation.passwordErr}</small>
          <br />
          <button type='submit'>Signup</button>
        </form>  
        <a>Login</a>
      </div>
    </div>
  )
}

export default CSignUP
