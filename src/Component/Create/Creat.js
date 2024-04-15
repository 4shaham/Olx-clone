import React,{Fragment, useContext, useState} from 'react'
import './Create.css'
import {storage,auth,db} from '../../firebase/Config'
import { AuthContext } from '../../store/Context'
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'


function Creat() {

const[name,setName]=useState('')
const[category,setCategory]=useState('')
const[price,setPrice]=useState('')
const[image,setImage]=useState(null)
const [percent, setPercent] = useState(0);
const {user}=useContext(AuthContext)
const navigate=useNavigate('')

const [uploadProgress, setUploadProgress] = useState(0); // State for upload progress
const handleClick = async () => {
    if (name.trim() === '' || category.trim() === '' || price.trim() === '' || image == null) {
      return alert('Please fill all data');
    }
  
    try {
      const storageRef = ref(storage, `/images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPercent(percent); // Update progress state
        },
        (error) => {
          console.error('Error during upload:', error);
          alert('Error uploading image. Please try again.'); // Show error to user
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log('Download URL:', url);
                
            const docRef = addDoc(collection(db, "products"), {
                name,
                category,
                price,
                url,
                Userid:user.uid,
              });


            alert('Image uploaded successfully!'); // Show success message to user
            navigate('/')
          });
        }
      );
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.'); // Show error to user
    }
  };
  

// const handleClick = async() => {

//     if(name.trim()=='' || category.trim() == '' || price.trim()=='' ||  image==null){
//         return alert('please fill all datas')
//     }





//     const storageRef = ref(storage,`/images/${image.name}`)
//     const uploadTask = uploadBytesResumable(storageRef,image);

    
//     uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//             const percent = Math.round(
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//             );

//             // update progress
//             setPercent(percent);
//         },
//         (err) => console.log(err),
//         () => {
//             // download url
//             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//                 console.log(url);
//             });
//         }
//     );




  
   
// };


  return (
    <Fragment>
      <card>
        <div className="centerDiv">

            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
            <br />

          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>

            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button className="uploadBtn" onClick={handleClick}>upload and Submit</button>

        </div>
      </card>
    </Fragment>
 
  )
}

export default Creat
