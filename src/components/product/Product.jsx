import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../product/product.scss"
import noImage from "../products/imges/noImage.png"

const Product = ({productId}) =>{
    const navigate = useNavigate();
    const {id} = useParams();

    if(!localStorage.getItem("tokenOne")){
        navigate("/login");
    }

   
    // console.log(localStorage.getItem("tokenOne"));
   
    const [products, setProducts]  = useState([]);
   
    useEffect(() => {
        
        // Get the product data using the product ID
        fetch(`https://demo-api.ideabridge.lt/api/products/${id}`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("tokenOne")}` 
            }
        })
          .then(response => response.json())
          .then(data => {
            // Update the component state with the product data
            console.log("data", data);
            setProducts(data.data);
          })
          .catch(error => console.error(error));
    }, [id]);
      
    return (
        <>
        {products && <div className='conatiner'>
     
            <div className='row product-info'>
            <div className="col product-info--picture">
            {!products.image_url || products.image_url === '' ? (
                            <img src={noImage} alt="Image not found" className="product-info--picture-img" />
                          ) : (
                            <img src={products.image_url} alt="Product image" className="product-info--picture-img" />
                          )}
            </div>
            <div className="col roduct-info--details">
            <h2>{products.title}</h2>
            <p>{products.description}</p>
            <p>{products.price}eur</p>
            <button className='btn text-primary'><Link className="nav-link" to="/">Grįžti atgal</Link></button>  
            </div>
            </div>
          
          </div>
        }

        {!products && <div>Product not found</div>}
            
        </>
    );
};


export default Product;