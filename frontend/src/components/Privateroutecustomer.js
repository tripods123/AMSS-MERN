import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Route} from 'react-router-dom';
import Loadingspinner from './Loadingspinner';
const Privateroutecustomer = ({component: Component, ...rest}) => {
    const [isFetched, setisFetched] = useState(false);
    const [isAuthenticated, setAuthenticated] = useState();
    const [isCustomer, setCustomer] = useState('');
    useEffect(()=>{
        axios({
            method: 'GET',
            url:'https://amss-backend.herokuapp.com/auth/getStatus',
            withCredentials: true,
        }).then((response)=>{
            setCustomer(response.data.userType);
            setAuthenticated(true);
            setisFetched(true);
        }).catch((error)=>{
            setAuthenticated(false);
            setisFetched(true);
        });
    },[]);
    if(isFetched===false){
        return(<Loadingspinner/>);
    }
    if(isAuthenticated===true && isCustomer==='customer' && isFetched===true){
        return (
            <Route {...rest} render={props => (<Component {...props} />)}/>
        );
    }else if((isAuthenticated===false || isCustomer!=='customer') && isFetched===true){
        return (<Redirect to ='/'/>);   
    }
};

export default Privateroutecustomer;