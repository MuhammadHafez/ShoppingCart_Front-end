import Axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addToCart } from '../Store/ActionCreators/ActionCreators';
import { sendToken } from '../JWT/Authorization';

class Product extends Component {

    state = {
        product: {},
        quantity: 0,
        totalPrice:0,
    }

    async componentDidMount() {
        let Product_ID = this.props.match.params.id;
        await Axios.get('http://localhost:3001/getproduct/' + Product_ID)
            .then(product => this.setState({ product: product.data.message }))
            .catch(err => console.log(err))
    }

    handleQuantity = (e) => {
        if (e.target.value >= 0) {
            let totalPrice = e.target.value * this.state.product.price;
            this.setState({ quantity: e.target.value, totalPrice: totalPrice });
        }
    }

    handleSubmit = async (id,quantity,price) => {
        let object = {id: id,quantity:quantity,price:price}
       await  Axios.post('http://localhost:3001/carts/addtocart', object, sendToken(this.props.token))
        .then(result => {
            if(result.data.message === 'Saved' || result.data.message === 'Updated' ){
                //ADD TO STORE
                this.props.addToCart(quantity);
            }
        }).catch(err => console.log(err));
        
    }
    render() {
        return (
            <div>
                {   this.state.product._id !== undefined ? (
                    <div className="row" style={{ paddingTop: '5%' }}>
                        <div className="col-5">
                            <img src={this.state.product.image} className="rounded float-left product-image" alt="..." />
                        </div>
                        
                        <div className="col-7">
                            
                            <h2>{this.state.product.name}</h2>

                            <p>Operating System:<b> {this.state.product.informations.operatingSystem}</b></p>
                            <p>Hard Disk Capacity:<b> {this.state.product.informations.hardDiskCapacity}</b></p>
                            <p>Processor Family:<b> {this.state.product.informations.processorFamily}</b></p>
                            <p>Screen Size:<b> {this.state.product.informations.screenSize}</b></p>
                            <p>Memory Size:<b> {this.state.product.informations.memorySize} GB</b></p>

                            <h4>Price : ${this.state.product.price}</h4><br />

                            <label>Quantity :&nbsp; </label>
                            <input type='number' value={this.state.quantity} onChange={this.handleQuantity} /><br />

                            <div className="card border-danger mb-3" style={{ maxWidth: '300px' }} >
                                <div className="card-header" >Total Price : <b>${this.state.totalPrice}</b> </div>
                            </div>

                            <div style={{ textAlign: 'center', width: '50%' }} >
                                { this.props.token === '' || this.props.role === 'admin' ? 
                                (
                                    <button className='btn btn-primary btn-lg disabled'>Add To Cart</button>
                                ) : (
                                    <button className='btn btn-primary btn-lg ' 
                                    onClick={()=>this.handleSubmit(this.state.product._id,this.state.quantity,this.state.price)} 
                                    >
                                       Add To Cart
                                    </button>
                                    )}
                            </div>
                        </div>
                    </div>
                ) : (
                        <></>
                    )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        role: state.role
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (totalQuantity)=> dispatch(addToCart(totalQuantity))
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(Product) 
