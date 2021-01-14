import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import ProductItem from '../Components/ProductItem';
import { getUserCart } from '../Store/ActionCreators/ActionCreators';
import { sendToken } from '../JWT/Authorization';

class Home extends Component {
    state = {
        products: []
    }

    componentDidMount = async() => {
       await Axios.get('http://localhost:3001/')
        .then(response => this.setState({ products: response.data.message }))
        .catch(err => console.log(err));

     if(this.props.token){
        await Axios.get('http://localhost:3001/carts/',sendToken(this.props.token))
          .then(response=>{
              let cart ;
              if(response.data.message === 'You dont have a cart'){
                cart = { products: [], totalQuantity: 0, totalPrice: 0, };
              }else{
                cart = response.data.message;
              }
              this.props.getUserCart(cart);
          })
          .catch(err => console.log(err.message))
     }
    }

    render() {
        return (
            <div className="container" >
                <div className="row">
                    { typeof(this.state.products) !== 'string'?
                        (this.state.products.map((iter, index) => (
                        <ProductItem product={iter} key={index} token={this.props.token} role={this.props.role}/>
                        )))
                        :
                        (<h1>{this.state.products}</h1>)
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        cart: state.cart,
        role: state.role
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserCart: (cart) => dispatch( getUserCart(cart) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home) 
