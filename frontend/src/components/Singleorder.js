import React, { useEffect, useState } from 'react';
import Loadingspinner from './Loadingspinner';
import Alert from './Alert';
import {Link} from 'react-router-dom';
import Carousel from './carousel';
import axios from 'axios';
export default function Singleorder(props){
	const [fetched, setisFetched] = useState(false);
    const [transaction, setTransaction] = useState();
	useEffect(()=>{
		axios({
            method: 'GET',
            url:'https://amss-backend.herokuapp.com/transaction/'+props.match.params.id,
            withCredentials: true,
        }).then((response)=>{
            setTransaction(response.data);
            setisFetched(true);
        }).catch((error)=>{
            setisFetched(true);
        })
	},[props]);
	if(fetched==='loading'){
		return(<Loadingspinner/>);
	}else if(fetched===true){
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-sm'>
						{transaction.map((t)=>{
							return(
            	                <div className="card border-dark mb-3" key={t._id}>
                	                <div className="card-header">{t._id}</div>
                        	        <div className="card-body text-dark">
                            	        <div className="accordion" id="accordionExample">
                            	            {t.products.map((products)=>{
                                	            return(
													<div className="accordion-item" key={products.productname}>
                                        	    	<h2 className="accordion-header" id="headingOne">
	                                        	        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
    	                                        	        {products.productname}
    	                                            	</button>
            	                                    </h2>
    	            	                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        	            	                            <div className="accordion-body">
            	            	                            <div className="card mb-3">
                	            	                            <Carousel images={products.image}/>
                    	                                        <div className="card-body">
                        	        	                            <h5 className="card-title"><Link to={'/productdisplay/'+products._id}>{products.productname}</Link></h5>
                                        	                        <p className="card-text">Quantity: <small className="text-muted">{products.quantity}</small></p>
                        	                	                    <p className="card-text">Total price: <small className='text-muted'>{parseInt(products.price)*parseInt(products.quantity)}</small></p>
                            	                	            </div>
                                	                	    </div>
	                                	                </div>
    	                                	        </div>
                                            	</div>
												)
                                            })}
                                        </div>    
                                    </div> 
                                    <p className="card-text">Client Name: <small className='text-muted'>{t.clientname}</small></p>
                                    <p className="card-text">Total Products: <small className='text-muted'>{t.products.length}</small></p>
                                    <p className="card-text">Date of purchase: <small className='text-muted'>{t.date}</small></p>
                                    <p className="card-text">Delivery address: <small className='text-muted'>{t.deliveryaddress}</small></p> 
                                </div>
							)
						})}
					</div>	
				</div>
			</div>
		);		
	}else{
		return (
			<div className='container'>
				<div className='row'>
					<div className='col align-self-center'>
						<Alert message='Internal server error'/>
					</div>
				</div>
			</div>
		);
	}
}