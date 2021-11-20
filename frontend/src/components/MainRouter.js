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
import PrivateRouteSeller from './Privaterouteseller';
import Privateroutecustomer from './Privateroutecustomer';
import Register_product from './Registerproduct';
import Yorders from './Yorders';
import Singleorder from './Singleorder';
import Pendingorders from './PendingOrders';
const Mainrouter = () => {
    return (
        <Switch>
            <Route path="/" exact component={Homepage}/>
            <Route path="/about" component={About}/>
            <Privateroutecustomer path="/cart"  component={Cart}/>
            <Route path="/product/:type/:page"  component={Product}/>
            <Route path="/faq"  component={Faq}/>
            <Route path="/registercustomer" component={Register}/>
            <Route path="/logout" component={logout}/>
            <Route path="/productdisplay/:productId" component={ProductDisplay}/>
            <Route path="/registerseller" component={Registerseller}/>
            <PrivateRouteSeller path="/insertproduct" component={Register_product}/>
            <Privateroutecustomer exact path="/yorders/:id" component={Singleorder}/>
            <Privateroutecustomer path="/yorders" component={Yorders}/>
            <PrivateRouteSeller path="/pendingorders" component={Pendingorders}/>
        </Switch>
    );
}

export default Mainrouter