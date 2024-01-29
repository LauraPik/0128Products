import "./header.scss";
import { Link } from "react-router-dom";
import User from "../user/User";


const Header = () =>{
  
    return(
    <>
        
    <nav className="navbar navbar-expand-lg">
           
        <div className="container-fluid header-container-fluid">
            <div className="container header-container">
                <h1 href="#" className="navbar-brand">Produktų duomenų bazė</h1>
                
                <Link className="nav-link" to="/">Pagrindinis</Link>            
                    <div>
                        {/* Adding child component User */}
                        <User/>
                    </div> 
                
                </div>
                
        </div>
    </nav>
            
    </>
        
            )
        }
    

export default Header