import React from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import { addToCart } from '../Store/ActionCreators/ActionCreators';
import { sendToken } from '../JWT/Authorization';


function ProductItem(props) {
    
    let { product } = props;
    let { token } = props;
    let {role} = props;

    const handleSubmit = async (id, price) => {
        let object = { id: id, quantity: 1, price: price }
        await Axios.post('http://localhost:3001/carts/addtocart', object, sendToken(props.token))
            .then(result => {
                if (result.data.message === 'Saved' || result.data.message === 'Updated') {
                    //ADD TO STORE
                    props.addToCart(1);
                }
            }).catch(err => console.log(err));
    }

    return (
        <>
            <div className="col-sm-4" style={{ paddingTop: '30px' }}>
                <div className="card">
                    <img src={product.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <Link to={'/product/' + product._id} className="card-title"><h5>{product.name}</h5></Link>
                        <p className="card-text">
                            Operating System: {product.informations.operatingSystem} <br />
                            Hard Disk Capacity: {product.informations.hardDiskCapacity} TB<br />
                            Processor Family: {product.informations.processorFamily}<br />
                            Screen Size: {product.informations.screenSize} Inch<br />
                            Memory Size: {product.informations.memorySize} GB<br />
                        </p>
                        <div>
                            <p style={{ float: 'left' }}>
                                Price :&nbsp; <b>${product.price}</b>
                            </p>

                            {   token !== ''  && role !== 'admin'?
                                (
                                    <button onClick={() => handleSubmit(product._id, product.price)} className="btn btn-primary card-button">Buy</button>
                                ) : (
                                    <button  className="btn btn-primary card-button disabled">Buy</button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (totalQuantity) => dispatch(addToCart(totalQuantity)),
    }
}

export default connect(null, mapDispatchToProps)(ProductItem)
