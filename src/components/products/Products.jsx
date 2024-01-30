import { useState, useEffect } from "react";
import "./products.scss"
import noImage from "./imges/noImage.png"
import { Link, useParams } from "react-router-dom";



const Products = (props) =>{
    const { id } = useParams();
    const [products, setProducts]  = useState([]);

    const productsPerPage = 3;
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState();
    const [start, setStart] = useState(1);

    useEffect(() => {
      fetch(`https://demo-api.ideabridge.lt/api/products/view/all`)
        .then(response => response.json())
        .then(data => {
          let resp = data.data.data;
          setProducts(resp);
          setMaxPage(resp.length / productsPerPage);
          console.log("max", resp);
        })
        .catch(error => console.error(error));
    }, []);

    /*
    per  = 2;
    page = 1;

    0 -> 2
    


        (1-1)+1*1[1], 1*1+1[2]
        1*1+1[2], 1*1+4[5]

        2
        (2-1)+2*2[5], 2*2+2[6]
        2*2+2[6], 2*2+4[8]
      */

    const nextPage = () => {
      setStart(start+productsPerPage);
      setPage(page+1);
      console.log("next");
    }
    
    const prevPage = () => {
      setStart(start-productsPerPage);
      setPage(page-1);
      console.log("prev");
    }
/*
 356 | 354
 353 | 346
 345 | 344

 Page:
 1 -> 2 -> 3...
 PerPage: 3
 start:
 1 -> 2.. ??
 
 Start:
 1 -> 3 -> 5 -> 7...
 0+1[1] 1
 1+2[3] 1+2[3]
 2+3[5] 3+2[5]
 3+4[7] 5+2[7]

 1 -> 4 -> 7 -> 10...
 0+1[1] 1
 1+2[3] 1
 2+3[5]

 End:
 3 -> 5 -> 7 -> 9...
 1+(1*2)-0 3
 2+(2*2)-1 5
 3+(3*2)-2 7
 4+(4*2)-3 9
*/

    return (
        <>
    <div className="container"> 
      <div className="row promo-product">
           {products.slice(0, 1).map((product) => (
               <>
                  <div className="col-6 promo-product--image" key={product.id}>
                  {!product.image_url || product.image_url === '' ? (
                            <img src={noImage} alt="Image not found" className="placeholder-image" />
                          ) : (
                            <img src={product.image_url} alt="Product image" className="placeholder-image" />
                          )}
                    </div>
                    <div className="col-3 promo-product--details">
                      <h3>{product.title.toUpperCase()}</h3>
                      {<p>{product.description.length > 100 ? product.description.substring(0, 100) + "..." : product.description}</p>}
                      <p>{product.price}eur</p>
                    <div className="mb-3 promo-product--button">
                      <button><Link className='btn btn-primary' to={`/show-product/${product.id}`}>Placiau</Link></button>
                    </div>
                    </div>
                    </>
                  ))}


      </div>
      <div className="row list-product">
      {products.slice(start, productsPerPage+start).map((product) => (
        <>
        <div className="col-6 col-md list-product--image">
            {!product.image_url || product.image_url === '' ? (
                  <img src={noImage} alt="Image not found" className="placeholder-image" />
                ) : (
                  <img src={product.image_url} alt="Product image" className="placeholder-image" />
                )}
          </div>
          <div className="col-6 col-md list-product--details" key={product.id}>
            <h3>{product.title.toUpperCase()}</h3>
            {<p>{product.description.length > 100 ? product.description.substring(0, 100) + "..." : product.description}</p>}
            <p>{product.price}eur</p>
            <div className="mb-3 list-product--button">
                      <button><Link className='btn btn-primary' to={`/show-product/${product.id}`}>Placiau</Link></button>
                    </div>
          </div>
          

          </>
        ))}
      </div>
      <div className="pagination">
          {page !== 1 && <button class="page-item" onClick={prevPage}>Prev page</button>}
          {page < maxPage && <button class="page-item" onClick={nextPage}>Next page</button>}
        </div>
      </div>
     
      </>
      
    );
}

export default Products
