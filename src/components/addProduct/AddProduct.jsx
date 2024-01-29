import { useParams } from "react-router-dom"
import {  useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProductTable from "../productTable/ProductTable";


const AddProduct = (props) =>{
  const {id } = useParams();
  const [show, setShow] = useState(false);


  const [image, setImage] = useState({
    title:" ",
    price:" ",
    image:"",
    description:" "
  });

  const handleChange = (event) => {
    setImage({ 
      ...image, 
      [event.target.name]: event.target.value, 
    });
  };
  
  const handleImagePost = async () => {   
    const formInfo = new FormData()
    formInfo.set("title", image.title)
    formInfo.set("price", parseFloat(image.price))
    formInfo.set("description", image.description)
    formInfo.set("image", image.image)


    const resp = await fetch(`https://demo-api.ideabridge.lt/api/products`, {

      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("tokenOne")}`
      },
      body: formInfo
     
    });
    handleClose();

    console.log("resp", resp);

  }
  
  // opening or closing modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Pridėti produktą
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pridėti produktą</Modal.Title>
        </Modal.Header>
            <Modal.Body>
              {/* form start */}
              <form >
              <div className="mb-3">
                    <input type="text" name="title" placeholder="Pavadinimas" className=" m-1 form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                    <input type="text" name="price" placeholder="Kaina" className=" m-1 form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                    <input type="text" name="description" placeholder="Aprasymas" className=" m-1 form-control" onChange={handleChange} />
              </div>
              <div className="mb-3">
                    <input type="file" name="image" placeholder="Nuotrauka" accept="image/png, image/jpeg" onChange={(e) => {
                      console.log(e.target.files)
                      setImage((oldValue) => ({
                        ...oldValue,
                        image: e.target.files[0],
                      }))
                    }
                } />
              </div>
              </form>
               {/* form end */}
            </Modal.Body>
        <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Uždaryti
              </Button>
              <Button type="button" variant="primary" onClick={handleImagePost} >
                Išsaugoti pakeitimus
              </Button>
        </Modal.Footer>
      </Modal>
      {/* Pridedu vaika ProductTable */}
      <ProductTable/>
    </>
    
   
  );
}


export default AddProduct
