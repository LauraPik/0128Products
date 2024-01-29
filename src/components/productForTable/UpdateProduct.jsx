import {Link, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProductTable from "../productTable/ProductTable";


const UpdateProduct = (props) =>{
  const [show, setShow] = useState(false);

    console.log("upd ID", props.productID);



  const handleChange = (event) => {
    setProduct({ 
      ...product, 
      [event.target.name]: event.target.value, 
    });
  };

  const [product, setProduct]  = useState({
    title:"",
    price:"",
    description:""
  });
   
    useEffect(() => {
        
        // Get the product data using the product ID
        fetch(`https://demo-api.ideabridge.lt/api/products/${props.productID}`, {
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
            setProduct(data.data);
          })
          .catch(error => console.error(error));
    }, [props.productID]);
  
  const handleUpdate = async () => {   
    // const formData = new FormData()
    const formData = new URLSearchParams();
    formData.append("title", product.title)
    formData.append("price", parseFloat(product.price))
    formData.append("description", product.description)

    const resp = await fetch(`https://demo-api.ideabridge.lt/api/products/${props.productID}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        "Authorization": `Bearer ${localStorage.getItem("tokenOne")}`
      },
      body: formData
     
    });

    console.log("resp", resp);
    handleClose();
    window.location.reload(false);

  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Atnaujinti
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Atnaujinti produktą</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form >
          <div className="mb-3">
                <input type="text" name="title" placeholder="Pavadinimas" className=" m-1 form-control" onChange={handleChange} 
                value={product?.title || ""} />
          </div>
          <div className="mb-3">
                <input type="text" name="price" placeholder="Kaina" className=" m-1 form-control" onChange={handleChange}
                value={product?.price || ""} />
          </div>
          <div className="mb-3">
                <input type="text" name="description" placeholder="Aprasymas" className=" m-1 form-control" onChange={handleChange}
                value={product?.description || ""} />
          </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Uždaryti
          </Button>
          <Button type="button" variant="primary" onClick={handleUpdate} >
            Išsaugoti pakeitimus
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    
   
  );
}


export default UpdateProduct;
