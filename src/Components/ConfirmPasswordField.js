import React from 'react'

function ConfirmPassword(props) {
    let {errors} = props;
    let {handleConfirmPassword}= props;
    return (
        <>
            {errors === undefined || errors.length === 0 ? (
                <div className="form-group col-md-12">
                    <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputConfirmPassword1"
                     onChange={e => handleConfirmPassword(e.target.value)} 
                     />
                </div>
            ) : (
                <div className="form-group col-md-12">
                    <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
                    <input type="password" className="form-control is-invalid" id="exampleInputConfirmPassword1"
                     onChange={e => handleConfirmPassword(e.target.value)} 
                      />
                    {   errors.map((error, index) => (
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

export default ConfirmPassword
