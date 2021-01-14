import { createStore ,applyMiddleware, compose  } from 'redux';
import Reducer from './Reducers/Reducers';
import {  read_cookie } from 'sfcookies'
import thunk from 'redux-thunk';


const getInitialState =()=>{
    let state = read_cookie('token');
    let role = read_cookie('role')
    let cartState = read_cookie('cart');
    
    if(state.length > 0){
        return {
            token: state,
            cart: cartState,
            role: role
        }
    }else{
        return {
            token:'',
            cart: {},
            role: ''
        }
    }
}

const Store = createStore(Reducer,getInitialState(),compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default Store