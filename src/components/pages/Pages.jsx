import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Pages = () =>{
    const[page, setPage] = useState(1);

    useEffect(() => {
        const apiUrl = `https://demo-api.ideabridge.lt/api/products/view/all?page=${page}`;
         fetch(apiUrl,{
          method:'GET',
           headers:{
               'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem("tokenOne")}` 
          }
      })
          .then((response) => response.json())
          .then((data) => setPage(data.data.to))
          .catch((error) => console.error('Klaida gaudant duomenis', error));
      }, [page]);
     
  
  
    return(
        <div className="pages">
      {[...Array(page).keys()].map((pageNumber) => (
          <li key={pageNumber}>
          <Link to={`/products/page/${pageNumber + 1}`}> :{pageNumber + 1}</Link>
          </li>
          ))}
        
          
      </div>

    )
}

export default Pages