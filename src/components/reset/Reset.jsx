import {Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../reset/reset.scss"


const Reset = () =>{

    const [email, setEmail ] = useState('');
  

    // const submitHandler = (e) =>{
    //     e.preventDefault();
    //     sendPasswordReset(email)
    // }



    return(
        <>
        
        <form className="reset-form">
        <h2 className="m-3 text-center header">Atstatykite slaptazodi</h2>
        <div className="form" >
            
                <div className="mb-3 reset-form--password">
                    <input type="email" value={email} className="form-control" placeholder="El.pastas" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
           
        
            <div className="mb-3 reset-form--button">
                <button type="submit" >Siusti</button></div>
                <p className="rset-form--login">Grįžti į prisijungimo langą?<Link to="/login">Galite prisijungti</Link></p>
           
        </div>
        </form>
    </>


    )
}

export default Reset