// import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'


import Navbar from './Components/Navbar';
import UserNavbar from './Components/UserNavbar';
import AdminNavbar from './Components/AdminNavbar';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Dashboard from './Pages/Dashboard';
import Addproduct  from './Pages/Addproduct'
import UpdateProduct from './Pages/UpdateProduct';


function App(props) {
  return (
    <div className="App">
      <Router>
        { props.token === '' ?
          ( <Navbar /> ) 
          : props.role === 'user' ?
          ( <UserNavbar /> )
          :
          (<AdminNavbar/>)   
        }

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/product/:id' component={Product} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/addproduct' component={Addproduct} />
          <Route exact path='/updateproduct/:id' component={UpdateProduct} />
        </Switch>
      </Router>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    role: state.role
  }
}

export default connect(mapStateToProps)(App);
