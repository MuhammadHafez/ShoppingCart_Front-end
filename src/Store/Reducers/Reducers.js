import { SIGN_IN, SIGN_OUT, GET_USER_CART, ADD_TO_CART, DELETE_FROM_CART } from '../ActionTypes/ActionTypes';
import { bake_cookie, delete_cookie } from 'sfcookies'


export default function Reducer(state, action) {

    if (action.type === SIGN_IN) {

        let newState = {
            token: action.token,
            cart: state.cart,
            role: action.role
        }

        bake_cookie('token', newState.token)
        bake_cookie('cart', newState.cart)
        bake_cookie('role', newState.role)   

        return newState

    } else if (action.type === SIGN_OUT) {

        delete_cookie('token');
        delete_cookie('cart');
        delete_cookie('role');

        let newState = {
            token: '',
            cart: {},
            role: ''
        }

        return newState
    
    } else if (action.type === GET_USER_CART) {
       
        let newState = {
            token: state.token,
            cart: action.cart,
            role: state.role
        }

        bake_cookie('cart', newState.cart);

        return newState

    } else if (action.type === ADD_TO_CART) {

        let total = parseInt(state.cart.totalQuantity) + parseInt(action.totalQuantity);
        
        state.cart.totalQuantity = total;

        let newState = {
            token: state.token,
            cart: state.cart,
            role: state.role
        }

        bake_cookie('cart', newState.cart);

        return newState

    } else if ( action.type === DELETE_FROM_CART ) {
       
        state.cart = action.currentCart;

        let newState = {
            token: state.token,
            cart: state.cart,
            role: state.role
        }

        bake_cookie('cart', newState.cart);
 
        return newState
        
    } else {

        return state
    }
}