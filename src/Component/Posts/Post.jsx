import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import Heart from "../../Assets/Heart";
import { db } from "../../firebase/Config";
import { collection, getDocs } from "firebase/firestore";
import { PostContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [products, setProducts] = useState([]);
  const{setViewProducts}=useContext(PostContext)
  const navigate=useNavigate('')

  const fetchPost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(newData, () => {
        // Log products after the state update
        console.log("Updated products:", products);
      });
      console.log("New data:", newData); // Log the newData directly
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  


  console.log("Initial products:", products);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>

        <div className="cards">
          {products.map((products) => (
            <div className="card" onClick={()=>{
              setViewProducts(products)
              navigate('/view')
            }}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img
                  src={products.url}
                  alt=""
                />
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{products.price}</p>
                <span className="kilometer">{products.category}</span>
                <p className="name">{products.name}</p>
              </div>
              <div className="date">
                <span>Tue May 04 2021</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img
                src="https://apollo.olx.in/v1/files/6qes6pxctayn3-IN/image;s=780x0;q=60"
                alt=""
              />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
