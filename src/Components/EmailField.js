import React from 'react'

function EmailValidationInput(props) {
    let {errors} = props;
    let {handleEmail}= props;
    return (
        <>
            {errors === undefined || errors.length === 0 ? (
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                     onChange={e => handleEmail(e.target.value)}
                                    />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                            ) : (
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control is-invalid" id="exampleInputEmail1" aria-describedby="emailHelp"
                                     onChange={e => handleEmail(e.target.value)}
                                      />
                                    { errors.map((error, index) => (
                                            <div id="validationServer03Feedback" className="invalid-feedback" key={index}>
                                                {error}
                                            </div>
                                           ))
                                    }
                                 </div>
                                )}
        </>
    )
}

export default EmailValidationInput
