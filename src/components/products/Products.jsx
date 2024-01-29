import { useState, useEffect } from "react";
import "./products.scss"
import noImage from "./imges/noImage.png"
import { Link, useParams } from "react-router-dom";
import Pages from "../pages/Pages";


const Products = (props) =>{
    const {id} = useParams();
    const [products, setProducts]  = useState([]);

    useEffect(() => {
      fetch(`https://demo-api.ideabridge.lt/api/products/view/all`)
        .then(response => response.json())
        .then(data => setProducts(data.data.data))
        .catch(error => console.error(error));
    }, []);



    return (
        <>
    <div className="container">
      <div className="row promo-product">
           {products.slice(1, 2).map((product) => (
               <>
                  <div className="col-6 promo-product--image" key={product.id}>
                  {!product.image_url || product.image_url === '' ? (
                            <img src={noImage} alt="Image not found" className="placeholder-image" />
                          ) : (
                            <img src={product.image_url} alt="Product image" className="placeholder-image" />
                          )}
                    </div>
                    <div className="col-3 promo-product--details">
                      <p>{product.title.toUpperCase()}</p>
                      {/* <p>{product.description.substring(0, 100) + "..."}</p> */}
                      <p>{product.description}</p>
                      <p>{product.price}eur</p>
                    <div className="mb-3 promo-product--button">
                      <button><Link className='btn btn-primary' to={`/show-product/${product.id}`}>Placiau</Link></button>
                    </div>
                    </div>
                    </>
                  ))}


      </div>
      <div className="row list-product">
      {products.slice(1, 4).map((product) => (
        <>
          <div className="col-6 col-md list-product--details" key={product.id}>
            <p>{product.title.toUpperCase()}</p>
            {/* <p>{product.description.substring(0, 100) + "..."}</p> */}
            <p>{product.description}</p>
            <p>{product.price}eur</p>
            <div className="mb-3 list-product--button">
                      <button><Link className='btn btn-primary' to={`/show-product/${product.id}`}>Placiau</Link></button>
                    </div>
          </div>
          <div className="col-6 col-md list-product--image">
            {!product.image_url || product.image_url === '' ? (
                  <img src={noImage} alt="Image not found" className="placeholder-image" />
                ) : (
                  <img src={product.image_url} alt="Product image" className="placeholder-image" />
                )}
          </div>

          </>
        ))}
      
      </div>
      </div>
     
      </>
      
    );
}

export default Products