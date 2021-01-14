import React, { Component } from 'react';
import Joi from 'joi-browser';
import Axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import EmailField from '../Components/EmailField';
import PasswordField from '../Components/PasswordField';
import ConfirmPasswordField from '../Components/ConfirmPasswordField';
 

class Signup extends Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        errors: {},
        redirect: null
    }

    Schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(10).required(),
        confirmPassword: Joi.string().min(6).max(10).required(),
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let validationResult = Joi.validate(this.state, this.Schema, { abortEarly: false });

        let tmpErrors = { email: [], password: [], confirmPassword: [], errors: [], redirect:[] }

        validationResult.error.details.map(iter => {
                tmpErrors[iter.path].push(iter.message);
                return 1;
        });

        if (this.state.password !== this.state.confirmPassword) {
            tmpErrors['confirmPassword'].push('Password and confirmPassword not match!');
        }
        
        await this.setState({errors: tmpErrors});

        if (this.state.errors.email.length === 0 && this.state.errors.password.length === 0 && this.state.errors.confirmPassword.length === 0) {
            let object = {email: this.state.email,password: this.state.password }
            await Axios.post('http://localhost:3001/users/signup',object)
            .then(response => this.setState({ redirect: '/signin', email: '', password:'', confirmPassword:'', errors:'' }))
            .catch(err => this.setState({ errors: err.response.data.message }));
        }
    }

    handleEmail=(value)=>{
        this.setState({ email: value });
    }

    handlePassword=(value)=>{
        this.setState({ password: value });
    }
    handleConfirmPassword=(value)=>{
        this.setState({ confirmPassword: value });
    }

    render() {
        if(this.props.token !== ''){
            return <Redirect to='/' />
        }
         if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
         }
        return (
            <div style={{ paddingTop: '30px' }} >
                <div className='text-center'>
                    <h1>Sign Up</h1>
                </div>
                <div className='row justify-content-center'>
                    <span className="border border-primary" style={{ padding: '30px' }} >
                        {typeof(this.state.errors) ===  'string'? (
                        <div className="alert alert-danger" role="alert">
                            {this.state.errors}
                        </div>
                        ):(<></>)}
                        {/* Form */}
                        <form onSubmit={this.handleSubmit}>
                            {/* Email */}
                            <EmailField errors={this.state.errors.email} handleEmail={this.handleEmail} />
        
                            {/* Password */}
                            <PasswordField errors={this.state.errors.password} handlePassword={this.handlePassword}/>
                           
                            {/* Confirm Password */}
                            <ConfirmPasswordField errors={this.state.errors.confirmPassword} handleConfirmPassword={this.handleConfirmPassword}/>
                            {/* Button Submit */}
                            <div className='text-center'>
                                <button type="submit" className="btn btn-primary form-button ">Submit</button>
                            </div>
                        </form>
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Signup); 
