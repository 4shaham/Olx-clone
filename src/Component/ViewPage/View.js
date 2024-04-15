import React, { useEffect, useState } from 'react'
import './View.css'
import { useContext } from 'react'
import { PostContext } from '../../store/PostContext'
import { useNavigate } from 'react-router-dom'
import { db } from "../../firebase/Config";
import { collection, query, where, getDocs } from 'firebase/firestore';


function View() {


 const{viewProducts}=useContext(PostContext)
 const navigate=useNavigate('')
 const [user,setUserDetails]=useState('')
 const fetchData = async () => {
    if (!viewProducts || !viewProducts.Userid) return; // Check if viewProducts and Userid are available

    try {

      const q = query(collection(db, 'Users'), where('id', '==', viewProducts.Userid));
      console.log(q,'klsjjkhhldgydg');
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return; // Exit if no matching documents found
      }

      querySnapshot.forEach(doc => {
        setUserDetails(doc.data());
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [viewProducts]);

  console.log('User details:', user);
// const fetchData = async () => {

//     if (!viewProducts) return; 

//     const { Userid } = viewProducts;
//     try {
//       const q = query(collection(db, 'Users'), where('id', '==', Userid));
//       const data = await getDocs(q);
//       data.forEach(doc => {
//         setUserDetails(doc.data());
//       });

//       console.log(data.docs,user,'hjhjhj');
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   useEffect(() => {
//     fetchData();
//   }, []);





return (
    <>
      {viewProducts ? (
        <div className="viewParentDiv">
          <div className="imageShowDiv">
            <img src={viewProducts.url} alt="" />
          </div>
          <div className="rightSection">
            <div className="productDetails">
              <p>&#x20B9;{viewProducts.price}</p>
              <span>{viewProducts.name}</span>
              <p>{viewProducts.cateogary}</p>
              <span>Tue May 04 2021</span>
            </div>
            <div className="contactDetails">
              <p>Seller details</p>
              {user ? (
                <>
                  <p>{user.userName}</p>
                  <p>{user.PhoneNumber}</p>
                </>
              ) : (
                <p>Loading seller details...</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </>
  );
  
}

export default View
