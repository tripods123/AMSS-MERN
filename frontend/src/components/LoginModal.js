import React, {useState} from 'react';
import axios from 'axios';
import Alert from './Alert';
import {Link} from 'react-router-dom';
export default function Loginmodal(props){ 
    const [logusername,setlogusername]=useState('');
    const [logpassword,setlogpassword]=useState('');
    const [typeofuser,settypeofuser]=useState('Customer');
    const [loginerror,setloginerror]=useState('');
    const submitValueLog = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'http://localhost:5000/auth/signin',
            withCredentials: true,
            data: {
                'username' : logusername,
                'password' : logpassword,
                'typeofuser':typeofuser
            }
          }).then((response) => {
                window.location='http://localhost:3000/';
          }, (error) => {
                if(error.response!==undefined){
                    if(error.response.status===404){
                        setloginerror('Username or password is wrong');
                    }
                }else{
                    setloginerror('something went wrong');
                }
          });
    }
    return(
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen-sm-down">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <h1 className='display-6'>Login to your account</h1>
                            <form onSubmit={submitValueLog}>
                                <input className='form-control' placeholder='Username' id='username' type='text' onChange={e => setlogusername(e.target.value)}/><br/>
                                <input className='form-control' placeholder='Password' id='password' type='password' onChange={e => setlogpassword(e.target.value)} required/><br/>
                                <br/>
                                <div className='form-check form-check-inline'>
                                    <input type='radio' className='form-check-input' name='typeofuser' id='customer' value='customer' onChange={e => settypeofuser(e.target.value)}/>
                                    <label htmlFor='customer' className='form-check-label' style={{'color':'#000000'}}>Customer</label>
                                </div>
                                <div className='form-check form-check-inline'>
                                    <input type='radio' className='form-check-input' name='typeofuser' value='seller' onChange={e => settypeofuser(e.target.value)}/>
                                    <label htmlFor='seller' className='form-check-label' style={{'color':'#000000'}}>Seller</label>
                                </div>
                                {loginerror === ''?null:<Alert message={loginerror} type='danger'/>}
                                <Link to="/registercustomer" data-bs-dismiss="modal">New to site?</Link> 
                                <br/><button tag='input' type='submit' className='btn btn-primary'>Submit</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}