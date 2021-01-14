import React from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';


function CartItem(props) {
    let { product } = props;
    let {index} = props;

    return (
        <>
            <div className="col-sm-3" style={{ paddingTop: '30px' }}>
                <div className="card">
                    <img src={product.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <Link to={'/product/' + product._id} className="card-title"><h5>{product.name}</h5></Link>
                        <p>
                            Quantity :&nbsp; <b>{product.quantity}</b>
                        </p>
                        <p>
                            Price :&nbsp; <b>${product.price}</b>
                        </p>     
                    </div>
                    <button className="btn btn-danger card-button" 
                    onClick={()=>props.deleteProductFromCart(product._id,index,product.quantity,product.price)} 
                    >
                       <DeleteIcon/> Delete
                    </button>
                </div>
            </div>
        </>
    )
}




export default CartItem 
