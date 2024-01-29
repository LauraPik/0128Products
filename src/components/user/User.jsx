import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddProduct from "../addProduct/AddProduct";

const User = () => {
  const navigate = useNavigate();
 const [user, setUser] = useState(null);

//  console.log("user", user);
//  console.log("myGlobalParams", myGlobalParams);
//  console.log("locaa", localStorage.getItem("tokenOne"));

 useEffect(() => {
   const getUserData = async () => {
     try {
       const token = localStorage.getItem("tokenOne");
       const response = await fetch(`https://demo-api.ideabridge.lt/api/auth/me`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       const data = await response.json();
      //  console.log("usr data", data);
       setUser(data.data);
     } catch (error) {
       console.error(error);
     }
   };
   if(localStorage.getItem("tokenOne")){
    getUserData();
   }
 }, []);

 
 const handleLogout = () => {
  // Clear the user token from local storage
  localStorage.removeItem("tokenOne");
  setUser();
  // Redirect to the login page
  navigate("/login");
};


   // Jei vartotojo informacija dar nebuvo gauta
   return (
    <div>
          {!user?<>
            <ul className="nav justify-content-end">
                <Link className="nav-link" to="/login">Prisijungti</Link>
                <Link className="nav-link" to="/register" >Registruotis</Link>
          </ul>
          </>:
          // is user is NULL
            (
            <>
            <Link className="nav-link" to="/modal">Produktų administravimas</Link>
            <div className="dropdown">
                <a className="btn dropdown-toggle text-primary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.name.toUpperCase()}
                </a>
            <div className="dropdown-menu" aria-labelledby="userDropdown">
                <p className="dropdown-item">ID: {user.id}</p>
                <p className="dropdown-item">El. paštas: {user.email}</p>
                <p className="dropdown-item" onClick={handleLogout}>Atsijungti</p>
            </div>
          </div>
          </>
          )
              }
              
  </div>
 )
 
};
export default User;

