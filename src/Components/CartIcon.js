import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

function CartIcon(props) {
    return (        
        <Link to='/cart' style={{color: 'black'}}>
             <span className="badge badge-pill badge-danger">{props.totalQuantity}</span>    
            <ShoppingCartIcon/>
        </Link>
    )
}

const mapStateToProps = (state)=>{
return {
    totalQuantity: state.cart.totalQuantity
}
}

export default connect(mapStateToProps)(CartIcon) 
