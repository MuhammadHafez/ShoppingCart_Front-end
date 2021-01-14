import React, { useState, useEffect } from 'react';
import Joi from 'joi-browser';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { SignIn } from '../Store/ActionCreators/ActionCreators';

import EmailField from '../Components/EmailField';
import PasswordField from '../Components/PasswordField';


function Signin(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [backendError, setBackendError] = useState('');

    let history = useHistory(); // To navigate between Components

    const Schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(10).required()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationResult = Joi.validate({ email, password }, Schema, { abortEarly: false });

        let tmpErrors = { email: [], password: [] }

        if (validationResult.error !== null) {
            validationResult.error.details.map(error => {
                tmpErrors[error.path].push(error.message);
                return 1;
            });
        }
        setErrors(tmpErrors);
    }

    useEffect(() => {
        if (errors.length !== 0 && errors.email.length === 0 && errors.password.length === 0) {
            let object = { email, password }
            axios.post('http://localhost:3001/users/signin', object )
                .then(response => {
                    //Handle JWT
                    props.signIn( response.data.Token, response.data.role );
                    setBackendError('');
                    history.push('/');
                })
                .catch(err => setBackendError(err.response.data.message))
        }
    }, [errors]);

    const handleEmail = (value) => { setEmail(value) }
    const handlePassword = (value) => { setPassword(value) }

    if (props.token !== '') {
        history.push('/')
    }

    return (
        <div style={{ paddingTop: '60px' }} >
            <div className='text-center'>
                <h1>Sign In</h1>
            </div>
            <div className=' row justify-content-center'>
                <span className="border border-secondary" style={{ padding: '30px' }} >
                    {backendError !== '' ? (
                        <div className="alert alert-danger" role="alert">
                            {backendError}
                        </div>
                    ) : (<></>)}
                    <form onSubmit={handleSubmit} >
                        {/* Email */}
                        <EmailField errors={errors.email} handleEmail={handleEmail} />

                        {/* Password */}
                        <PasswordField errors={errors.password} handlePassword={handlePassword} />

                        <div className='text-center'>
                            <button type="submit" className="btn btn-primary form-button ">Submit</button>
                        </div>
                    </form>
                </span>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (token,role) => dispatch(SignIn(token,role))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin) 
