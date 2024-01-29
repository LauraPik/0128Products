import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";
// import { Store, useGlobalState } from "state-pool";
// import {myGlobalParams, demoParam } from "../../myGlobalParams";
// import demoParam from "../../myGlobalParams";

// Store.setState("userToken", null);

const Login = () =>{
    const [crediantials, setCredentials] = useState({});
    let navigate = useNavigate();
    // const [userToken, setUserToken] = useGlobalState("userToken");

    // console.log(demoVal);

    const handleChange = (e) =>{
        setCredentials({
            ...crediantials,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(localStorage.getItem("tokenOne")){
            navigate("/");
        }
    }, [localStorage.getItem("tokenOne")]);

    const handleLogin = () =>{
        console.log("opa!!!");

        fetch('https://demo-api.ideabridge.lt/api/auth/login', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(crediantials)
        })
        .then(response => response.json())
        .then(result => {
            console.log("result", result);
            
            // saugau tokeną
            if(result.status == true){ 
                const token = result.data.access_token;
                // myGlobalParams.userToken = token;
                // console.log("myGO", myGlobalParams);
                localStorage.setItem('tokenOne', token);
                window.location.reload(false);
                
                // navigate('/');
            }
        });
      
        return false;
    }



    return(
        <>
         
         <h2 className="m-3 text-center">Prisijunk</h2>
        <form >
        <div className="form" >
            <div className="mb-3">
                <div className="mb-3">
                    <input type="email" name="email" className="form-control" placeholder="El.pastas" 
                    onChange={handleChange}
                    />
                </div>
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" name="password" placeholder="Slaptazodis" 
                onChange={handleChange}
                />
            </div>
            <div className="mb-3"><button type="button" onClick={handleLogin}>Prisijungti</button></div>
            <div className="mb-3">
                <p>Neturite paskyros ?<Link to="/register">Registruotis</Link></p>
            </div>
        </div>
        </form>
        
        
        </>
       
    )
}

export default Login