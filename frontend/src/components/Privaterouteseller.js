import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Route} from 'react-router-dom';
import Loadingspinner from './Loadingspinner';
const PrivateRouteSeller = ({component: Component, ...rest}) => {
    const [isFetched, setisFetched] = useState(false);
    const [isAuthenticated, setAuthenticated] = useState();
    const [isSeller, setSeller] = useState('');
    useEffect(()=>{
        axios({
            method: 'GET',
            url:'https://amss-backend.herokuapp.com/auth/getStatus',
            withCredentials: true,
        }).then((response)=>{
            setSeller(response.data.userType);
            setAuthenticated(true);
            setisFetched(true);
        }).catch((error)=>{
            setisFetched(true);
            setAuthenticated(false);
        });
    },[]);
    if(isFetched===false){
        return(<Loadingspinner/>);
    }
    if(isAuthenticated===true && isSeller==='seller' && isFetched===true){
        return (
            <Route {...rest} render={props => (<Component {...props} />)}/>
        );
    }else if(isAuthenticated===true && isSeller!=='seller' && isFetched===true){
        return (<Redirect to ='/'/>);   
    }
};

export default PrivateRouteSeller;