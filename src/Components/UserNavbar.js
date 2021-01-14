import React from 'react';
import { connect } from 'react-redux';
import {useHistory,Link} from 'react-router-dom';
import {  SignOut } from '../Store/ActionCreators/ActionCreators';
import CartIcon from './CartIcon';

function UserNavbar(props) {
    let history = useHistory();

    const handleClick = () =>{
        props.SignOut();
        history.push('/');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">UShop</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item ">
                        <Link className="nav-link" to="/"> Home </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">Cart</Link>
                    </li>                  
                </ul>
                <CartIcon/>
                <button onClick={handleClick} className="btn btn-outline-dark btn-sm" style={{ marginLeft: '5px' }}>
                     Sign Out 
                </button>
            </div>
        </nav>
    )
}

export default connect(null,{SignOut})(UserNavbar) 
