import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import Axios from 'axios';
import { sendToken } from '../JWT/Authorization';
import { useHistory } from 'react-router-dom';

function Checkout(props) {
    const publishableKey = "pk_test_51Ho0ubALvAtmtEd1wa7j6c01yMs27EMlCCBgcrBCwqYFtRQfZdciEGlep2YkGzJNflltZxc6H3d1tHMwlQXtQXMH00l67k62FY";
    const history = useHistory();
    const onToken = (token)=>{
            const body = {
                amount : props.totalPrice,
                token: token
            }

            Axios.post('http://localhost:3001/carts/payment', body, sendToken(props.token))
            .then(response => history.push('/'))
            .catch(err => console.log(err))
        }

    return (

        <StripeCheckout
          label="Complete CheckOut" //Component button text
          name="Payment.." //Modal Header
          description={"TotalPrice is $"+ props.totalPrice}
          panelLabel="Pay" //Submit button in modal
          amount={props.totalPrice * 100} //Amount in cents $9.99
          token={onToken}
          stripeKey={publishableKey}
          billingAddress={false}
        />

        );
}

export default Checkout
