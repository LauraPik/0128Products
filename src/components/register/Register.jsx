import { Link, useNavigate } from "react-router-dom"
import {  useState } from "react";


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
         <h2 className="m-3 text-center">Registruokis</h2>
            <form >
            <div className="form" >
            <div className="mb-3">
                        <input type="email" name="email" className="form-control" placeholder="El.pastas" onChange={handleChange} />
                    </div>
                <div className="mb-3">
                    <input type="text" className="form-control" name="name" placeholder="Jusu vardas" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" name="password" placeholder="Slaptazodis" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" name="password_confirmation" placeholder="Slaptazodio patvirtinimas" onChange={handleChange}/>
                </div>
                <div className="mb-3"><button type="submit" onClick={handleSubmit}>Registruotis</button></div>
                <div className="mb-3">
                    <p>Turite paskyra?<Link to="/login">Galite prisijungti</Link></p>
                </div>
            </div>
            </form>
        </>
    )
}

export default Register