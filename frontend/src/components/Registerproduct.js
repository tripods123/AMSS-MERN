import axios from 'axios';
import React, { useState } from 'react';
import Loadingspinner from './Loadingspinner';
export default function Register_product (props){
    const [productname, setName] = useState();
    const [brand, setBrand] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState();
    const [description, setDescription] = useState();
    const [stored, setStored] = useState(false);
    const submit = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        setStored(true);
        formData.append( "image", document.getElementById('mainImage').files[0]);
        formData.append( "image", document.getElementById('frontImage').files[0]);
        formData.append( "image", document.getElementById('leftImage').files[0]);
        formData.append( "image", document.getElementById('rightImage').files[0]);
        formData.append( "producttype", type);
        formData.append( "productname", productname);
        formData.append( "productprice", price);
        formData.append( "brand", brand);
        formData.append( "productdescription", description);
        axios({
            method: 'POST',
            url: 'https://amss-backend.herokuapp.com/product/create',
            data: formData,
            withCredentials: true,
        }).then(()=>{
            setStored(false);
        }).catch(()=>{
            setStored(false);
        });
    }
    if(stored === false){
        return (
    		<div className='container'>
                <div className='row justify-contents-start'>
                    <div className='col-sm'></div>
                    <div className='col-sm' >
                        <p className='lead'>Insert Product</p>
                        <form onSubmit={submit}>
                            <input className='form-control' type="input" placeholder="Product Name" name="productname" onChange={e => setName({value:e.target.value})} required/><br/>
                            <select className='form-select' name="producttype" onChange={e => setType({value:e.target.value})} required>
                                <option value='spectacles'>Spectacles</option>
                                <option value='sunglasses'>Sunglasses</option>
                                <option value='contact_lens'>Contact Lens</option>
                            </select><br/>
                            <input className='form-control' type="input" placeholder="Product Brand" name="brand" onChange={ e => setBrand({value:e.target.value})} required/><br/>
                            <input className='form-control' type="input" placeholder="Product Price" name="productprice" onChange={e => setPrice({value:e.target.value})} required/><br/>
                            <textarea className='form-control' type="textarea" placeholder="Product Description" name="productdescription"  onChange={e => setDescription({value:e.target.value})} required></textarea><br/>
                            <label className='form-label' htmlFor='mainImage'>Image No. 1</label><input className='form-control' type='file' id='mainImage' name="mainimage"  required/><br/>
                            <label className='form-label' htmlFor='frontImage'>Image No. 2</label><input className='form-control' type='file' id='frontImage' name="frontimage" required/><br/>
                            <label className='form-label' htmlFor='leftImage'>Image No. 3</label><input className='form-control' type='file' id='leftImage' name="leftimage"  required/><br/>
                            <label className='form-label' htmlFor='rightImage'>Image No. 4</label><input className='form-control' type='file' id='rightImage' name="rightimage"  required/><br/>
                            <center><button type="submit" className="btn btn-primary">Insert</button></center>
                        </form>
                    </div>
                    <div className='col-sm'></div>
                </div>
			</div>
		);
    }else if(stored===true){
        return(<Loadingspinner/>);
    }
}