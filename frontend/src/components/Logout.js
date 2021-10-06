import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import Loadingspinner from './Loadingspinner';
function Logout(){
    const [isAuthenticated, setAuthenticated] = useState(true);
    useEffect(()=>{
        axios({
            method: 'GET',
            url:'https://amss-backend.herokuapp.com/auth/signout',
            withCredentials: true,
        }).then(()=>{
            setAuthenticated(false);
        }).catch(()=>{
            setAuthenticated(true);
        });
        // eslint-disable-next-line
    },[isAuthenticated]);

    if(isAuthenticated === true){
        return(<Loadingspinner/>)
    }else if( isAuthenticated===false){
        return(window.location="https://peaceful-stonebraker-22525a.netlify.app/");
    }
      
  }


export default Logout;