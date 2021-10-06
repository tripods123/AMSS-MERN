import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
function Homepage(){
	const [isSeller, setSeller] = useState('');
	useEffect(()=>{
		axios({
			method:'GET',
			url:'https://amss-backend.herokuapp.com/auth/getstatus',
			withCredentials:true
		}).then((response)=>{
			setSeller(response.data.userType);
		}).catch((error)=>{
			console.log(error.response);
			setSeller(error.response.data.userType);
		})
	},[isSeller]);
	if(isSeller==='seller'){
		return (<Redirect to='/insertproduct'/>); 
	}else{
		return (
			<div>
				<div className="row justify-content-start">
					<div className="col-sm">
						<img src="img/download.jpg" alt="placeholder"></img>
					</div>
					<div className="col-sm">
						<img src="img/download.jpg"  alt="placeholder"></img>
					</div>
					<div className="col-sm">
						<img src="/img/download.jpg"  alt="placeholder"></img>
					</div>
				</div>
			</div>
		);
	}
}

export default Homepage;