import { useEffect, useState } from "react";
import ProductForTable from "../productForTable/ProductForTable";
import "../productTable/productTable.scss"


const ProductTable = () =>{
    const [product, setProducts] = useState([]);

    console.log("token", localStorage.getItem("tokenOne"));
    
    useEffect(() => {
        
        // Get the product data using the product ID
        // ?page=${pageNR}
        fetch(`https://demo-api.ideabridge.lt/api/products`, {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("tokenOne")}` 
            }
        })
          .then(response => response.json())
          .then(data => {
            // Update the component state with the product data
            console.log("getALlProducts", data);
            setProducts(data.data.data);
          })
          .catch(error => console.error(error));
    }, []);

    console.log("props", product);
    return(
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Pavadinimas</th>
                    <th>Aprasymas</th>
                    <th>Kaina</th>
                    <th>Keisti</th>
                    <th>Salinti</th>
                </tr>
            </thead>
            
            <tbody>
                {product?.map((data)=>
                <ProductForTable
                key = {data.id}
                id = {data.id}
                title = {data.title}
                desc = {data.description}
                price = {data.price}
                />
                )
                }
            </tbody>
            
        </table>
    )
}

export default ProductTable