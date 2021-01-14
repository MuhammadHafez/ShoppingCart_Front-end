import React, { Component } from 'react';
import CartItem from '../Components/CartItem';
import Axios from 'axios';
import { connect } from 'react-redux';
import { getUserCart, deleteFromCart } from '../Store/ActionCreators/ActionCreators';
import { sendToken } from '../JWT/Authorization';
import Checkout from './Checkout';

class Cart extends Component {
    state = {
        products: {},
    }

    componentDidMount = async () => {
        await Axios.get('http://localhost:3001/carts/', sendToken(this.props.token))
            .then(response => {
                if (response.data.message !== 'You dont have a cart') {
                    this.setState({ products: response.data.message });
                    this.props.getUserCart(response.data.message);
                }
            })
            .catch(err => console.log(err));
    }

    deleteProductFromCart = (productID, key, quantity, price) => {
        Axios.get('http://localhost:3001/carts/deletefromcart/' + productID, sendToken(this.props.token))
            .then( () => {
                
                let product = this.state.products;

                product.totalQuantity -= quantity;
                product.totalPrice -= price;
                product.products.splice(key, 1);

                this.props.deleteFromCart(product);
                this.setState({ products: product });

            })
            .catch(err => console.log(err.response))
    }


    render() {

        if (Object.keys(this.state.products).length === 0 || this.state.products.products.length === 0) {
            return (
                <div className='text-center' style={{ marginTop: '20%' }}>
                    <h1>Your Shopping Cart is empty...</h1>
                </div>
            )
        }
        return (
            <div className="container" >
                <div className="row">
                    {this.state.products.products.map((iter, index) => (<CartItem product={iter} key={index} index={index} deleteProductFromCart={this.deleteProductFromCart} />))}
                </div><br/>
                <div className="alert alert-dark text-center" role="alert">
                    <h3>Total Quantity : {this.state.products.totalQuantity} </h3>
                    <h3>Total Price : ${this.state.products.totalPrice}</h3>
                </div>
                <div className='text-center'>
                    <Checkout totalPrice={this.state.products.totalPrice} token={this.props.token} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserCart: (cart) => dispatch(getUserCart(cart)),
        deleteFromCart: (index, quantity, price) => dispatch(deleteFromCart(index, quantity, price)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart) 