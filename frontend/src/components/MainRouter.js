import React from 'react';
import {Route, Switch} from "react-router-dom";
import Homepage from "./Homepage";
import Cart from "./Cart";
import Product from "./Product";
import About from "./About";
import Faq from "./Faq";
import Login from "./Login";
import ProductDisplay from './Productdisplay';
import logout from './Logout';
const Mainrouter = () => {
    return (
        <Switch>
            <Route path="/" exact component={Homepage}/>
            <Route path="/about" component={About}/>
            <Route path="/cart"  component={Cart}/>
            <Route path="/product/:type/:page"  component={Product}/>
            <Route path="/faq"  component={Faq}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={logout}/>
            <Route path="/productdisplay/:productId" component={ProductDisplay}/>
        </Switch>
    );
}

export default Mainrouter