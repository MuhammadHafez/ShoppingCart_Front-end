import React, { Component } from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Joi from 'joi-browser'
import Axios from 'axios';
import { sendToken } from '../JWT/Authorization';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

class Addproduct extends Component {

  state = {
    name: '',
    os: '',
    harddisk: '',
    cpu: '',
    screen: '',
    ram: '',
    price: '',
    image: '',
    error: ''
  }

  schema = {
    name: Joi.string().required(),
    os: Joi.string().required(),
    harddisk: Joi.number().max(8).required(),
    cpu: Joi.string().required(),
    screen: Joi.string().required(),
    ram: Joi.number().max(1500).required(),
    price: Joi.number().required()
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    let validationErrors = Joi.validate(this.state, this.schema)
    let error = validationErrors.error.details

    if (error.length > 0 && error[0].context.key !== 'error' && error[0].context.key !== 'image') {
      error = (validationErrors.error.details[0].message)
    } else {
      error = ''
    }
    await this.setState({ error });

    if (this.state.image && this.state.error === '') {
      var formData = new FormData();
      formData.append('name', this.state.name);
      formData.append('os', this.state.os);
      formData.append('harddisk', this.state.harddisk);
      formData.append('cpu', this.state.cpu);
      formData.append('screen', this.state.screen);
      formData.append('ram', this.state.ram);
      formData.append('price', this.state.price);
      formData.append('image', this.state.image);

      Axios.post('http://localhost:3001/products/addproduct', formData, sendToken(this.props.token))
        .then(response => this.setState({ error: '/dashboard' }))
        .catch(err => this.setState({ error: err.response.data.message }))
    }
  }

  render() {
    if (this.state.error === '/dashboard') {
      return <Redirect to={this.state.error} />
    } 
    else {
      return (
        <div className='container offset-2' style={{ paddingTop: '30px' }}>
          { this.state.error !== '' ?
            (
              <div className="alert alert-danger" role="alert">
                {this.state.error}
              </div>
            ) : (<></>)
          }
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            {/* Product Name */}
            <div className="form-group row">
              <label for="inputEmail3" className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="inputEmail3" onChange={(e) => this.setState({ name: e.target.value })} />
              </div>
            </div>
            <div className="form-group row">
              <label for="input2" className="col-sm-2 col-form-label">Operating System</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="input2" onChange={(e) => this.setState({ os: e.target.value })} />
              </div>
            </div>
            <div className="form-group row">
              <label for="input3" className="col-sm-2 col-form-label">HardDisk Capacity</label>
              <div className="col-sm-6">
                <input type="number" className="form-control" id="input3" onChange={(e) => this.setState({ harddisk: e.target.value })} />
              </div>
            </div>
            <div className="form-group row">
              <label for="input4" className="col-sm-2 col-form-label">Processor Family</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="input4" onChange={(e) => this.setState({ cpu: e.target.value })} />
              </div>
            </div>
            <div className="form-group row">
              <label for="input5" className="col-sm-2 col-form-label">Screen Size</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="input5" onChange={(e) => this.setState({ screen: e.target.value })} />
              </div>
            </div>
            <div className="form-group row">
              <label for="input6" className="col-sm-2 col-form-label">Memory Size</label>
              <div className="col-sm-6">
                <input type="number" className="form-control" id="input6" onChange={(e) => this.setState({ ram: e.target.value })} />
              </div>
            </div>
            <div className="form-group row">
              <label for="input7" className="col-sm-2 col-form-label">Price </label>
              <div className="col-sm-6">
                <input type="number" className="form-control" id="input7" onChange={(e) => this.setState({ price: e.target.value })} />
              </div>
            </div>
            <div className="form-group row">
              <label for="input8" className="col-sm-2 col-form-label">Image</label>
              <div className="col-sm-6">
                <input type="file" id="input8" onChange={(e) => this.setState({ image: e.target.files[0] })} />
              </div>
            </div>
            <div className="alert alert-dark text-center col-sm-8" role="alert">
              <button type="submit" className="btn btn-primary" style={{ width: '33.33%' }}><AddBoxIcon />  </button>
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

export default connect(mapStateToProps)(Addproduct) 
