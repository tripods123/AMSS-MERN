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
    const [typeofuser,settypeofuser]=useState('customer');
    const [loginerror,setloginerror]=useState('');
    const [passwordShown, setPasswordShown] = useState(false);
          const togglePasswordVisiblity = () => {
            setPasswordShown(passwordShown ? false : true);
          };
          const close = () => {
                const cl1 = document.getElementById('close1');
                cl1.click();
          };
    const submitValueLog = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'https://amss-backend.herokuapp.com/auth/signin',
            data: {
                'username' : logusername,
                'password' : logpassword,
                'typeofuser':typeofuser
            },
            withCredentials: true,
          }).then((response) => {
                window.location='http://peaceful-stonebraker-22525a.netlify.app/';
          }, (error) => {
                if(error.response!==undefined){
                    if(error.response.status===404){
                        setloginerror('Username or password is wrong');
                    }
                    if(error.response.status===401){
                        setloginerror('Username or password is wrong');
                    }
                }else{
                    setloginerror('something went wrong');
                }
          });
    }
    return(
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel">
                <div className="modal-dialog modal-fullscreen-sm-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel" style={{'color':'#C71585'}}>Login to</h5>
                            <button type="button" className="btn-close" id="close1" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h1 className='display-7' style={{'color':'#0d6efd'}}>Automobile Seller</h1>
                            <br/>
                            <form onSubmit={submitValueLog}>
                                <input className='form-control shadow p-2 bg-body rounded' placeholder='Username' id='username' type='text' onChange={e => setlogusername(e.target.value)}/><br/>
                                <div className="input-group mb-3">
                                    <input className='form-control shadow p-2 bg-body rounded' placeholder='Password' id='password' type={passwordShown ? "text" : "password"} onChange={e => setlogpassword(e.target.value)} required/>
                                    <i className="btn btn-primary shadow p-2" onClick={togglePasswordVisiblity}>{eye}</i>  
                                </div>
                                <Link  className="float-end" to="/registercustomer" data-bs-dismiss="modal">Forgot Password?</Link>
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
                                    <button tag='input' type='submit' className='btn btn-primary fs-6 w-auto h-auto'>&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;</button>
                                </center>
                                <br/>
                                <p className='fs-6' >New to site? <Link onClick={close} className='fs-6' to="/registercustomer">Signup</Link></p>
                            </form>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="close1" data-bs-dismiss="modal">Close</button>
                        </div> */}
                    </div>
                </div>
            </div>
    );
}