import Axios from 'axios';
import React, { Component } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { sendToken } from '../JWT/Authorization';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

class UpdateProduct extends Component {

    state = {
        product: {},
        image: {},
        redirect: '',
        done: false
    }

    componentDidMount() {
        let product_ID = this.props.match.params.id
           Axios.get('http://localhost:3001/getproduct/' + product_ID)
            .then(product => this.setState({ product: product.data.message }))
            .catch(err => console.log(err.response.data.message))
    }

    handleChnage = (event, property) => {
        let product = this.state.product;
        let value = event.target.value;
        switch (property) {
            case 'name':
                product.name = value;
                break;
            case 'operatingSystem':
                product.informations.operatingSystem = value;
                break;
            case 'hardDiskCapacity':
                product.informations.hardDiskCapacity = value;
                break;
            case 'processorFamily':
                product.informations.processorFamily = value;
                break;
            case 'screenSize':
                product.informations.screenSize = value;
                break;
            case 'memorySize':
                product.informations.memorySize = value;
                break;
            default:
                product.price = value;
                break;
        }
        this.setState({ product })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let product = this.state.product;
        if (product.name !== '' && product.informations.operatingSystem !== '' && product.informations.hardDiskCapacity !== '' &&
            product.informations.processorFamily !== '' && product.informations.screenSize !== '' &&
            product.informations.memorySize !== '' && product.price !== '') {

            let formData = new FormData();
            formData.append('name', product.name);
            formData.append('operatingSystem', product.informations.operatingSystem);
            formData.append('hardDiskCapacity', product.informations.hardDiskCapacity);
            formData.append('processorFamily', product.informations.processorFamily);
            formData.append('screenSize', product.informations.screenSize);
            formData.append('memorySize', product.informations.memorySize);
            formData.append('price', product.price);

            if (this.state.done) {
                formData.append('update', 'withImage');
            }
            formData.append('image', this.state.image);

            Axios.post('http://localhost:3001/products/updateproduct/' + product._id, formData, sendToken(this.props.token))
                .then(response => this.setState({ redirect: '/dashboard' }))
                .catch(err => this.setState({ redirect: '/dashboard' }))
        }
    }

    render() {
        if (Object.keys(this.state.product).length === 0) {
            return <></>
        }
        else if (this.state.redirect === '/dashboard') {
            return <Redirect to={this.state.redirect} />
        }
        else {
            return (
                <div className='container offset-2' style={{ paddingTop: '30px' }}>
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        {/* Product Name */}
                        <div className="form-group row">
                            <label for="inputEmail3" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" id="inputEmail3"
                                    defaultValue={this.state.product.name}
                                    onChange={(e) => this.handleChnage(e, 'name')}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="input2" className="col-sm-2 col-form-label">Operating System</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" id="input2"
                                    defaultValue={this.state.product.informations.operatingSystem}
                                    onChange={(e) => this.handleChnage(e, 'operatingSystem')}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="input3" className="col-sm-2 col-form-label">HardDisk Capacity</label>
                            <div className="col-sm-6">
                                <input type="number" className="form-control" id="input3"
                                    defaultValue={this.state.product.informations.hardDiskCapacity}
                                    onChange={(e) => this.handleChnage(e, 'hardDiskCapacity')}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="input4" className="col-sm-2 col-form-label">Processor Family</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" id="input4"
                                    defaultValue={this.state.product.informations.processorFamily}
                                    onChange={(e) => this.handleChnage(e, 'processorFamily')}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="input5" className="col-sm-2 col-form-label">Screen Size</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" id="input5"
                                    defaultValue={this.state.product.informations.screenSize}
                                    onChange={(e) => this.handleChnage(e, 'screenSize')}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="input6" className="col-sm-2 col-form-label">Memory Size</label>
                            <div className="col-sm-6">
                                <input type="number" className="form-control" id="input6"
                                    defaultValue={this.state.product.informations.memorySize}
                                    onChange={(e) => this.handleChnage(e, 'memorySize')}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="input7" className="col-sm-2 col-form-label">Price </label>
                            <div className="col-sm-6">
                                <input type="number" className="form-control" id="input7"
                                    defaultValue={this.state.product.price}
                                    onChange={(e) => this.handleChnage(e, 'price')}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="input8" className="col-sm-2 col-form-label">Image</label>
                            <div className="col-sm-6">
                                <input type="file" id="input8" onChange={(e) => {
                                    this.setState({ image: e.target.files[0] });
                                    this.setState({ done: true })
                                }} />
                            </div>
                        </div>
                        <div className="alert alert-dark text-center col-sm-8" role="alert">
                            <button type="submit" className="btn btn-success" style={{ width: '33.33%' }}><EditIcon /> Update</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps)(UpdateProduct)
