import { Link, useNavigate } from "react-router-dom"
import {  useState } from "react";
import "../register/register.scss"

const Register = () =>{
    const [crediantials, setCredentials] = useState({});
    let navigate = useNavigate();

    const handleChange = (e) =>{
        setCredentials({
            ...crediantials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Atlieka HTTP POST užklausą tik tada, kai visi laukai yra teisingai užpildyti
        fetch('https://demo-api.ideabridge.lt/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(crediantials)
        })
          .then(response => response.json())
          .then(result => {
            if (result.status === true) {
              localStorage.setItem('tokenOne', result.data.access_token);
              navigate('/');
              window.location.reload(false);
              
            } else {
              alert(result.message);
            }
          })
          .catch(error => {
            console.error(error);
            alert('Įvyko klaida');
          });
      };

   

    return(
        <>
            <form  className="register-form">
            <h2 className="m-3 text-center header">Registruokis</h2>
            
            <div className="mb-3">
                        <input type="email" name="email" className="form-control register-form--name" placeholder="El.pastas" onChange={handleChange} />
                    </div>
                <div className="mb-3">
                    <input type="text" className="form-control register-form--email" name="name" placeholder="Jusu vardas" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control register-form--password" name="password" placeholder="Slaptazodis" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control register-form--password-reset" name="password_confirmation" placeholder="Slaptazodio patvirtinimas" onChange={handleChange}/>
                </div>
                <div className="mb-3 register-form--button"><button type="submit" onClick={handleSubmit}>Registruotis</button></div>
                <div className="mb-3 register-form--login">
                    <p>Turite paskyra?<Link to="/login">Galite prisijungti</Link></p>
                </div>
            
            </form>
        </>
    )
}

export default Register
