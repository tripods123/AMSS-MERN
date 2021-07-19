import React from 'react';
import {Route, Switch} from "react-router-dom";
import Homepage from "./Homepage";
import Cart from "./Cart";
import Product from "./Product";
import About from "./About";
import Faq from "./Faq";
import ProductDisplay from './Productdisplay';
import logout from './Logout';
import Register from './Register';
import Registerseller from './Register_seller';
import Sellerhomepage from './Sellerhomepage'
const Mainrouter = () => {
    return (
        <Switch>
            <Route path="/" exact component={Homepage}/>
            <Route path="/about" component={About}/>
            <Route path="/cart"  component={Cart}/>
            <Route path="/product/:type/:page"  component={Product}/>
            <Route path="/faq"  component={Faq}/>
            <Route path="/registercustomer" component={Register}/>
            <Route path="/logout" component={logout}/>
            <Route path="/productdisplay/:productId" component={ProductDisplay}/>
            <Route path="/registerseller" component={Registerseller}/>
            <Route path="/sellerhomepage" component={Sellerhomepage}/>
        </Switch>
    );
}

export default Mainrouter