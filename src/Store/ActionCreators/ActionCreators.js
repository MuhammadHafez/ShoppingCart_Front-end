import { SIGN_IN  , SIGN_OUT , GET_USER_CART , ADD_TO_CART , DELETE_FROM_CART , CLEAR_CART} from '../ActionTypes/ActionTypes';

export function SignIn(token , role){
    return {
        type: SIGN_IN,
        token,
        role
    }
}


export function SignOut(){
    return {
        type: SIGN_OUT
    }  
}

export function getUserCart(cart){
    return {
        type: GET_USER_CART,
        cart
    }  
}


export function addToCart(totalQuantity){
    return {
        type: ADD_TO_CART,
        totalQuantity
    }  
}


export function deleteFromCart(currentCart){
    return {
        type: DELETE_FROM_CART,
        currentCart
    }  
}
