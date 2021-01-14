import React from 'react'

function PasswordField(props) {
    let {errors} = props;
    let {handlePassword}= props;
    return (
        <>
            {errors === undefined || errors.length === 0 ? (
                <div className="form-group col-md-12">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                        onChange={e => handlePassword(e.target.value)} 
                        />
                </div>
            ) : (
                 <div className="form-group col-md-12">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control is-invalid" id="exampleInputPassword1" 
                        onChange={e => handlePassword(e.target.value)} 
                         />
                    { errors.map((error, index) => (
                            <div id="validationServer03Feedback" className="invalid-feedback" key={index}>
                                {error}
                            </div>
                            ))
                    }
                    </div>
                )
            }
        </>
    )
}

export default PasswordField
