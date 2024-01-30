import { Main } from "../main/Main";
import Header from "../header/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "../register/Register";
import Login from "../login/Login";
import Product from "../product/Product";
import AddProduct from "../addProduct/AddProduct";
import Reset from "../reset/Reset";
import Footer from "../footer/Footer";


function App(props) {


  return (
    <>
    
          <Router>
          <Header />
              <Routes>
              <Route path="/" element={<Main />}/>
                <Route path ="/register" element={<Register/>}/>

                 <Route path="/modal" element={<AddProduct/>} />

                <Route path ="/login" element={<Login/>}/>
                <Route path="/show-product/:id" element={<Product/>}/>
                <Route path ="/password-reset" element={<Reset/>}/>
              
      
              </Routes>
              <Footer/>
            </Router>
      
    </>
  );
}

export default App;
