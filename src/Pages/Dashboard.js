import Axios from 'axios'
import React, { Component } from 'react';

import AddBoxIcon from '@material-ui/icons/AddBox';
import { Link } from 'react-router-dom';
import { sendToken } from '../JWT/Authorization';
import { connect } from 'react-redux';
import ProductsTable from '../Components/ProductsTable';


class Dashboard extends Component {

    state = {
        products: [],
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/')
            .then(response => this.setState({ products: response.data.message }))
            .catch(err => console.log(err));
    }

    handleDelete = (id, index) => {
        Axios.delete('http://localhost:3001/products/deleteproduct/' + id, sendToken(this.props.token))
            .then(response => {
                let tmpProducts = this.state.products;
                tmpProducts.splice(index, 1);
                this.setState({ products: tmpProducts });
            })
            .catch(err => console.log(err.response.data.message));
    }


    render() {
        return (
            <div className="container" style={{ paddingTop: '30px' }}>
                <div className="alert alert-dark" role="alert">
                    <Link to='/addproduct' className="btn btn-primary" style={{ marginLeft: '33.33%', width: '33.33%' }}>
                        <AddBoxIcon /> Add Product
                    </Link>
                </div>
                {  this.state.products.length !== 0 ?
                    (
                        <table className="table text-center">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Controls</th>
                                </tr>
                            </thead>
                            <tbody className='table-content text-center'>
                                {   this.state.products.map((iter, index) => (
                                    <ProductsTable product={iter} index={index} key={index} handleDelete={this.handleDelete} />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className='text-center'>
                            <h3>You don't have any product</h3>
                        </div>
                    )}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps)(Dashboard)
