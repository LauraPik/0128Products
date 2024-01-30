import UpdateProduct from './UpdateProduct';
import { useEffect } from 'react';

const ProductForTable = (props) =>{

const deleteHandler = (id) => {
  console.log("Delete this", id);
    fetch(`https://demo-api.ideabridge.lt/api/products/${props.id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          "Authorization": `Bearer ${localStorage.getItem("tokenOne")}`
        },
      })
      .then((response) => {
        if (response.ok) {
          console.log("Product deleted successfully");
          // Update UI to reflect successful deletion
        } else {
          console.error("Error deleting product");
          // Handle error appropriately
        }
      })
      .catch((error) => {
        console.error("Error fetching product", error);
        // Handle error appropriately
      });
      window.location.reload(false);
}



    return(
        <>
        <tr>
           
            <td>{props.title}</td>
            <td>{props.desc}</td>
            <td>{props.price}</td>
            <td>
                <UpdateProduct productID={props.id} />
            </td>

            <td><a className='btn btn-primary' onClick={() => deleteHandler(props.id)}>Salinti</a></td>
        </tr>
        </>

    )

}


export default ProductForTable