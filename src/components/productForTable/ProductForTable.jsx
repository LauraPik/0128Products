import UpdateProduct from './UpdateProduct';


const ProductForTable = (props) =>{
    
    const deleteHandler = (id)=>{
        console.log("Delete this", id);
        //fetch to delete method [need ID, CHECK FOR CORRECT]
    }

    return(
        <>
        <tr>
           
            <td>{props.title}</td>
            <td>{props.desc}</td>
            <td>{props.price}</td>
            <td>
                <UpdateProduct productID={props.id} />
            </td>

            <td><a className='btn btn-primary' onClick={() => deleteHandler(props.id)}>Salinti</a></td>
        </tr>
        </>

    )
}

export default ProductForTable