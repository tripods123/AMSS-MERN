import React, {useState} from 'react';
import axios from 'axios';
import Alert from './Alert';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
export default function Loginmodal(props){ 
    const [logusername,setlogusername]=useState('');
    const [logpassword,setlogpassword]=useState('');
    const [typeofuser,settypeofuser]=useState('Customer');
    const [loginerror,setloginerror]=useState('');
    const [passwordShown, setPasswordShown] = useState(false);
          const togglePasswordVisiblity = () => {
            setPasswordShown(passwordShown ? false : true);
          };
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
                            <h5 class="modal-title" id="staticBackdropLabel">Login to</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h1 className='display-7'>Automobile Seller</h1>
                            <br/>
                            <form onSubmit={submitValueLog}>
                                <input className='form-control' placeholder='Username' id='username' type='text' onChange={e => setlogusername(e.target.value)}/><br/>
                                <div class="input-group mb-3">
                                    <input class='w-75 p-3' className='form-control' placeholder='Password' id='password' type={passwordShown ? "text" : "password"} onChange={e => setlogpassword(e.target.value)} required/>
                                    <i class="btn btn-outline-secondary" onClick={togglePasswordVisiblity}>{eye}</i>  
                                </div>
                                <Link  class="float-end" to="/registercustomer" data-bs-dismiss="modal">Forgot Password?</Link>
                                <br/>
                                <div className='form-check form-check-inline'>
                                    <input type='radio' className='form-check-input' name='typeofuser' id='customer' value='customer' onChange={e => settypeofuser(e.target.value)}/>
                                    <label htmlFor='customer' className='form-check-label' style={{'color':'#000000'}}>Customer</label>
                                </div>
                                <div className='form-check form-check-inline'>
                                    <input type='radio' className='form-check-input' name='typeofuser' value='seller' onChange={e => settypeofuser(e.target.value)}/>
                                    <label htmlFor='seller' className='form-check-label' style={{'color':'#000000'}}>Seller</label>
                                </div><br/>
                                {loginerror === ''?null:<Alert message={loginerror} type='danger'/>}
                                <br/>
                                <center>
                                <div className="d-inline float-left">
                                    <button tag='input' type='submit' class='btn btn-primary fs-6 w-auto h-auto'>Login</button>
                                </div>
                                </center>
                                <div className="d-inline p-2 float-left">
                                    <p className='fs-6' >New to site? <Link className='fs-6' to="/registercustomer">Signup</Link></p>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="close1" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}