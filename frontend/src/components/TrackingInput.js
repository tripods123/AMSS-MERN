import React,{useState} from 'react';
export default function TrackingInput(props){
	const clicked = (e) =>{
		e.preventDefault();
		props.handleSubmit({productid: e.target.value,transactionid:e.dataset.value},e);
	}
	return (
        <div id='exampleModal' className="modal fade" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type='text' placeholder='AWB No.' className='form-control' name='awb' value={props.awb} onChange={e => props.setAWB(e.target.value)}/><br/>
						<input type='text' placeholder='Delivery partner' className='form-control' name='delivery_partner' value={props.deliveryPartner} onChange={e => props.setDeliveryPartner(e.target.value)}/><br/>
                        <button type='submit' onClick={clicked} data-bs-dismiss="modal" data-value={props.product_id} className='btn btn-primary' value={props._id}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}