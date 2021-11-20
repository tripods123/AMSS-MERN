import React, { useEffect, useState } from 'react';
import Loadingspinner from './Loadingspinner';
import Showprescription from './Showprescription';
import Trackinginput from './Trackinginput';
import axios from 'axios';
export default function Pendingorders(props){
    const [pendingOrders, setPendingOrders] = useState();
    const [fetched,setFetched] = useState('loading');
    const [errorMessage,setError] = useState('');
    const [awb,setAWB] = useState('');
    const [deliveryPartner, setDeliveryPartner] = useState('');
	const submit = ({productid,transactionid},e) =>{
		e.preventDefault();
		if(awb!=='' && deliveryPartner!==''){
			axios({
                url:'https://amss-backend.herokuapp.com/order/setdelivery',
                method:'POST',
                data:{
                    'product_id':productid,
					'transaction_id':transactionid,
					'awb':awb,
					'delivery_partner':deliveryPartner
                }
            }).then((response)=>{
                return response.data;
            });
		}
	}
	useEffect(()=>{
		axios({
            method:'GET',
            url:'https://amss-backend.herokuapp.com/order/getallpending',
            Headers:{
                withCredentials:true
            }
        }).then((response)=>{
                setPendingOrders(response.data);
                setFetched(true);
        }).catch((error)=>{
            setFetched(true);
            setError()
        });
		// eslint-disable-next-line
	},[])
	if(fetched === 'loading'){
		return (<Loadingspinner/>);	
	}else{
		if(errorMessage===''){
			if(pendingOrders.length!==0){
				return (
					<div>
						<div className='table-responsive'>
							<center><h1 className="display-6">Pending Orders</h1></center>
							<table className='table table-striped'>
								<thead>
									<tr>
										<th>Product Name</th>
										<th>Lens Details</th>
										<th>Client Name</th>
										<th>Quantity</th>
										<th>delivery Address</th>
										<th>&nbsp;</th>
									</tr>
								</thead>
								<tbody>
									{pendingOrders.map((order)=>{
										return(
											<tr>
												<td>{order['products']['productname']}</td>
												<td><Showprescription lens={order['products']['lens_details']}/></td>
												<td>{order['clientname']}</td>
												<td>{order['products']['quantity']}</td>
												<td>{order['deliveryaddress']}</td>
												<td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Set delivery</button></td>
												<Trackinginput id="exampleModal" product_id={order['products']['_id']} _id={order['_id']} handleSubmit={submit} awb={awb} deliveryPartner={deliveryPartner} setAWB={setAWB} setDel={setDeliveryPartner}/>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				);
			}else{
				return(
					<div className='container-fluid' style={{'backgroundColor':'#D3D3D3','height':'100vh'}}>
			            <div className='row' style={{'height':'100vh'}}>
        		        	<div className='col align-self-center'>
	        		            <center><h1>yay!! No pending orders</h1></center>
    	        			</div>
	            		</div>
    	    		</div>
				);
			}
		}
	}
}